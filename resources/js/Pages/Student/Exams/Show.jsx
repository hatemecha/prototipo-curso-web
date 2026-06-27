import Icon from '@/Components/Icon';
import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

function ResultBanner({ attempt, passingScore }) {
    const passed = attempt.status === 'passed';
    return (
        <div
            className={`flex items-start gap-4 rounded-lg border p-5 ${
                passed
                    ? 'border-success/30 bg-success/10 text-success'
                    : 'border-danger/30 bg-danger/10 text-danger'
            }`}
        >
            <span
                className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                    passed ? 'bg-success/15' : 'bg-danger/15'
                }`}
            >
                <Icon name={passed ? 'check' : 'x'} className="h-6 w-6" />
            </span>
            <div>
                <p className="font-display text-lg font-bold">
                    {passed ? 'Aprobado' : 'Desaprobado'} · {attempt.score}%
                </p>
                <p className="mt-0.5 text-sm opacity-90">
                    {attempt.earned_points ?? '-'} / {attempt.total_points ?? '-'}{' '}
                    puntos · Mínimo para aprobar: {passingScore}%
                </p>
                {attempt.submitted_at && (
                    <p className="mt-1 text-xs opacity-75">
                        Último intento: {attempt.submitted_at}
                    </p>
                )}
            </div>
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

    const answeredCount = exam.questions.filter(
        (q) => data.answers[q.id] !== undefined,
    ).length;
    const allAnswered = answeredCount === exam.questions.length;

    const submit = (e) => {
        e.preventDefault();
        post(route('student.courses.exam.submit', course.slug));
    };

    return (
        <StudentLayout
            header={
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="eyebrow">Evaluación final</p>
                        <h1 className="mt-1 font-display text-2xl font-bold text-ink">
                            {exam.title}
                        </h1>
                    </div>
                    <Link
                        href={route('student.courses.show', course.slug)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primaryHover"
                    >
                        <Icon name="back" className="h-4 w-4" />
                        Volver al curso
                    </Link>
                </div>
            }
        >
            <Head title={exam.title} />

            <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
                {flash?.success && (
                    <div className="flex items-center gap-3 rounded-lg border border-success/30 bg-success/10 p-4 text-sm font-medium text-success">
                        <Icon name="check" className="h-5 w-5 shrink-0" />
                        {flash.success}
                    </div>
                )}

                <section className="card p-6">
                    <p className="text-sm text-muted">
                        Curso:{' '}
                        <span className="font-semibold text-ink">
                            {course.title}
                        </span>
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="flex items-center gap-3 rounded-lg bg-soft/70 p-4">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Icon name="target" className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                                    Aprobación
                                </p>
                                <p className="font-display text-xl font-bold text-ink">
                                    {exam.passing_score}%
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-soft/70 p-4">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Icon name="repeat" className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                                    Intentos
                                </p>
                                <p className="font-display text-xl font-bold text-ink">
                                    {exam.max_attempts === null
                                        ? attemptsUsed
                                        : `${attemptsUsed}/${exam.max_attempts}`}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {lastAttempt && (
                    <ResultBanner
                        attempt={lastAttempt}
                        passingScore={exam.passing_score}
                    />
                )}

                {canAttempt ? (
                    <form onSubmit={submit} className="space-y-5">
                        {exam.questions.map((question, index) => (
                            <fieldset key={question.id} className="card p-6">
                                <legend className="float-none mb-4 font-display text-base font-semibold text-ink">
                                    <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                                        {index + 1}
                                    </span>
                                    {question.question_text}
                                    <span className="ml-2 text-xs font-normal text-muted">
                                        ({question.points} pt)
                                    </span>
                                </legend>
                                <div className="space-y-2.5">
                                    {question.options.map((option) => {
                                        const selected =
                                            data.answers[question.id] === option.id;
                                        return (
                                            <label
                                                key={option.id}
                                                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                                                    selected
                                                        ? 'border-primary bg-primary/5 text-ink'
                                                        : 'border-line bg-surface text-ink hover:border-lineStrong hover:bg-soft'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question_${question.id}`}
                                                    value={option.id}
                                                    checked={selected}
                                                    onChange={() =>
                                                        setAnswer(question.id, option.id)
                                                    }
                                                    className="h-4 w-4 border-lineStrong text-primary focus:ring-primary"
                                                />
                                                {option.option_text}
                                            </label>
                                        );
                                    })}
                                </div>
                            </fieldset>
                        ))}

                        {errors.answers && (
                            <p className="text-sm font-medium text-danger">
                                {errors.answers}
                            </p>
                        )}

                        <div className="sticky bottom-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-surface/90 p-4 shadow-card backdrop-blur-xl">
                            <p className="text-sm font-medium text-muted">
                                Respondidas{' '}
                                <span className="font-bold text-ink">
                                    {answeredCount}/{exam.questions.length}
                                </span>
                            </p>
                            <button
                                type="submit"
                                disabled={processing || !allAnswered}
                                className="btn-primary"
                            >
                                Enviar respuestas
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="card border-dashed p-8 text-center text-sm text-muted">
                        Alcanzaste el máximo de intentos para este examen.
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
