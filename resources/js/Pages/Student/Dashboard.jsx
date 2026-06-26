import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link, usePage } from '@inertiajs/react';

function Icon({ name, className = 'h-5 w-5' }) {
    const paths = {
        book: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
        layers: 'M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122',
        badge: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
        arrow: 'M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3',
    };
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={paths[name]} />
        </svg>
    );
}

export default function Dashboard({ stats, latestCourses }) {
    const user = usePage().props.auth.user;

    return (
        <StudentLayout
            header={
                <div>
                    <p className="eyebrow">Área de alumno</p>
                        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
                            Hola, {user.name.split(' ')[0]} 👋
                        </h1>
                    <p className="mt-1 text-muted">
                        Seguí formándote y sumá tu próximo certificado.
                    </p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-5 sm:grid-cols-3">
                    <Link
                        href={route('student.courses.index')}
                        className="card group flex items-center justify-between p-6 transition hover:-translate-y-0.5 hover:shadow-lift"
                    >
                        <div>
                            <p className="text-4xl font-extrabold text-ink">
                                {stats.publishedCourses}
                            </p>
                            <p className="mt-1 text-sm font-medium text-muted">
                                Cursos disponibles
                            </p>
                        </div>
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-soft text-primary">
                            <Icon name="book" className="h-6 w-6" />
                        </span>
                    </Link>

                    <Link
                        href={route('student.my-courses.index')}
                        className="card group flex items-center justify-between p-6 transition hover:-translate-y-0.5 hover:shadow-lift"
                    >
                        <div>
                            <p className="text-lg font-bold text-ink">
                                Mis cursos
                            </p>
                            <p className="mt-1 text-sm text-muted">
                                Retomá donde lo dejaste
                            </p>
                        </div>
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-soft text-primary">
                            <Icon name="layers" className="h-6 w-6" />
                        </span>
                    </Link>

                    <Link
                        href={route('student.certificates.index')}
                        className="card group flex items-center justify-between p-6 transition hover:-translate-y-0.5 hover:shadow-lift"
                    >
                        <div>
                            <p className="text-lg font-bold text-ink">
                                Certificados
                            </p>
                            <p className="mt-1 text-sm text-muted">
                                Descargá tus credenciales
                            </p>
                        </div>
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-soft text-primary">
                            <Icon name="badge" className="h-6 w-6" />
                        </span>
                    </Link>
                </div>

                <section>
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-extrabold tracking-tight text-ink">
                                Últimos cursos
                            </h2>
                            <p className="mt-1 text-sm text-muted">
                                Novedades publicadas en la plataforma
                            </p>
                        </div>
                        <Link
                            href={route('student.courses.index')}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-primaryHover"
                        >
                            Explorar
                            <Icon name="arrow" className="h-4 w-4" />
                        </Link>
                    </div>

                    {latestCourses.length > 0 ? (
                        <div className="grid gap-5 md:grid-cols-3">
                            {latestCourses.map((course) => (
                                <Link
                                    key={course.id}
                                    href={route('student.courses.show', course.slug)}
                                    className="card group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift"
                                >
                                    <div className="h-24 bg-mesh" />
                                    <div className="flex flex-1 flex-col p-5">
                                        <h3 className="text-base font-bold leading-snug text-ink">
                                            {course.title}
                                        </h3>
                                        {course.description && (
                                            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted">
                                                {course.description}
                                            </p>
                                        )}
                                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition group-hover:gap-2.5">
                                            Ver programa
                                            <Icon name="arrow" className="h-4 w-4" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="card border-dashed p-10 text-center text-sm text-muted">
                            Todavía no hay cursos publicados.
                        </div>
                    )}
                </section>
            </div>
        </StudentLayout>
    );
}
