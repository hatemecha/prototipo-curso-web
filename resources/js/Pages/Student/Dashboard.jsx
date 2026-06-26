import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, latestCourses }) {
    return (
        <StudentLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Mi panel
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm">
                        <p className="text-gray-700">
                            Hola, bienvenido a tu área de alumno.
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                            Cursos publicados disponibles:{' '}
                            <span className="font-semibold text-gray-800">
                                {stats.publishedCourses}
                            </span>
                        </p>
                        <Link
                            href={route('student.courses.index')}
                            className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                        >
                            Ver todos los cursos
                        </Link>
                    </div>

                    {latestCourses.length > 0 && (
                        <div>
                            <h3 className="mb-3 text-lg font-medium text-gray-800">
                                Últimos cursos
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {latestCourses.map((course) => (
                                    <Link
                                        key={course.id}
                                        href={route('student.courses.show', course.slug)}
                                        className="block rounded-lg bg-white p-5 shadow-sm transition hover:shadow-md"
                                    >
                                        <h4 className="font-semibold text-gray-900">
                                            {course.title}
                                        </h4>
                                        {course.description && (
                                            <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                                                {course.description}
                                            </p>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </StudentLayout>
    );
}
