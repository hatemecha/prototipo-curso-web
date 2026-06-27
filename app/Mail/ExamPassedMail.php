<?php

namespace App\Mail;

use App\Models\Course;
use App\Models\ExamAttempt;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ExamPassedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user,
        public Course $course,
        public ExamAttempt $attempt,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Aprobaste el examen de {$this->course->title}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.exam-passed',
            with: [
                'name' => $this->user->name,
                'courseTitle' => $this->course->title,
                'score' => $this->attempt->score,
                'courseUrl' => route('student.courses.show', $this->course->slug),
            ],
        );
    }
}
