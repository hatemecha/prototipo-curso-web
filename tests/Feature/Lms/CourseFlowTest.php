<?php

namespace Tests\Feature\Lms;

use App\Models\Course;
use App\Models\LessonMaterial;
use App\Models\User;
use App\Services\CourseProgressService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class CourseFlowTest extends TestCase
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

    private function publishedCourse(string $slug = 'curso', string $status = 'published'): Course
    {
        $course = Course::create([
            'title' => 'Curso '.$slug,
            'slug' => $slug,
            'description' => 'Descripción',
            'price' => 0,
            'status' => $status,
        ]);

        $module = $course->modules()->create(['title' => 'Módulo 1', 'order' => 1]);
        $course->lessons()->create([
            'course_module_id' => $module->id,
            'title' => 'Clase 1',
            'order' => 1,
        ]);

        return $course;
    }

    private function enroll(User $user, Course $course): void
    {
        $user->enrollments()->create([
            'course_id' => $course->id,
            'status' => 'active',
            'enrolled_at' => now(),
        ]);
    }

    public function test_only_published_courses_are_listed(): void
    {
        $student = $this->student();
        $this->publishedCourse('publicado', 'published');
        $this->publishedCourse('borrador', 'draft');

        $this->actingAs($student)
            ->get('student/courses')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->has('courses', 1));
    }

    public function test_guest_cannot_access_student_area(): void
    {
        $this->get('student/dashboard')->assertRedirect('login');
        $this->get('student/courses')->assertRedirect('login');
        $this->get('student/my-courses')->assertRedirect('login');
    }

    public function test_draft_course_detail_returns_404(): void
    {
        $student = $this->student();
        $course = $this->publishedCourse('borrador', 'draft');

        $this->actingAs($student)->get("student/courses/{$course->slug}")->assertNotFound();
    }

    public function test_enrolled_student_can_open_lesson_but_not_enrolled_cannot(): void
    {
        Mail::fake();
        $student = $this->student();
        $course = $this->publishedCourse();
        $lesson = $course->lessons()->first();

        $this->actingAs($student)->get("student/lessons/{$lesson->id}")->assertStatus(403);

        $this->enroll($student, $course);
        $this->actingAs($student)->get("student/lessons/{$lesson->id}")->assertStatus(200);
    }

    public function test_lesson_progress_is_idempotent(): void
    {
        $student = $this->student();
        $course = $this->publishedCourse();
        $lesson = $course->lessons()->first();
        $this->enroll($student, $course);

        $this->actingAs($student)->post("student/lessons/{$lesson->id}/complete");
        $this->actingAs($student)->post("student/lessons/{$lesson->id}/complete");

        $this->assertDatabaseCount('lesson_progress', 1);

        $this->actingAs($student)->delete("student/lessons/{$lesson->id}/complete");
        $this->assertDatabaseCount('lesson_progress', 0);
    }

    public function test_course_progress_service_reports_completed_lessons(): void
    {
        $student = $this->student();
        $course = $this->publishedCourse();
        $lesson = $course->lessons()->first();
        $course->lessons()->create([
            'course_module_id' => $lesson->course_module_id,
            'title' => 'Clase 2',
            'order' => 2,
        ]);
        $student->lessonProgress()->create([
            'course_id' => $course->id,
            'lesson_id' => $lesson->id,
            'completed_at' => now(),
        ]);

        $service = app(CourseProgressService::class);

        $this->assertSame([$lesson->id], $service->completedLessonIds($student, $course)->all());
        $this->assertTrue($service->isCompleted($student, $lesson));
        $this->assertSame(50, $service->percentageFor($student, $course));
    }

    public function test_my_courses_shows_only_enrolled(): void
    {
        Mail::fake();
        $student = $this->student();
        $enrolled = $this->publishedCourse('inscripto');
        $this->publishedCourse('otro');
        $this->enroll($student, $enrolled);

        $this->actingAs($student)
            ->get('student/my-courses')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->has('courses', 1));
    }

    public function test_enrolled_student_can_download_downloadable_material_only(): void
    {
        Storage::fake(LessonMaterial::DISK);
        $student = $this->student();
        $course = $this->publishedCourse();
        $lesson = $course->lessons()->first();
        $this->enroll($student, $course);

        Storage::disk(LessonMaterial::DISK)->put('lesson-materials/ok.pdf', 'contenido');
        $downloadable = LessonMaterial::create([
            'lesson_id' => $lesson->id,
            'title' => 'Guía',
            'file_path' => 'lesson-materials/ok.pdf',
            'is_downloadable' => true,
        ]);
        $locked = LessonMaterial::create([
            'lesson_id' => $lesson->id,
            'title' => 'No descargable',
            'file_path' => 'lesson-materials/ok.pdf',
            'is_downloadable' => false,
        ]);

        $this->actingAs($student)->get("student/materials/{$downloadable->id}/download")->assertStatus(200);
        $this->actingAs($student)->get("student/materials/{$locked->id}/download")->assertStatus(403);
    }

    public function test_non_enrolled_cannot_download_material(): void
    {
        Storage::fake(LessonMaterial::DISK);
        $student = $this->student();
        $course = $this->publishedCourse();
        $lesson = $course->lessons()->first();

        Storage::disk(LessonMaterial::DISK)->put('lesson-materials/ok.pdf', 'contenido');
        $material = LessonMaterial::create([
            'lesson_id' => $lesson->id,
            'title' => 'Guía',
            'file_path' => 'lesson-materials/ok.pdf',
            'is_downloadable' => true,
        ]);

        $this->actingAs($student)->get("student/materials/{$material->id}/download")->assertStatus(403);
    }

    public function test_material_download_does_not_fall_back_to_public_storage(): void
    {
        Storage::fake('public');
        Storage::fake(LessonMaterial::DISK);
        $student = $this->student();
        $course = $this->publishedCourse();
        $lesson = $course->lessons()->first();
        $this->enroll($student, $course);

        Storage::disk('public')->put('lesson-materials/ok.pdf', 'contenido publico');
        $material = LessonMaterial::create([
            'lesson_id' => $lesson->id,
            'title' => 'Guía',
            'file_path' => 'lesson-materials/ok.pdf',
            'is_downloadable' => true,
        ]);

        $this->actingAs($student)->get("student/materials/{$material->id}/download")->assertNotFound();
    }
}
