<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class StudentLessonProgressController extends Controller
{
    public function complete(Request $request, Lesson $lesson): RedirectResponse
    {
        $this->authorizeAccess($request, $lesson);

        $request->user()->lessonProgress()->updateOrCreate(
            ['lesson_id' => $lesson->id],
            [
                'course_id' => $lesson->course_id,
                'completed_at' => now(),
            ],
        );

        return back()->with('success', 'Clase marcada como completada.');
    }

    public function uncomplete(Request $request, Lesson $lesson): RedirectResponse
    {
        $this->authorizeAccess($request, $lesson);

        $request->user()->lessonProgress()
            ->where('lesson_id', $lesson->id)
            ->delete();

        return back()->with('success', 'Clase marcada como pendiente.');
    }

    private function authorizeAccess(Request $request, Lesson $lesson): void
    {
        $lesson->loadMissing('course');

        abort_unless($lesson->course && $lesson->course->status === 'published', 404);
        abort_unless($request->user()->isEnrolledIn($lesson->course), 403);
    }
}
