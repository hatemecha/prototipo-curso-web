<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Services\CertificateService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Inertia\Inertia;
use Inertia\Response;

class StudentCertificateController extends Controller
{
    public function index(Request $request): Response
    {
        $certificates = $request->user()
            ->certificates()
            ->with(['course:id,title', 'attempt:id,score'])
            ->latest('issued_at')
            ->get()
            ->map(fn (Certificate $certificate) => [
                'id' => $certificate->id,
                'number' => $certificate->certificate_number,
                'course' => $certificate->course?->title,
                'score' => $certificate->attempt?->score,
                'issued_at' => $certificate->issued_at?->format('d/m/Y'),
            ]);

        return Inertia::render('Student/Certificates/Index', [
            'certificates' => $certificates,
        ]);
    }

    public function download(Request $request, Certificate $certificate): StreamedResponse
    {
        abort_unless($certificate->user_id === $request->user()->id, 403);

        $disk = Storage::disk(CertificateService::DISK);

        abort_unless($certificate->pdf_path && $disk->exists($certificate->pdf_path), 404);

        return $disk->download(
            $certificate->pdf_path,
            $certificate->certificate_number.'.pdf'
        );
    }
}
