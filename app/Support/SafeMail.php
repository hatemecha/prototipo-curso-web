<?php

namespace App\Support;

use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SafeMail
{
    /**
     * Envía un Mailable sin que un fallo rompa el flujo principal.
     * Si falla, registra el error en el log y continúa.
     */
    public static function send(string $to, Mailable $mailable): void
    {
        try {
            Mail::to($to)->send($mailable);
        } catch (\Throwable $e) {
            Log::error('Fallo al enviar email ('.$mailable::class.'): '.$e->getMessage());
        }
    }
}
