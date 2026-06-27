<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Mail\CourseEnrollmentMail;
use App\Models\Course;
use App\Services\CourseProgressService;
use App\Support\SafeMail;
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

    public function show(Request $request, Course $course, CourseProgressService $progressService): Response
    {
        abort_unless($course->status === 'published', 404);

        $isEnrolled = $request->user()->isEnrolledIn($course);

        $course->load([
            'modules' => fn ($query) => $query->orderBy('order'),
            'modules.lessons' => fn ($query) => $query->orderBy('order'),
        ]);

        $completedLessonIds = $isEnrolled
            ? $progressService->completedLessonIds($request->user(), $course)->all()
            : [];

        $totalLessons = $course->lessons()->count();
        $completedLessons = count($completedLessonIds);
        $progressPercent = $progressService->percentage($completedLessons, $totalLessons);

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
                    'certificate_id' => $lastAttempt->status === 'passed'
                        ? $lastAttempt->certificate?->id
                        : null,
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

        // Notificar solo cuando hay un cambio real: inscripción nueva o reactivación.
        $shouldNotify = $enrollment->wasRecentlyCreated || $enrollment->status !== 'active';

        if ($enrollment->status !== 'active') {
            $enrollment->update([
                'status' => 'active',
                'enrolled_at' => $enrollment->enrolled_at ?? now(),
            ]);
        }

        if ($shouldNotify) {
            SafeMail::send($request->user()->email, new CourseEnrollmentMail($request->user(), $course));
        }

        return redirect()
            ->route('student.courses.show', $course->slug)
            ->with('success', 'Te inscribiste correctamente al curso.');
    }
}
