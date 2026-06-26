import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ lesson }) {
    return (
        <StudentLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {lesson.title}
                    </h2>
                    <Link
                        href={route('student.courses.show', lesson.course.slug)}
                        className="text-sm text-indigo-600 hover:underline"
                    >
                        ← Volver al curso
                    </Link>
                </div>
            }
        >
            <Head title={lesson.title} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-700">
                                {lesson.course.title}
                            </span>
                            {lesson.module && (
                                <>
                                    {' · '}
                                    <span>{lesson.module.title}</span>
                                </>
                            )}
                        </div>

                        {lesson.description && (
                            <p className="mt-4 text-gray-700">
                                {lesson.description}
                            </p>
                        )}

                        {lesson.content && (
                            <div className="mt-4 whitespace-pre-line text-gray-800">
                                {lesson.content}
                            </div>
                        )}

                        {lesson.video_url && (
                            <div className="mt-6">
                                <a
                                    href={lesson.video_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                                >
                                    Ver video de la clase
                                </a>
                            </div>
                        )}
                    </div>

                    <Link
                        href={route('student.courses.show', lesson.course.slug)}
                        className="inline-block text-sm text-indigo-600 hover:underline"
                    >
                        ← Volver al curso
                    </Link>
                </div>
            </div>
        </StudentLayout>
    );
}
