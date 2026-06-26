import StudentLayout from '@/Layouts/StudentLayout';
import { Head } from '@inertiajs/react';

export default function Index({ certificates }) {
    return (
        <StudentLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Mis certificados
                </h2>
            }
        >
            <Head title="Certificados" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    {certificates.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                            Todavía no tenés certificados. Aprobá el examen de un
                            curso para obtener tu certificado.
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    <tr>
                                        <th className="px-6 py-3">Curso</th>
                                        <th className="px-6 py-3">Número</th>
                                        <th className="px-6 py-3">Score</th>
                                        <th className="px-6 py-3">Emitido</th>
                                        <th className="px-6 py-3 text-right">
                                            Acción
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {certificates.map((cert) => (
                                        <tr key={cert.id}>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {cert.course}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {cert.number}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {cert.score !== null
                                                    ? `${cert.score}%`
                                                    : '—'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {cert.issued_at ?? '—'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <a
                                                    href={route(
                                                        'student.certificates.download',
                                                        cert.id,
                                                    )}
                                                    className="rounded-md bg-indigo-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-indigo-700"
                                                >
                                                    Descargar
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </StudentLayout>
    );
}
