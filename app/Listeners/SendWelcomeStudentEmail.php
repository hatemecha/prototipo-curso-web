<?php

namespace App\Listeners;

use App\Mail\WelcomeStudentMail;
use App\Models\User;
use App\Support\SafeMail;
use Illuminate\Auth\Events\Registered;

class SendWelcomeStudentEmail
{
    public function handle(Registered $event): void
    {
        $user = $event->user;

        if (! $user instanceof User) {
            return;
        }

        SafeMail::send($user->email, new WelcomeStudentMail($user));
    }
}
