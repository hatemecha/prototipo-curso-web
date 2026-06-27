import Icon from '@/Components/Icon';
import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

function formatPrice(price) {
    const value = Number(price);
    if (!value || value <= 0) {
        return 'Gratis';
    }
    return `$${value.toFixed(2)}`;
}

function ProgressBar({ progress }) {
    return (
        <div>
            <div className="mb-2 flex justify-between text-sm font-medium text-muted">
                <span>Progreso del curso</span>
                <span className="font-semibold text-ink">
                    {progress.completed}/{progress.total} ({progress.percent}%)
                </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-soft">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-primary transition-all"
                    style={{ width: `${progress.percent}%` }}
                />
            </div>
        </div>
    );
}

export default function Show({ course, isEnrolled, progress, exam }) {
    const flash = usePage().props.flash;
    const { post, processing } = useForm();

    const enroll = (e) => {
        e.preventDefault();
        post(route('student.courses.enroll', course.slug));
    };

    return (
        <StudentLayout
            header={
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="eyebrow">Programa del curso</p>
                        <h1 className="mt-2 font-display text-3xl font-extrabold text-ink">
                            {course.title}
                        </h1>
                    </div>
                    <Link
                        href={route('student.courses.index')}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primaryHover"
                    >
                        <Icon name="back" className="h-4 w-4" />
                        Volver a cursos
                    </Link>
                </div>
            }
        >
            <Head title={course.title} />

            <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
                {flash?.success && (
                    <div className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/10 p-4 text-sm font-medium text-primary">
                        <Icon name="check" className="h-5 w-5 shrink-0" />
                        {flash.success}
                    </div>
                )}

                <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
                    <div className="card overflow-hidden">
                        <div className="bg-hero p-7 text-onHero">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white">
                                <Icon name="cap" className="h-3.5 w-3.5" />
                                Curso médico online
                            </span>
                            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight">
                                {course.title}
                            </h2>
                        </div>
                        <div className="p-7">
                            <p className="text-base leading-8 text-ink">
                                {course.description ||
                                    'Programa médico con clases, evaluación y certificado.'}
                            </p>
                        </div>
                    </div>

                    <aside className="card h-fit p-6">
                        <p className="eyebrow">Acceso</p>
                        <p className="mt-2 font-display text-3xl font-extrabold text-ink">
                            {formatPrice(course.price)}
                        </p>

                        <div className="mt-5">
                            {isEnrolled ? (
                                <div className="space-y-5">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                                        <Icon name="check" className="h-4 w-4" />
                                        Inscripción activa
                                    </span>
                                    <ProgressBar progress={progress} />
                                </div>
                            ) : (
                                <form onSubmit={enroll}>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="btn-primary w-full"
                                    >
                                        Inscribirme
                                    </button>
                                    <p className="mt-3 text-center text-xs text-muted">
                                        Inscripción gratuita y simulada
                                    </p>
                                </form>
                            )}
                        </div>
                    </aside>
                </section>

                {!isEnrolled && (
                    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-lineStrong bg-surface/60 p-4 text-sm text-muted">
                        <Icon name="lock" className="h-5 w-5 shrink-0 text-muted" />
                        Inscribite para acceder al contenido completo de las clases.
                    </div>
                )}

                {isEnrolled && exam && (
                    <section className="card overflow-hidden">
                        <div className="flex flex-wrap items-center justify-between gap-4 p-6">
                            <div className="flex items-start gap-4">
                                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-soft text-primary">
                                    <Icon name="badge" className="h-6 w-6" />
                                </span>
                                <div>
                                    <p className="eyebrow">Evaluación final</p>
                                    <h2 className="mt-1 font-display text-xl font-bold text-ink">
                                        {exam.title}
                                    </h2>
                                    <p className="mt-1 text-sm text-muted">
                                        Puntaje mínimo: {exam.passing_score}%
                                    </p>
                                    {exam.last_attempt && (
                                        <p
                                            className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-semibold ${
                                                exam.last_attempt.status === 'passed'
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'bg-red-500/10 text-red-600'
                                            }`}
                                        >
                                            Último intento:{' '}
                                            {exam.last_attempt.status === 'passed'
                                                ? 'Aprobado'
                                                : 'Desaprobado'}{' '}
                                            ({exam.last_attempt.score}%)
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                {exam.last_attempt?.certificate_id && (
                                    <a
                                        href={route(
                                            'student.certificates.download',
                                            exam.last_attempt.certificate_id,
                                        )}
                                        className="btn-secondary px-5 py-2.5 text-sm"
                                    >
                                        <Icon name="badge" className="h-4 w-4" />
                                        Certificado
                                    </a>
                                )}
                                <Link
                                    href={route('student.courses.exam.show', course.slug)}
                                    className="btn-primary"
                                >
                                    Rendir examen
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                <section className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="font-display text-2xl font-bold text-ink">
                            Programa de clases
                        </h2>
                        <span className="rounded-full bg-soft px-3 py-1 text-sm font-medium text-muted">
                            {progress.total} clases
                        </span>
                    </div>

                    {course.modules.length === 0 ? (
                        <div className="card border-dashed p-10 text-center text-muted">
                            Este curso todavía no tiene contenido.
                        </div>
                    ) : (
                        course.modules.map((module, index) => (
                            <div key={module.id} className="card overflow-hidden">
                                <div className="border-b border-line bg-surface/40 px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                                            {index + 1}
                                        </span>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                                                Módulo {index + 1}
                                            </p>
                                            <h3 className="font-display text-lg font-bold text-ink">
                                                {module.title}
                                            </h3>
                                        </div>
                                    </div>
                                    {module.description && (
                                        <p className="mt-3 text-sm leading-6 text-muted">
                                            {module.description}
                                        </p>
                                    )}
                                </div>
                                {module.lessons.length === 0 ? (
                                    <p className="px-6 py-4 text-sm text-muted">
                                        Sin clases en este módulo.
                                    </p>
                                ) : (
                                    <ul className="divide-y divide-line">
                                        {module.lessons.map((lesson) => (
                                            <li key={lesson.id}>
                                                {isEnrolled ? (
                                                    <Link
                                                        href={route('student.lessons.show', lesson.id)}
                                                        className="flex items-center justify-between gap-4 px-6 py-4 text-sm text-ink transition hover:bg-soft"
                                                    >
                                                        <span className="flex min-w-0 items-center gap-3">
                                                            <span
                                                                className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                                                                    lesson.is_completed
                                                                        ? 'bg-primary text-white'
                                                                        : 'border border-lineStrong text-transparent'
                                                                }`}
                                                            >
                                                                <Icon name="check" className="h-4 w-4" />
                                                            </span>
                                                            <span className="truncate font-medium">
                                                                {lesson.title}
                                                            </span>
                                                        </span>
                                                        <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-primary">
                                                            Abrir
                                                            <Icon name="arrow" className="h-4 w-4" />
                                                        </span>
                                                    </Link>
                                                ) : (
                                                    <div className="flex items-center justify-between gap-4 px-6 py-4 text-sm text-muted">
                                                        <span className="flex min-w-0 items-center gap-3">
                                                            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-soft">
                                                                <Icon name="lock" className="h-3.5 w-3.5" />
                                                            </span>
                                                            <span className="truncate">
                                                                {lesson.title}
                                                            </span>
                                                        </span>
                                                        <span className="shrink-0 font-medium">
                                                            Bloqueado
                                                        </span>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))
                    )}
                </section>
            </div>
        </StudentLayout>
    );
}
