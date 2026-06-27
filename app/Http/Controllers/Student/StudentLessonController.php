<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Services\CourseProgressService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentLessonController extends Controller
{
    public function show(Request $request, Lesson $lesson, CourseProgressService $progressService): Response
    {
        $lesson->load(['course', 'module', 'materials']);

        abort_unless($lesson->course && $lesson->course->status === 'published', 404);

        abort_unless($request->user()->isEnrolledIn($lesson->course), 403);

        $isCompleted = $progressService->isCompleted($request->user(), $lesson);

        $totalLessons = $lesson->course->lessons()->count();
        $completedLessons = $progressService
            ->completedLessonIds($request->user(), $lesson->course)
            ->count();
        $progressPercent = $progressService->percentage($completedLessons, $totalLessons);

        return Inertia::render('Student/Lessons/Show', [
            'lesson' => [
                'id' => $lesson->id,
                'title' => $lesson->title,
                'description' => $lesson->description,
                'content' => $lesson->content,
                'video_url' => $lesson->video_url,
                'is_completed' => $isCompleted,
                'course' => [
                    'title' => $lesson->course->title,
                    'slug' => $lesson->course->slug,
                ],
                'module' => $lesson->module ? [
                    'title' => $lesson->module->title,
                ] : null,
                'materials' => $lesson->materials->map(fn ($material) => [
                    'id' => $material->id,
                    'title' => $material->title,
                    'file_type' => $material->file_type,
                    'is_downloadable' => $material->is_downloadable,
                ]),
            ],
            'progress' => [
                'total' => $totalLessons,
                'completed' => $completedLessons,
                'percent' => $progressPercent,
            ],
        ]);
    }
}
