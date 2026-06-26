<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentMyCourseController extends Controller
{
    public function index(Request $request): Response
    {
        $courses = $request->user()->courses()
            ->wherePivot('status', 'active')
            ->where('courses.status', 'published')
            ->orderBy('title')
            ->get(['courses.id', 'title', 'slug', 'description', 'price']);

        $courses = $courses->map(fn ($course) => [
            'id' => $course->id,
            'title' => $course->title,
            'slug' => $course->slug,
            'description' => $course->description,
            'price' => $course->price,
        ]);

        return Inertia::render('Student/MyCourses/Index', [
            'courses' => $courses,
        ]);
    }
}
