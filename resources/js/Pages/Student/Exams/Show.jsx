import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

function ResultBanner({ attempt, passingScore }) {
    const passed = attempt.status === 'passed';
    return (
        <div
            className={`rounded-lg p-4 ${
                passed
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
            }`}
        >
            <p className="font-semibold">
                {passed ? 'Aprobado' : 'Desaprobado'} — {attempt.score}%
            </p>
            <p className="text-sm">
                {attempt.earned_points ?? '—'} / {attempt.total_points ?? '—'}{' '}
                puntos · mínimo para aprobar: {passingScore}%
            </p>
            {attempt.submitted_at && (
                <p className="mt-1 text-xs opacity-75">
                    Último intento: {attempt.submitted_at}
                </p>
            )}
        </div>
    );
}

export default function Show({
    course,
    exam,
    attemptsUsed,
    canAttempt,
    lastAttempt,
}) {
    const flash = usePage().props.flash;
    const { data, setData, post, processing, errors } = useForm({
        answers: {},
    });

    const setAnswer = (questionId, optionId) => {
        setData('answers', { ...data.answers, [questionId]: optionId });
    };

    const allAnswered = exam.questions.every(
        (q) => data.answers[q.id] !== undefined,
    );

    const submit = (e) => {
        e.preventDefault();
        post(route('student.courses.exam.submit', course.slug));
    };

    return (
        <StudentLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {exam.title}
                    </h2>
                    <Link
                        href={route('student.courses.show', course.slug)}
                        className="text-sm text-indigo-600 hover:underline"
                    >
                        ← Volver al curso
                    </Link>
                </div>
            }
        >
            <Head title={exam.title} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
                            {flash.success}
                        </div>
                    )}

                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-600">
                            Curso:{' '}
                            <span className="font-medium text-gray-800">
                                {course.title}
                            </span>
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                            Puntaje mínimo de aprobación:{' '}
                            <span className="font-medium text-gray-800">
                                {exam.passing_score}%
                            </span>
                        </p>
                        {exam.max_attempts !== null && (
                            <p className="mt-1 text-sm text-gray-600">
                                Intentos usados: {attemptsUsed}/
                                {exam.max_attempts}
                            </p>
                        )}
                    </div>

                    {lastAttempt && (
                        <ResultBanner
                            attempt={lastAttempt}
                            passingScore={exam.passing_score}
                        />
                    )}

                    {canAttempt ? (
                        <form onSubmit={submit} className="space-y-6">
                            {exam.questions.map((question, index) => (
                                <div
                                    key={question.id}
                                    className="rounded-lg bg-white p-6 shadow-sm"
                                >
                                    <p className="font-medium text-gray-900">
                                        {index + 1}. {question.question_text}
                                        <span className="ml-2 text-xs text-gray-400">
                                            ({question.points} pt)
                                        </span>
                                    </p>
                                    <div className="mt-3 space-y-2">
                                        {question.options.map((option) => (
                                            <label
                                                key={option.id}
                                                className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question_${question.id}`}
                                                    value={option.id}
                                                    checked={
                                                        data.answers[
                                                            question.id
                                                        ] === option.id
                                                    }
                                                    onChange={() =>
                                                        setAnswer(
                                                            question.id,
                                                            option.id,
                                                        )
                                                    }
                                                    className="text-indigo-600"
                                                />
                                                {option.option_text}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {errors.answers && (
                                <p className="text-sm text-red-600">
                                    {errors.answers}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={processing || !allAnswered}
                                className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
                            >
                                Enviar respuestas
                            </button>
                            {!allAnswered && (
                                <p className="text-xs text-gray-400">
                                    Respondé todas las preguntas para enviar.
                                </p>
                            )}
                        </form>
                    ) : (
                        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500">
                            Alcanzaste el máximo de intentos para este examen.
                        </div>
                    )}
                </div>
            </div>
        </StudentLayout>
    );
}
