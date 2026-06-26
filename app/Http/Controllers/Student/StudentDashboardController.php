<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Inertia\Inertia;
use Inertia\Response;

class StudentDashboardController extends Controller
{
    public function __invoke(): Response
    {
        $publishedCourses = Course::where('status', 'published')->count();

        $latestCourses = Course::where('status', 'published')
            ->latest()
            ->take(3)
            ->get(['id', 'title', 'slug', 'description', 'price']);

        return Inertia::render('Student/Dashboard', [
            'stats' => [
                'publishedCourses' => $publishedCourses,
            ],
            'latestCourses' => $latestCourses,
        ]);
    }
}
