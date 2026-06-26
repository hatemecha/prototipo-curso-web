<?php

namespace App\Services;

use App\Models\Certificate;
use App\Models\ExamAttempt;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class CertificateService
{
    public const DISK = 'local';

    /**
     * Genera (o devuelve) el certificado de un intento aprobado.
     * Devuelve null si el intento no está aprobado.
     */
    public function generateForAttempt(ExamAttempt $attempt): ?Certificate
    {
        if ($attempt->status !== 'passed') {
            return null;
        }

        // Idempotente: un solo certificado por intento.
        $existing = Certificate::where('exam_attempt_id', $attempt->id)->first();
        if ($existing) {
            return $existing;
        }

        $attempt->loadMissing(['user', 'exam.course']);

        $certificate = new Certificate([
            'user_id' => $attempt->user_id,
            'course_id' => $attempt->exam->course_id,
            'exam_attempt_id' => $attempt->id,
            'certificate_number' => 'PENDING-'.$attempt->id,
            'issued_at' => now(),
        ]);
        $certificate->save();

        $certificate->certificate_number = $this->buildNumber($certificate->id, $certificate->issued_at->year);

        $path = $this->renderPdf($certificate, $attempt);
        $certificate->pdf_path = $path;
        $certificate->save();

        return $certificate;
    }

    private function buildNumber(int $id, int $year): string
    {
        return sprintf('CERT-%d-%06d', $year, $id);
    }

    private function renderPdf(Certificate $certificate, ExamAttempt $attempt): string
    {
        $pdf = Pdf::loadView('certificates.pdf', [
            'studentName' => $attempt->user->name,
            'studentEmail' => $attempt->user->email,
            'courseTitle' => $attempt->exam->course->title,
            'score' => $attempt->score,
            'issuedAt' => $certificate->issued_at->format('d/m/Y'),
            'certificateNumber' => $certificate->certificate_number,
        ])->setPaper('a4', 'landscape');

        $path = 'certificates/'.$certificate->certificate_number.'.pdf';
        Storage::disk(self::DISK)->put($path, $pdf->output());

        return $path;
    }
}
