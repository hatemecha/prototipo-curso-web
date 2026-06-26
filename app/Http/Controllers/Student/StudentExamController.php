<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Mail\CertificateAvailableMail;
use App\Mail\ExamPassedMail;
use App\Models\Course;
use App\Models\Exam;
use App\Services\CertificateService;
use App\Support\SafeMail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class StudentExamController extends Controller
{
    public function show(Request $request, Course $course): Response
    {
        $exam = $this->resolveExam($request, $course);

        $exam->load(['questions' => fn ($q) => $q->orderBy('order'), 'questions.options' => fn ($q) => $q->orderBy('order')]);

        $attemptsUsed = $exam->attempts()
            ->where('user_id', $request->user()->id)
            ->whereIn('status', ['passed', 'failed'])
            ->count();

        $canAttempt = $exam->max_attempts === null || $attemptsUsed < $exam->max_attempts;

        $lastAttempt = $exam->attempts()
            ->where('user_id', $request->user()->id)
            ->whereIn('status', ['passed', 'failed'])
            ->latest('submitted_at')
            ->first();

        return Inertia::render('Student/Exams/Show', [
            'course' => [
                'title' => $course->title,
                'slug' => $course->slug,
            ],
            'exam' => [
                'id' => $exam->id,
                'title' => $exam->title,
                'passing_score' => $exam->passing_score,
                'max_attempts' => $exam->max_attempts,
                // Las opciones NO incluyen is_correct: la correccion es backend.
                'questions' => $exam->questions->map(fn ($question) => [
                    'id' => $question->id,
                    'question_text' => $question->question_text,
                    'points' => $question->points,
                    'options' => $question->options->map(fn ($option) => [
                        'id' => $option->id,
                        'option_text' => $option->option_text,
                    ]),
                ]),
            ],
            'attemptsUsed' => $attemptsUsed,
            'canAttempt' => $canAttempt,
            'lastAttempt' => $lastAttempt ? [
                'score' => $lastAttempt->score,
                'earned_points' => $lastAttempt->earned_points,
                'total_points' => $lastAttempt->total_points,
                'status' => $lastAttempt->status,
                'submitted_at' => $lastAttempt->submitted_at?->toDateTimeString(),
            ] : null,
        ]);
    }

    public function submit(Request $request, Course $course, CertificateService $certificateService): RedirectResponse
    {
        $exam = $this->resolveExam($request, $course);

        $attemptsUsed = $exam->attempts()
            ->where('user_id', $request->user()->id)
            ->whereIn('status', ['passed', 'failed'])
            ->count();

        abort_if($exam->max_attempts !== null && $attemptsUsed >= $exam->max_attempts, 403, 'Alcanzaste el máximo de intentos.');

        $validated = $request->validate([
            'answers' => ['array'],
        ]);
        $answers = $validated['answers'] ?? [];

        $exam->load(['questions.options']);

        $totalPoints = 0;
        $earnedPoints = 0;
        $answerRows = [];

        foreach ($exam->questions as $question) {
            $totalPoints += $question->points;

            $selectedOptionId = $answers[$question->id] ?? null;
            $option = $selectedOptionId
                ? $question->options->firstWhere('id', (int) $selectedOptionId)
                : null;

            // Solo se acepta una opcion que pertenezca a la pregunta.
            $isCorrect = $option !== null && $option->is_correct;
            $points = $isCorrect ? $question->points : 0;
            $earnedPoints += $points;

            $answerRows[] = [
                'exam_question_id' => $question->id,
                'exam_option_id' => $option?->id,
                'is_correct' => $isCorrect,
                'points_earned' => $points,
            ];
        }

        $score = $totalPoints > 0 ? (int) round(($earnedPoints / $totalPoints) * 100) : 0;
        $status = $score >= $exam->passing_score ? 'passed' : 'failed';

        $attempt = DB::transaction(function () use ($request, $exam, $score, $totalPoints, $earnedPoints, $status, $answerRows) {
            $attempt = $exam->attempts()->create([
                'user_id' => $request->user()->id,
                'score' => $score,
                'total_points' => $totalPoints,
                'earned_points' => $earnedPoints,
                'status' => $status,
                'started_at' => now(),
                'submitted_at' => now(),
            ]);

            $attempt->answers()->createMany($answerRows);

            return $attempt;
        });

        $message = "No alcanzaste el puntaje mínimo. Obtuviste {$score}%.";

        if ($status === 'passed') {
            $student = $request->user();

            SafeMail::send($student->email, new ExamPassedMail($student, $course, $attempt));

            $certificate = $certificateService->generateForAttempt($attempt);

            // Solo notificar si el certificado fue creado en este flujo (no duplicar).
            if ($certificate && $certificate->wasRecentlyCreated) {
                SafeMail::send($student->email, new CertificateAvailableMail($certificate));
            }

            $message = "¡Aprobaste el examen con {$score}%! Tu certificado ya está disponible en \"Certificados\".";
        }

        return redirect()
            ->route('student.courses.exam.show', $course->slug)
            ->with('success', $message);
    }

    private function resolveExam(Request $request, Course $course): Exam
    {
        abort_unless($course->status === 'published', 404);
        abort_unless($request->user()->isEnrolledIn($course), 403);

        $exam = $course->exam()->where('is_active', true)->first();

        abort_unless($exam, 404);
        abort_if($exam->questions()->count() === 0, 404);

        return $exam;
    }
}
