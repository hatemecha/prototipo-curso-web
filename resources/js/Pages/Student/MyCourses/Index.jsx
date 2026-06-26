import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link } from '@inertiajs/react';

function Icon({ name, className = 'h-4 w-4' }) {
    const paths = {
        arrow: 'M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3',
        check: 'M4.5 12.75l6 6 9-13.5',
    };
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={paths[name]} />
        </svg>
    );
}

export default function Index({ courses }) {
    return (
        <StudentLayout
            header={
                <div>
                    <p className="eyebrow">Aula personal</p>
                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
                        Mis cursos
                    </h1>
                    <p className="mt-1 text-muted">
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
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => {
                            const done = course.progress.percent >= 100;
                            return (
                                <div
                                    key={course.id}
                                    className="card group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift"
                                >
                                    <div className="relative h-24 bg-mesh">
                                        {done && (
                                            <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-bold text-primary">
                                                <Icon name="check" className="h-3.5 w-3.5" />
                                                Completado
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <h2 className="text-lg font-bold leading-snug text-ink">
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
                                            <div className="h-2.5 w-full overflow-hidden rounded-full bg-soft">
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
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
