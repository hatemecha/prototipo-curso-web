import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ lesson, progress }) {
    const { post, delete: destroy, processing } = useForm();

    const markComplete = (e) => {
        e.preventDefault();
        post(route('student.lessons.complete', lesson.id), {
            preserveScroll: true,
        });
    };

    const markPending = (e) => {
        e.preventDefault();
        destroy(route('student.lessons.uncomplete', lesson.id), {
            preserveScroll: true,
        });
    };

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
                    <div className="rounded-lg bg-white p-4 shadow-sm">
                        <div className="mb-1 flex justify-between text-sm text-gray-600">
                            <span>Progreso del curso</span>
                            <span>
                                {progress.completed}/{progress.total} clases (
                                {progress.percent}%)
                            </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                            <div
                                className="h-full rounded-full bg-indigo-600 transition-all"
                                style={{ width: `${progress.percent}%` }}
                            />
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
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
                            {lesson.is_completed ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                    ✓ Completada
                                </span>
                            ) : (
                                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                    Pendiente
                                </span>
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

                        {lesson.materials.length > 0 && (
                            <div className="mt-6 border-t border-gray-100 pt-6">
                                <h3 className="mb-3 text-sm font-semibold text-gray-800">
                                    Materiales de la clase
                                </h3>
                                <ul className="space-y-2">
                                    {lesson.materials.map((material) => (
                                        <li
                                            key={material.id}
                                            className="flex items-center justify-between rounded-md border border-gray-200 px-4 py-2"
                                        >
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <span className="font-medium">
                                                    {material.title}
                                                </span>
                                                {material.file_type && (
                                                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs uppercase text-gray-500">
                                                        {material.file_type}
                                                    </span>
                                                )}
                                            </div>
                                            {material.is_downloadable ? (
                                                <a
                                                    href={route(
                                                        'student.materials.download',
                                                        material.id,
                                                    )}
                                                    className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-700"
                                                >
                                                    Descargar
                                                </a>
                                            ) : (
                                                <span className="text-xs italic text-gray-400">
                                                    Material no descargable
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-6 border-t border-gray-100 pt-6">
                            {lesson.is_completed ? (
                                <form onSubmit={markPending}>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Marcar como pendiente
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={markComplete}>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
                                    >
                                        Marcar como completada
                                    </button>
                                </form>
                            )}
                        </div>
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
