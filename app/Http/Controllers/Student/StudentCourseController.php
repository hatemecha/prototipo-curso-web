<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentCourseController extends Controller
{
    public function index(Request $request): Response
    {
        $courses = Course::where('status', 'published')
            ->orderBy('title')
            ->get(['id', 'title', 'slug', 'description', 'price', 'status']);

        $enrolledCourseIds = $request->user()->enrollments()
            ->where('status', 'active')
            ->pluck('course_id')
            ->all();

        $courses = $courses->map(fn ($course) => [
            'id' => $course->id,
            'title' => $course->title,
            'slug' => $course->slug,
            'description' => $course->description,
            'price' => $course->price,
            'is_enrolled' => in_array($course->id, $enrolledCourseIds, true),
        ]);

        return Inertia::render('Student/Courses/Index', [
            'courses' => $courses,
        ]);
    }

    public function show(Request $request, Course $course): Response
    {
        abort_unless($course->status === 'published', 404);

        $isEnrolled = $request->user()->isEnrolledIn($course);

        $course->load([
            'modules' => fn ($query) => $query->orderBy('order'),
            'modules.lessons' => fn ($query) => $query->orderBy('order'),
        ]);

        $completedLessonIds = $isEnrolled
            ? $request->user()->lessonProgress()
                ->where('course_id', $course->id)
                ->whereNotNull('completed_at')
                ->pluck('lesson_id')
                ->all()
            : [];

        $totalLessons = $course->lessons()->count();
        $completedLessons = count($completedLessonIds);
        $progressPercent = $totalLessons > 0
            ? (int) round(($completedLessons / $totalLessons) * 100)
            : 0;

        $exam = $isEnrolled
            ? $course->exam()->where('is_active', true)->withCount('questions')->first()
            : null;

        $hasExam = $exam !== null && $exam->questions_count > 0;

        $lastAttempt = $hasExam
            ? $exam->attempts()
                ->where('user_id', $request->user()->id)
                ->whereIn('status', ['passed', 'failed'])
                ->latest('submitted_at')
                ->first()
            : null;

        return Inertia::render('Student/Courses/Show', [
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
                'slug' => $course->slug,
                'description' => $course->description,
                'price' => $course->price,
                'modules' => $course->modules->map(fn ($module) => [
                    'id' => $module->id,
                    'title' => $module->title,
                    'description' => $module->description,
                    'lessons' => $module->lessons->map(fn ($lesson) => [
                        'id' => $lesson->id,
                        'title' => $lesson->title,
                        'is_completed' => in_array($lesson->id, $completedLessonIds, true),
                    ]),
                ]),
            ],
            'isEnrolled' => $isEnrolled,
            'progress' => [
                'total' => $totalLessons,
                'completed' => $completedLessons,
                'percent' => $progressPercent,
            ],
            'exam' => $hasExam ? [
                'title' => $exam->title,
                'passing_score' => $exam->passing_score,
                'last_attempt' => $lastAttempt ? [
                    'score' => $lastAttempt->score,
                    'status' => $lastAttempt->status,
                    'submitted_at' => $lastAttempt->submitted_at?->toDateTimeString(),
                ] : null,
            ] : null,
        ]);
    }

    public function enroll(Request $request, Course $course): RedirectResponse
    {
        abort_unless($course->status === 'published', 404);

        $enrollment = $request->user()->enrollments()->firstOrCreate(
            ['course_id' => $course->id],
            [
                'status' => 'active',
                'enrolled_at' => now(),
            ],
        );

        if ($enrollment->status !== 'active') {
            $enrollment->update([
                'status' => 'active',
                'enrolled_at' => $enrollment->enrolled_at ?? now(),
            ]);
        }

        return redirect()
            ->route('student.courses.show', $course->slug)
            ->with('success', 'Te inscribiste correctamente al curso.');
    }
}
