import Icon from '@/Components/Icon';
import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ courses }) {
    return (
        <StudentLayout
            header={
                <div>
                    <p className="eyebrow">Aula personal</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink">
                        Mis cursos
                    </h1>
                    <p className="mt-1 text-sm text-muted">
                        Los cursos en los que estás inscripto y tu avance.
                    </p>
                </div>
            }
        >
            <Head title="Mis cursos" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {courses.length === 0 ? (
                    <div className="card border-dashed p-12 text-center">
                        <p className="text-muted">
                            Todavía no estás inscripto en ningún curso.
                        </p>
                        <Link
                            href={route('student.courses.index')}
                            className="btn-primary mt-5"
                        >
                            Explorar cursos
                            <Icon name="arrow" className="h-4 w-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => {
                            const done = course.progress.percent >= 100;
                            return (
                                <div
                                    key={course.id}
                                    className="card group flex flex-col p-5 transition hover:border-lineStrong"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-soft text-primary">
                                            <Icon name="layers" className="h-5 w-5" />
                                        </span>
                                        {done && (
                                            <span className="inline-flex items-center gap-1 rounded-md bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                                                <Icon name="check" className="h-3.5 w-3.5" />
                                                Completado
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="mt-4 text-base font-semibold leading-snug text-ink">
                                        {course.title}
                                    </h2>
                                    {course.description && (
                                        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-muted">
                                            {course.description}
                                        </p>
                                    )}
                                    <div className="mt-5">
                                        <div className="mb-2 flex justify-between text-xs font-medium text-muted">
                                            <span>
                                                {course.progress.completed}/
                                                {course.progress.total} clases
                                            </span>
                                            <span className="font-semibold text-ink">
                                                {course.progress.percent}%
                                            </span>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-soft">
                                            <div
                                                className="h-full rounded-full bg-primary transition-all"
                                                style={{ width: `${course.progress.percent}%` }}
                                            />
                                        </div>
                                    </div>
                                    <Link
                                        href={route('student.courses.show', course.slug)}
                                        className="btn-primary mt-5 w-full"
                                    >
                                        {done ? 'Repasar' : 'Continuar'}
                                        <Icon name="arrow" className="h-4 w-4" />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
