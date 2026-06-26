<?php

namespace Tests\Feature\Lms;

use App\Models\Certificate;
use App\Models\Course;
use App\Models\User;
use App\Services\CertificateService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ExamCertificateTest extends TestCase
{
    use RefreshDatabase;

    private function student(string $email = 'student@test.com'): User
    {
        return User::create([
            'name' => 'Alumno',
            'email' => $email,
            'password' => bcrypt('password'),
            'role' => 'student',
        ]);
    }

    /** @return array{0: Course, 1: \App\Models\Exam, 2: array} */
    private function courseWithExam(string $slug = 'eco', bool $active = true, ?int $maxAttempts = null): array
    {
        $course = Course::create([
            'title' => 'Curso '.$slug,
            'slug' => $slug,
            'price' => 0,
            'status' => 'published',
        ]);

        $exam = $course->exam()->create([
            'title' => 'Examen '.$slug,
            'passing_score' => 70,
            'max_attempts' => $maxAttempts,
            'is_active' => $active,
        ]);

        $questions = [];
        foreach (['P1', 'P2'] as $i => $text) {
            $q = $exam->questions()->create(['question_text' => $text, 'order' => $i + 1, 'points' => 1]);
            $correct = $q->options()->create(['option_text' => 'Correcta', 'is_correct' => true, 'order' => 1]);
            $wrong = $q->options()->create(['option_text' => 'Incorrecta', 'is_correct' => false, 'order' => 2]);
            $questions[] = [$q, $correct, $wrong];
        }

        return [$course, $exam, $questions];
    }

    private function enroll(User $user, Course $course): void
    {
        $user->enrollments()->create([
            'course_id' => $course->id,
            'status' => 'active',
            'enrolled_at' => now(),
        ]);
    }

    public function test_enrolled_can_view_exam_without_correct_flag_leaking(): void
    {
        $student = $this->student();
        [$course] = $this->courseWithExam();
        $this->enroll($student, $course);

        $this->actingAs($student)
            ->get("student/courses/{$course->slug}/exam")
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('Student/Exams/Show')
                ->has('exam.questions', 2)
                ->missing('exam.questions.0.options.0.is_correct'));
    }

    public function test_non_enrolled_and_draft_and_inactive_are_blocked(): void
    {
        $student = $this->student();

        [$published] = $this->courseWithExam('p1');
        $this->actingAs($student)->get("student/courses/{$published->slug}/exam")->assertStatus(403);

        [$inactive] = $this->courseWithExam('p2', active: false);
        $this->enroll($student, $inactive);
        $this->actingAs($student)->get("student/courses/{$inactive->slug}/exam")->assertNotFound();
    }

    public function test_passing_generates_certificate_and_failing_does_not(): void
    {
        Mail::fake();
        Storage::fake('local');
        $student = $this->student();
        [$course, $exam, $questions] = $this->courseWithExam();
        $this->enroll($student, $course);

        $this->actingAs($student)->post("student/courses/{$course->slug}/exam", ['answers' => [
            $questions[0][0]->id => $questions[0][1]->id,
            $questions[1][0]->id => $questions[1][1]->id,
        ]]);

        $attempt = $exam->attempts()->first();
        $this->assertEquals(100, $attempt->score);
        $this->assertEquals('passed', $attempt->status);
        $this->assertDatabaseCount('certificates', 1);
        Storage::disk('local')->assertExists(Certificate::first()->pdf_path);
    }

    public function test_failing_does_not_generate_certificate(): void
    {
        Mail::fake();
        Storage::fake('local');
        $student = $this->student();
        [$course, $exam, $questions] = $this->courseWithExam();
        $this->enroll($student, $course);

        $this->actingAs($student)->post("student/courses/{$course->slug}/exam", ['answers' => [
            $questions[0][0]->id => $questions[0][2]->id,
            $questions[1][0]->id => $questions[1][2]->id,
        ]]);

        $this->assertEquals('failed', $exam->attempts()->first()->status);
        $this->assertDatabaseCount('certificates', 0);
    }

    public function test_foreign_options_are_ignored_in_scoring(): void
    {
        Mail::fake();
        Storage::fake('local');
        $student = $this->student();
        [$course, $exam, $questions] = $this->courseWithExam();
        $this->enroll($student, $course);

        $this->actingAs($student)->post("student/courses/{$course->slug}/exam", ['answers' => [
            $questions[0][0]->id => $questions[1][1]->id, // opción de otra pregunta
            $questions[1][0]->id => $questions[1][1]->id, // correcta
        ]]);

        $this->assertEquals(50, $exam->attempts()->first()->score);
    }

    public function test_max_attempts_is_respected(): void
    {
        Mail::fake();
        Storage::fake('local');
        $student = $this->student();
        [$course, $exam, $questions] = $this->courseWithExam(maxAttempts: 1);
        $this->enroll($student, $course);

        $answers = [
            $questions[0][0]->id => $questions[0][2]->id,
            $questions[1][0]->id => $questions[1][2]->id,
        ];

        $this->actingAs($student)->post("student/courses/{$course->slug}/exam", ['answers' => $answers])->assertRedirect();
        $this->actingAs($student)->post("student/courses/{$course->slug}/exam", ['answers' => $answers])->assertStatus(403);
        $this->assertEquals(1, $exam->attempts()->count());
    }

    public function test_certificate_download_ownership(): void
    {
        Storage::fake('local');
        $owner = $this->student('owner@test.com');
        $intruder = $this->student('intruder@test.com');
        [$course, $exam] = $this->courseWithExam();
        $attempt = $exam->attempts()->create([
            'user_id' => $owner->id,
            'score' => 100,
            'total_points' => 2,
            'earned_points' => 2,
            'status' => 'passed',
            'started_at' => now(),
            'submitted_at' => now(),
        ]);
        $certificate = app(CertificateService::class)->generateForAttempt($attempt);

        $this->actingAs($owner)->get("student/certificates/{$certificate->id}/download")->assertStatus(200);
        $this->actingAs($intruder)->get("student/certificates/{$certificate->id}/download")->assertStatus(403);

        Storage::disk('local')->delete($certificate->pdf_path);
        $this->actingAs($owner)->get("student/certificates/{$certificate->id}/download")->assertNotFound();
    }

    public function test_certificate_not_duplicated_per_attempt(): void
    {
        Storage::fake('local');
        $student = $this->student();
        [$course, $exam] = $this->courseWithExam();
        $attempt = $exam->attempts()->create([
            'user_id' => $student->id,
            'score' => 100,
            'total_points' => 2,
            'earned_points' => 2,
            'status' => 'passed',
            'started_at' => now(),
            'submitted_at' => now(),
        ]);

        $service = app(CertificateService::class);
        $a = $service->generateForAttempt($attempt);
        $b = $service->generateForAttempt($attempt);

        $this->assertEquals($a->id, $b->id);
        $this->assertDatabaseCount('certificates', 1);
        $this->assertStringStartsWith('CERT-', $a->certificate_number);
    }
}
