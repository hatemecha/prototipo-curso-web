<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Services\CourseProgressService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentMyCourseController extends Controller
{
    public function index(Request $request, CourseProgressService $progressService): Response
    {
        $user = $request->user();

        $courses = $user->courses()
            ->wherePivot('status', 'active')
            ->where('courses.status', 'published')
            ->withCount('lessons')
            ->orderBy('title')
            ->get(['courses.id', 'title', 'slug', 'description', 'price']);

        $completedByCourse = $user->lessonProgress()
            ->whereNotNull('completed_at')
            ->selectRaw('course_id, count(*) as total')
            ->groupBy('course_id')
            ->pluck('total', 'course_id');

        $courses = $courses->map(function ($course) use ($completedByCourse, $progressService) {
            $total = $course->lessons_count;
            $completed = (int) ($completedByCourse[$course->id] ?? 0);

            return [
                'id' => $course->id,
                'title' => $course->title,
                'slug' => $course->slug,
                'description' => $course->description,
                'price' => $course->price,
                'progress' => [
                    'total' => $total,
                    'completed' => $completed,
                    'percent' => $progressService->percentage($completed, $total),
                ],
            ];
        });

        return Inertia::render('Student/MyCourses/Index', [
            'courses' => $courses,
        ]);
    }
}
