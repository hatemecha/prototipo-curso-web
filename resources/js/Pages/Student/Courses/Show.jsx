import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link } from '@inertiajs/react';

function formatPrice(price) {
    const value = Number(price);
    if (!value || value <= 0) {
        return 'Gratis';
    }
    return `$${value.toFixed(2)}`;
}

export default function Show({ course }) {
    return (
        <StudentLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {course.title}
                    </h2>
                    <Link
                        href={route('student.courses.index')}
                        className="text-sm text-indigo-600 hover:underline"
                    >
                        ← Volver a cursos
                    </Link>
                </div>
            }
        >
            <Head title={course.title} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        {course.description && (
                            <p className="text-gray-700">{course.description}</p>
                        )}
                        <p className="mt-3 text-sm font-medium text-gray-600">
                            Precio: {formatPrice(course.price)}
                        </p>
                    </div>

                    {course.modules.length === 0 ? (
                        <div className="rounded-lg bg-white p-6 text-center text-gray-500 shadow-sm">
                            Este curso todavía no tiene contenido.
                        </div>
                    ) : (
                        course.modules.map((module, index) => (
                            <div
                                key={module.id}
                                className="overflow-hidden rounded-lg bg-white shadow-sm"
                            >
                                <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                                    <h3 className="font-semibold text-gray-900">
                                        Módulo {index + 1}: {module.title}
                                    </h3>
                                    {module.description && (
                                        <p className="mt-1 text-sm text-gray-500">
                                            {module.description}
                                        </p>
                                    )}
                                </div>
                                {module.lessons.length === 0 ? (
                                    <p className="px-6 py-4 text-sm text-gray-400">
                                        Sin clases en este módulo.
                                    </p>
                                ) : (
                                    <ul className="divide-y divide-gray-100">
                                        {module.lessons.map((lesson) => (
                                            <li key={lesson.id}>
                                                <Link
                                                    href={route(
                                                        'student.lessons.show',
                                                        lesson.id,
                                                    )}
                                                    className="flex items-center justify-between px-6 py-3 text-sm text-gray-700 transition hover:bg-gray-50"
                                                >
                                                    <span>{lesson.title}</span>
                                                    <span className="text-indigo-600">
                                                        Abrir →
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </StudentLayout>
    );
}
