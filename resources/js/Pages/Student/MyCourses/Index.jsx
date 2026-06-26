import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ courses }) {
    return (
        <StudentLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Mis cursos
                </h2>
            }
        >
            <Head title="Mis cursos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {courses.length === 0 ? (
                        <div className="rounded-lg bg-white p-8 text-center shadow-sm">
                            <p className="text-gray-600">
                                Todavía no estás inscripto en ningún curso.
                            </p>
                            <Link
                                href={route('student.courses.index')}
                                className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                            >
                                Explorar cursos
                            </Link>
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
                                    <Link
                                        href={route(
                                            'student.courses.show',
                                            course.slug,
                                        )}
                                        className="mt-4 inline-block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-indigo-700"
                                    >
                                        Continuar
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </StudentLayout>
    );
}
