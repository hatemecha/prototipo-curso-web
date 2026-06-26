import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const dashboardHref = auth.user
        ? auth.user.role === 'admin'
            ? '/admin'
            : route('student.dashboard')
        : null;

    return (
        <>
            <Head title="Mini LMS Médico" />

            <main className="min-h-screen bg-slate-50 text-slate-900">
                <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
                    <div className="flex items-center gap-3">
                        <ApplicationLogo className="h-9 w-9 fill-current text-indigo-700" />
                        <span className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                            Mini LMS Médico
                        </span>
                    </div>

                    <nav className="flex items-center gap-3 text-sm font-medium">
                        {auth.user ? (
                            <Link
                                href={dashboardHref}
                                className="rounded-md bg-indigo-700 px-4 py-2 text-white transition hover:bg-indigo-800"
                            >
                                Ir a mi panel
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-md px-3 py-2 text-slate-700 transition hover:bg-white"
                                >
                                    Ingresar
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-md bg-indigo-700 px-4 py-2 text-white transition hover:bg-indigo-800"
                                >
                                    Crear cuenta
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <section className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                            Prototipo técnico de cursos médicos
                        </p>
                        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
                            Mini LMS Médico
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                            Plataforma funcional para administrar cursos,
                            clases, materiales, exámenes y certificados PDF con
                            un flujo de alumno completo.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href={auth.user ? dashboardHref : route('login')}
                                className="rounded-md bg-indigo-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-800"
                            >
                                {auth.user ? 'Continuar' : 'Ingresar'}
                            </Link>
                            <Link
                                href={
                                    auth.user
                                        ? route('student.courses.index')
                                        : route('login')
                                }
                                className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
                            >
                                Ver cursos
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">
                            Flujo cubierto
                        </h2>
                        <dl className="mt-5 grid gap-4 text-sm">
                            {[
                                ['Admin', 'Cursos, módulos, clases y materiales'],
                                ['Alumno', 'Inscripción, clases y progreso'],
                                ['Evaluación', 'Examen corregido en backend'],
                                ['Certificado', 'PDF privado con descarga validada'],
                            ].map(([label, value]) => (
                                <div
                                    key={label}
                                    className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                                >
                                    <dt className="font-medium text-slate-700">
                                        {label}
                                    </dt>
                                    <dd className="max-w-56 text-right text-slate-500">
                                        {value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>
            </main>
        </>
    );
}
