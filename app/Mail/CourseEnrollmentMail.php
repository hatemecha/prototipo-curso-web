<?php

namespace App\Mail;

use App\Models\Course;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CourseEnrollmentMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public User $user, public Course $course)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Ya tenés acceso al curso {$this->course->title}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.course-enrollment',
            with: [
                'name' => $this->user->name,
                'courseTitle' => $this->course->title,
                'courseUrl' => route('student.courses.show', $this->course->slug),
            ],
        );
    }
}
