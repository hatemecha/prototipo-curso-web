import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeToggle from '@/Components/ThemeToggle';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-mesh px-4 py-10 text-ink">
            <ThemeToggle className="absolute right-4 top-4 z-10" />

            <div className="relative w-full max-w-md">
                <Link href="/" className="flex flex-col items-center gap-3 text-center">
                    <ApplicationLogo className="h-12 w-12 text-primary" />
                    <span className="text-xl font-extrabold tracking-tight text-primary">
                        Aula Clínica
                    </span>
                </Link>

                <div className="card mt-8 p-7 shadow-lift sm:p-8">{children}</div>

                <p className="mt-6 text-center text-xs text-muted">
                    Cursos médicos online con evaluaciones y certificados
                </p>
            </div>
        </div>
    );
}
