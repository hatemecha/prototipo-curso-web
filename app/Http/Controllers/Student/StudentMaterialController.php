<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\LessonMaterial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class StudentMaterialController extends Controller
{
    public function download(Request $request, LessonMaterial $material): StreamedResponse
    {
        $material->load('lesson.course');

        $course = $material->lesson?->course;

        abort_unless($course && $course->status === 'published', 404);
        abort_unless($request->user()->isEnrolledIn($course), 403);
        abort_unless($material->is_downloadable, 403);
        abort_unless(Storage::disk('public')->exists($material->file_path), 404);

        $extension = pathinfo($material->file_path, PATHINFO_EXTENSION);
        $downloadName = $material->title.($extension ? '.'.$extension : '');

        return Storage::disk('public')->download($material->file_path, $downloadName);
    }
}
