<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Support\Collection;

class CourseProgressService
{
    public function percentageFor(User $user, Course $course): int
    {
        return $this->percentage(
            $this->completedLessonIds($user, $course)->count(),
            $course->lessons()->count(),
        );
    }

    /** @return Collection<int, int> */
    public function completedLessonIds(User $user, Course $course): Collection
    {
        return $user->lessonProgress()
            ->where('course_id', $course->id)
            ->whereNotNull('completed_at')
            ->pluck('lesson_id');
    }

    public function isCompleted(User $user, Lesson $lesson): bool
    {
        return $user->lessonProgress()
            ->where('lesson_id', $lesson->id)
            ->whereNotNull('completed_at')
            ->exists();
    }

    public function percentage(int $completedLessons, int $totalLessons): int
    {
        return $totalLessons > 0
            ? (int) round(($completedLessons / $totalLessons) * 100)
            : 0;
    }
}
