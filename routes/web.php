<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Student\StudentCourseController;
use App\Http\Controllers\Student\StudentDashboardController;
use App\Http\Controllers\Student\StudentExamController;
use App\Http\Controllers\Student\StudentLessonController;
use App\Http\Controllers\Student\StudentLessonProgressController;
use App\Http\Controllers\Student\StudentMaterialController;
use App\Http\Controllers\Student\StudentMyCourseController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->prefix('student')->name('student.')->group(function () {
    Route::get('/dashboard', StudentDashboardController::class)->name('dashboard');
    Route::get('/courses', [StudentCourseController::class, 'index'])->name('courses.index');
    Route::get('/courses/{course:slug}', [StudentCourseController::class, 'show'])->name('courses.show');
    Route::post('/courses/{course:slug}/enroll', [StudentCourseController::class, 'enroll'])->name('courses.enroll');
    Route::get('/courses/{course:slug}/exam', [StudentExamController::class, 'show'])->name('courses.exam.show');
    Route::post('/courses/{course:slug}/exam', [StudentExamController::class, 'submit'])->name('courses.exam.submit');
    Route::get('/my-courses', [StudentMyCourseController::class, 'index'])->name('my-courses.index');
    Route::get('/lessons/{lesson}', [StudentLessonController::class, 'show'])->name('lessons.show');
    Route::post('/lessons/{lesson}/complete', [StudentLessonProgressController::class, 'complete'])->name('lessons.complete');
    Route::delete('/lessons/{lesson}/complete', [StudentLessonProgressController::class, 'uncomplete'])->name('lessons.uncomplete');
    Route::get('/materials/{material}/download', [StudentMaterialController::class, 'download'])->name('materials.download');
});

require __DIR__.'/auth.php';
