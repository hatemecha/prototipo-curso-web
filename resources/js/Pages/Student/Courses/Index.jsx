import Icon from '@/Components/Icon';
import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link } from '@inertiajs/react';

function formatPrice(price) {
    const value = Number(price);
    if (!value || value <= 0) {
        return 'Gratis';
    }
    return `$${value.toFixed(2)}`;
}

export default function Index({ courses }) {
    return (
        <StudentLayout
            header={
                <div>
                    <p className="eyebrow">Catálogo</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink">
                        Cursos disponibles
                    </h1>
                    <p className="mt-1 text-sm text-muted">
                        Elegí un curso, inscribite y empezá a sumar habilidades.
                    </p>
                </div>
            }
        >
            <Head title="Cursos" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {courses.length === 0 ? (
                    <div className="card border-dashed p-12 text-center text-muted">
                        No hay cursos publicados por el momento.
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="card group flex flex-col p-5 transition hover:border-lineStrong"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-soft text-primary">
                                        <Icon name="book" className="h-5 w-5" />
                                    </span>
                                    {course.is_enrolled ? (
                                        <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                                            <Icon name="check" className="h-3.5 w-3.5" />
                                            Inscripto
                                        </span>
                                    ) : (
                                        <span className="rounded-md bg-soft px-2.5 py-1 text-xs font-semibold text-muted">
                                            Disponible
                                        </span>
                                    )}
                                </div>

                                <h2 className="mt-4 text-base font-semibold leading-snug text-ink">
                                    {course.title}
                                </h2>
                                {course.description && (
                                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted">
                                        {course.description}
                                    </p>
                                )}
                                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                                    <span className="text-base font-bold tracking-tight text-ink">
                                        {formatPrice(course.price)}
                                    </span>
                                    <Link
                                        href={route('student.courses.show', course.slug)}
                                        className="btn-primary"
                                    >
                                        {course.is_enrolled ? 'Continuar' : 'Ver curso'}
                                        <Icon name="arrow" className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
