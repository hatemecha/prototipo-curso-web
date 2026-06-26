import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

function formatPrice(price) {
    const value = Number(price);
    if (!value || value <= 0) {
        return 'Gratis';
    }
    return `$${value.toFixed(2)}`;
}

export default function Show({ course, isEnrolled }) {
    const flash = usePage().props.flash;
    const { post, processing } = useForm();

    const enroll = (e) => {
        e.preventDefault();
        post(route('student.courses.enroll', course.slug));
    };

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
                    {flash?.success && (
                        <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
                            {flash.success}
                        </div>
                    )}

                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        {course.description && (
                            <p className="text-gray-700">{course.description}</p>
                        )}
                        <p className="mt-3 text-sm font-medium text-gray-600">
                            Precio: {formatPrice(course.price)}
                        </p>

                        <div className="mt-4">
                            {isEnrolled ? (
                                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                    Ya estás inscripto
                                </span>
                            ) : (
                                <form onSubmit={enroll}>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        Inscribirme
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {!isEnrolled && (
                        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500">
                            Inscribite para acceder al contenido completo de las
                            clases.
                        </div>
                    )}

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
                                                {isEnrolled ? (
                                                    <Link
                                                        href={route(
                                                            'student.lessons.show',
                                                            lesson.id,
                                                        )}
                                                        className="flex items-center justify-between px-6 py-3 text-sm text-gray-700 transition hover:bg-gray-50"
                                                    >
                                                        <span>
                                                            {lesson.title}
                                                        </span>
                                                        <span className="text-indigo-600">
                                                            Abrir →
                                                        </span>
                                                    </Link>
                                                ) : (
                                                    <div className="flex items-center justify-between px-6 py-3 text-sm text-gray-400">
                                                        <span>
                                                            {lesson.title}
                                                        </span>
                                                        <span className="inline-flex items-center gap-1 text-gray-400">
                                                            <svg
                                                                className="h-4 w-4"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                                                                />
                                                            </svg>
                                                            Bloqueado
                                                        </span>
                                                    </div>
                                                )}
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
