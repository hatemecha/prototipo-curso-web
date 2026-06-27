<?php

namespace Tests\Feature\Lms;

use App\Filament\Resources\CourseEnrollments\CourseEnrollmentResource;
use App\Filament\Resources\CourseModules\CourseModuleResource;
use App\Filament\Resources\Courses\CourseResource;
use App\Filament\Resources\Courses\RelationManagers\LessonsRelationManager;
use App\Filament\Resources\Courses\RelationManagers\ModulesRelationManager;
use App\Filament\Resources\ExamOptions\ExamOptionResource;
use App\Filament\Resources\ExamQuestions\ExamQuestionResource;
use App\Filament\Resources\Exams\ExamResource;
use App\Filament\Resources\Exams\RelationManagers\QuestionsRelationManager;
use App\Filament\Resources\LessonMaterials\LessonMaterialResource;
use App\Filament\Resources\LessonProgress\LessonProgressResource;
use App\Filament\Resources\Lessons\LessonResource;
use App\Filament\Resources\Lessons\RelationManagers\MaterialsRelationManager;
use App\Mail\CertificateAvailableMail;
use App\Mail\CourseEnrollmentMail;
use App\Mail\ExamPassedMail;
use App\Mail\WelcomeStudentMail;
use App\Models\Course;
use App\Models\Exam;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class NotificationsAndAdminTest extends TestCase
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

    private function admin(): User
    {
        return User::create([
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);
    }

    /** @return array{0: Course, 1: Exam, 2: array} */
    private function courseWithExam(string $slug = 'eco'): array
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
            'is_active' => true,
        ]);

        $questions = [];
        foreach (['P1', 'P2'] as $i => $text) {
            $q = $exam->questions()->create(['question_text' => $text, 'order' => $i + 1, 'points' => 1]);
            $correct = $q->options()->create(['option_text' => 'Correcta', 'is_correct' => true, 'order' => 1]);
            $q->options()->create(['option_text' => 'Incorrecta', 'is_correct' => false, 'order' => 2]);
            $questions[] = [$q, $correct];
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

    public function test_registration_sends_single_welcome_email(): void
    {
        Mail::fake();

        $this->post('register', [
            'name' => 'Nuevo',
            'email' => 'nuevo@test.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        Mail::assertSent(WelcomeStudentMail::class, 1);
    }

    public function test_new_enrollment_sends_email_but_reenrollment_does_not(): void
    {
        Mail::fake();
        $student = $this->student();
        [$course] = $this->courseWithExam();

        $this->actingAs($student)->post("student/courses/{$course->slug}/enroll");
        Mail::assertSent(CourseEnrollmentMail::class, 1);

        $this->actingAs($student)->post("student/courses/{$course->slug}/enroll");
        Mail::assertSent(CourseEnrollmentMail::class, 1);
    }

    public function test_passing_exam_sends_exam_and_certificate_emails(): void
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

        Mail::assertSent(ExamPassedMail::class, 1);
        Mail::assertSent(CertificateAvailableMail::class, 1);
    }

    public function test_email_failure_does_not_break_enrollment(): void
    {
        Mail::shouldReceive('to')->andThrow(new \RuntimeException('SMTP caído'));
        $student = $this->student();
        [$course] = $this->courseWithExam();

        $this->actingAs($student)
            ->post("student/courses/{$course->slug}/enroll")
            ->assertRedirect();

        $this->assertDatabaseHas('course_enrollments', [
            'user_id' => $student->id,
            'course_id' => $course->id,
            'status' => 'active',
        ]);
    }

    public function test_admin_can_access_panel_and_student_cannot(): void
    {
        $admin = $this->admin();
        $student = $this->student();

        $resources = [
            'admin/courses', 'admin/course-modules', 'admin/lessons',
            'admin/course-enrollments', 'admin/lesson-materials', 'admin/lesson-progress',
            'admin/exams', 'admin/exam-questions', 'admin/exam-options',
            'admin/exam-attempts', 'admin/certificates',
        ];

        foreach ($resources as $url) {
            $this->actingAs($admin)->get($url)->assertStatus(200);
        }

        $this->actingAs($student)->get('admin/courses')->assertStatus(403);
    }

    public function test_admin_edit_pages_expose_contextual_relationships(): void
    {
        $admin = $this->admin();
        [$course, $exam] = $this->courseWithExam();
        $module = $course->modules()->create(['title' => 'Módulo clínico', 'order' => 1]);
        $lesson = $course->lessons()->create([
            'course_module_id' => $module->id,
            'title' => 'Clase clínica',
            'order' => 1,
        ]);

        $this->actingAs($admin)
            ->get("admin/courses/{$course->id}/edit")
            ->assertOk();

        $this->actingAs($admin)
            ->get("admin/exams/{$exam->id}/edit")
            ->assertOk();

        $this->actingAs($admin)
            ->get("admin/lessons/{$lesson->id}/edit")
            ->assertOk();

        $this->assertContains(ModulesRelationManager::class, CourseResource::getRelations());
        $this->assertContains(LessonsRelationManager::class, CourseResource::getRelations());
        $this->assertContains(QuestionsRelationManager::class, ExamResource::getRelations());
        $this->assertContains(MaterialsRelationManager::class, LessonResource::getRelations());
        $this->assertFalse(ExamQuestionResource::shouldRegisterNavigation());
        $this->assertFalse(ExamOptionResource::shouldRegisterNavigation());
        $this->assertFalse(CourseModuleResource::shouldRegisterNavigation());
        $this->assertFalse(LessonResource::shouldRegisterNavigation());
        $this->assertFalse(CourseEnrollmentResource::shouldRegisterNavigation());
        $this->assertFalse(LessonMaterialResource::shouldRegisterNavigation());
        $this->assertFalse(LessonProgressResource::shouldRegisterNavigation());
    }
}
