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
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink">
                        Hola, {user.name.split(' ')[0]}
                    </h1>
                    <p className="mt-1 text-sm text-muted">
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
                        className="card group flex items-center justify-between p-5 transition hover:border-lineStrong"
                    >
                        <div>
                            <p className="text-3xl font-bold text-ink">
                                {stats.publishedCourses}
                            </p>
                            <p className="mt-1 text-sm font-medium text-muted">
                                Cursos disponibles
                            </p>
                        </div>
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-soft text-primary">
                            <Icon name="book" className="h-5 w-5" />
                        </span>
                    </Link>

                    <Link
                        href={route('student.my-courses.index')}
                        className="card group flex items-center justify-between p-5 transition hover:border-lineStrong"
                    >
                        <div>
                            <p className="text-base font-semibold text-ink">
                                Mis cursos
                            </p>
                            <p className="mt-1 text-sm text-muted">
                                Retomá donde lo dejaste
                            </p>
                        </div>
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-soft text-primary">
                            <Icon name="layers" className="h-5 w-5" />
                        </span>
                    </Link>

                    <Link
                        href={route('student.certificates.index')}
                        className="card group flex items-center justify-between p-5 transition hover:border-lineStrong"
                    >
                        <div>
                            <p className="text-base font-semibold text-ink">
                                Certificados
                            </p>
                            <p className="mt-1 text-sm text-muted">
                                Descargá tus credenciales
                            </p>
                        </div>
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-soft text-primary">
                            <Icon name="badge" className="h-5 w-5" />
                        </span>
                    </Link>
                </div>

                <section>
                    <div className="mb-4 flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold tracking-tight text-ink">
                                Últimos cursos
                            </h2>
                            <p className="mt-0.5 text-sm text-muted">
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
                        <div className="grid gap-4 md:grid-cols-3">
                            {latestCourses.map((course) => (
                                <Link
                                    key={course.id}
                                    href={route('student.courses.show', course.slug)}
                                    className="card group flex flex-col p-5 transition hover:border-lineStrong"
                                >
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-soft text-primary">
                                        <Icon name="book" className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 text-base font-semibold leading-snug text-ink">
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
