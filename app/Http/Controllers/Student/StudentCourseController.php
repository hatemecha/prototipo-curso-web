<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Inertia\Inertia;
use Inertia\Response;

class StudentCourseController extends Controller
{
    public function index(): Response
    {
        $courses = Course::where('status', 'published')
            ->orderBy('title')
            ->get(['id', 'title', 'slug', 'description', 'price', 'status']);

        return Inertia::render('Student/Courses/Index', [
            'courses' => $courses,
        ]);
    }

    public function show(Course $course): Response
    {
        abort_unless($course->status === 'published', 404);

        $course->load([
            'modules' => fn ($query) => $query->orderBy('order'),
            'modules.lessons' => fn ($query) => $query->orderBy('order'),
        ]);

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
                    ]),
                ]),
            ],
        ]);
    }
}
