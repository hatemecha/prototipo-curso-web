<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WelcomeStudentMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public User $user)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Bienvenido a Mini LMS Médico',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.welcome-student',
            with: [
                'name' => $this->user->name,
                'loginUrl' => route('login'),
            ],
        );
    }
}
