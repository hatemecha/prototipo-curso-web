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
                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
                        Cursos disponibles
                    </h1>
                    <p className="mt-1 text-muted">
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
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="card group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift"
                            >
                                <div className="relative h-28 bg-mesh">
                                    <div className="absolute right-4 top-4">
                                        {course.is_enrolled ? (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-bold text-primary">
                                                <Icon name="check" className="h-3.5 w-3.5" />
                                                Inscripto
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-ink">
                                                Disponible
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col p-6">
                                    <h2 className="text-lg font-bold leading-snug text-ink">
                                        {course.title}
                                    </h2>
                                    {course.description && (
                                        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted">
                                            {course.description}
                                        </p>
                                    )}
                                    <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                                        <span className="text-xl font-extrabold tracking-tight text-ink">
                                            {formatPrice(course.price)}
                                        </span>
                                        <Link
                                            href={route('student.courses.show', course.slug)}
                                            className="btn-primary px-5 py-2.5 text-sm"
                                        >
                                            {course.is_enrolled ? 'Continuar' : 'Ver curso'}
                                            <Icon name="arrow" className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
