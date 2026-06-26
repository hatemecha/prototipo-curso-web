<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentLessonController extends Controller
{
    public function show(Request $request, Lesson $lesson): Response
    {
        $lesson->load(['course', 'module']);

        abort_unless($lesson->course && $lesson->course->status === 'published', 404);

        abort_unless($request->user()->isEnrolledIn($lesson->course), 403);

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
