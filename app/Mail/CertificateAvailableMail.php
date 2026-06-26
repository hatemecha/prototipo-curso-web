<?php

namespace App\Mail;

use App\Models\Certificate;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CertificateAvailableMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Certificate $certificate)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Tu certificado de {$this->certificate->course->title} está disponible",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.certificate-available',
            with: [
                'name' => $this->certificate->user->name,
                'courseTitle' => $this->certificate->course->title,
                'certificateNumber' => $this->certificate->certificate_number,
                'certificatesUrl' => route('student.certificates.index'),
            ],
        );
    }
}
