import Icon from '@/Components/Icon';
import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link, usePage } from '@inertiajs/react';

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
