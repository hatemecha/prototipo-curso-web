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
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Cursos disponibles
                </h2>
            }
        >
            <Head title="Cursos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {courses.length === 0 ? (
                        <div className="rounded-lg bg-white p-6 text-center text-gray-500 shadow-sm">
                            No hay cursos publicados por el momento.
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {courses.map((course) => (
                                <div
                                    key={course.id}
                                    className="flex flex-col rounded-lg bg-white p-6 shadow-sm"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {course.title}
                                    </h3>
                                    {course.description && (
                                        <p className="mt-2 line-clamp-3 flex-1 text-sm text-gray-600">
                                            {course.description}
                                        </p>
                                    )}
                                    <div className="mt-3">
                                        {course.is_enrolled ? (
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                Inscripto
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                                                Disponible
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700">
                                            {formatPrice(course.price)}
                                        </span>
                                        <Link
                                            href={route(
                                                'student.courses.show',
                                                course.slug,
                                            )}
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                                        >
                                            {course.is_enrolled
                                                ? 'Continuar'
                                                : 'Ver curso'}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </StudentLayout>
    );
}
