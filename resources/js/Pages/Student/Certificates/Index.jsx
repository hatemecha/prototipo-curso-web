import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link } from '@inertiajs/react';

function Icon({ name, className = 'h-5 w-5' }) {
    const paths = {
        badge: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
        download: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3',
        arrow: 'M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3',
    };
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={paths[name]} />
        </svg>
    );
}

export default function Index({ certificates }) {
    return (
        <StudentLayout
            header={
                <div>
                    <p className="eyebrow">Credenciales</p>
                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
                        Mis certificados
                    </h1>
                    <p className="mt-1 text-muted">
                        Descargá los certificados de los cursos que aprobaste.
                    </p>
                </div>
            }
        >
            <Head title="Certificados" />

            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                {certificates.length === 0 ? (
                    <div className="card border-dashed p-12 text-center">
                        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-soft text-primary">
                            <Icon name="badge" className="h-7 w-7" />
                        </span>
                        <p className="mt-5 text-muted">
                            Todavía no tenés certificados.
                        </p>
                        <p className="mt-1 text-sm text-muted">
                            Aprobá el examen de un curso para obtener tu certificado.
                        </p>
                        <Link
                            href={route('student.courses.index')}
                            className="btn-ghost mt-6"
                        >
                            Ver cursos
                            <Icon name="arrow" className="h-4 w-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2">
                        {certificates.map((cert) => (
                            <div key={cert.id} className="card flex flex-col p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-soft text-primary">
                                        <Icon name="badge" className="h-6 w-6" />
                                    </span>
                                    {cert.score !== null && (
                                        <span className="rounded-full bg-soft px-3 py-1 text-xs font-bold text-primary">
                                            {cert.score}%
                                        </span>
                                    )}
                                </div>
                                <h2 className="mt-4 text-lg font-bold leading-snug text-ink">
                                    {cert.course}
                                </h2>
                                <dl className="mt-4 flex-1 space-y-2 text-sm">
                                    <div className="flex justify-between gap-4">
                                        <dt className="text-muted">N° de certificado</dt>
                                        <dd className="font-mono font-semibold text-ink">
                                            {cert.number}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <dt className="text-muted">Emitido</dt>
                                        <dd className="font-medium text-ink">
                                            {cert.issued_at ?? '—'}
                                        </dd>
                                    </div>
                                </dl>
                                <a
                                    href={route('student.certificates.download', cert.id)}
                                    className="btn-primary mt-5 w-full"
                                >
                                    <Icon name="download" className="h-4 w-4" />
                                    Descargar PDF
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
