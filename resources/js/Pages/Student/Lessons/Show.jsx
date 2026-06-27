import Icon from '@/Components/Icon';
import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link, useForm } from '@inertiajs/react';

function ProgressBar({ progress }) {
    return (
        <div>
            <div className="mb-2 flex justify-between text-sm font-medium text-muted">
                <span>Progreso del curso</span>
                <span className="font-semibold text-ink">{progress.percent}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-soft">
                <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${progress.percent}%` }}
                />
            </div>
            <p className="mt-2 text-xs text-muted">
                {progress.completed}/{progress.total} clases completadas
            </p>
        </div>
    );
}

export default function Show({ lesson, progress }) {
    const { post, delete: destroy, processing } = useForm();

    const markComplete = (e) => {
        e.preventDefault();
        post(route('student.lessons.complete', lesson.id), {
            preserveScroll: true,
        });
    };

    const markPending = (e) => {
        e.preventDefault();
        destroy(route('student.lessons.uncomplete', lesson.id), {
            preserveScroll: true,
        });
    };

    return (
        <StudentLayout
            header={
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="eyebrow">Clase</p>
                        <h1 className="mt-1 font-display text-2xl font-bold text-ink">
                            {lesson.title}
                        </h1>
                    </div>
                    <Link
                        href={route('student.courses.show', lesson.course.slug)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primaryHover"
                    >
                        <Icon name="back" className="h-4 w-4" />
                        Volver al curso
                    </Link>
                </div>
            }
        >
            <Head title={lesson.title} />

            <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
                <article className="card p-6 sm:p-7">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                        {lesson.course.title}
                        {lesson.module && ` · ${lesson.module.title}`}
                    </p>
                    <h2 className="mt-2 text-xl font-bold leading-tight text-ink">
                        {lesson.title}
                    </h2>

                    <div className="mt-5 border-t border-line pt-5">
                        {lesson.description && (
                            <p className="text-sm leading-7 text-ink">
                                {lesson.description}
                            </p>
                        )}

                        {lesson.content && (
                            <div className="mt-4 whitespace-pre-line leading-7 text-ink">
                                {lesson.content}
                            </div>
                        )}

                        {lesson.video_url && (
                            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-soft/60 p-4">
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Icon name="play" className="h-5 w-5" />
                                    </span>
                                    <p className="font-semibold text-ink">
                                        Video de la clase
                                    </p>
                                </div>
                                <a
                                    href={lesson.video_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                >
                                    Abrir video
                                </a>
                            </div>
                        )}
                    </div>
                </article>

                <aside className="space-y-6">
                    <section className="card p-6">
                        <ProgressBar progress={progress} />
                        <div className="mt-5">
                            {lesson.is_completed ? (
                                <form onSubmit={markPending}>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="btn-ghost w-full"
                                    >
                                        Marcar como pendiente
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={markComplete}>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="btn-primary w-full"
                                    >
                                        <Icon name="check" className="h-4 w-4" />
                                        Marcar como completada
                                    </button>
                                </form>
                            )}
                        </div>
                    </section>

                    <section className="card p-6">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="font-display text-base font-semibold text-ink">
                                Materiales
                            </h2>
                            <span className="rounded-md bg-soft px-2 py-0.5 text-sm font-medium text-muted">
                                {lesson.materials.length}
                            </span>
                        </div>

                        {lesson.materials.length > 0 ? (
                            <ul className="mt-4 space-y-3">
                                {lesson.materials.map((material) => (
                                    <li
                                        key={material.id}
                                        className="rounded-lg border border-line bg-soft/50 p-3.5"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex min-w-0 items-start gap-3">
                                                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                    <Icon name="doc" className="h-5 w-5" />
                                                </span>
                                                <div className="min-w-0">
                                                    <p className="truncate font-medium text-ink">
                                                        {material.title}
                                                    </p>
                                                    {material.file_type && (
                                                        <p className="mt-0.5 text-xs uppercase text-muted">
                                                            {material.file_type}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            {material.is_downloadable ? (
                                                <a
                                                    href={route('student.materials.download', material.id)}
                                                    className="inline-flex shrink-0 items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-primaryHover"
                                                >
                                                    <Icon name="download" className="h-3.5 w-3.5" />
                                                    Bajar
                                                </a>
                                            ) : (
                                                <span className="shrink-0 text-xs text-muted">
                                                    Solo lectura
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-4 rounded-lg border border-dashed border-line p-4 text-sm text-muted">
                                Esta clase no tiene materiales.
                            </p>
                        )}
                    </section>
                </aside>
            </div>
        </StudentLayout>
    );
}
