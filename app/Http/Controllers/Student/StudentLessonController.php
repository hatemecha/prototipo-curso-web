<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Inertia\Inertia;
use Inertia\Response;

class StudentLessonController extends Controller
{
    public function show(Lesson $lesson): Response
    {
        $lesson->load(['course', 'module']);

        abort_unless($lesson->course && $lesson->course->status === 'published', 404);

        return Inertia::render('Student/Lessons/Show', [
            'lesson' => [
                'id' => $lesson->id,
                'title' => $lesson->title,
                'description' => $lesson->description,
                'content' => $lesson->content,
                'video_url' => $lesson->video_url,
                'course' => [
                    'title' => $lesson->course->title,
                    'slug' => $lesson->course->slug,
                ],
                'module' => $lesson->module ? [
                    'title' => $lesson->module->title,
                ] : null,
            ],
        ]);
    }
}
