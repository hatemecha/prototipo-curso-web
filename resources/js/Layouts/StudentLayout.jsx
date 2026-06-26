import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ThemeToggle from '@/Components/ThemeToggle';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navItems = [
    { routeName: 'student.dashboard', match: 'student.dashboard', label: 'Dashboard' },
    { routeName: 'student.courses.index', match: 'student.courses.*', label: 'Cursos' },
    { routeName: 'student.my-courses.index', match: 'student.my-courses.*', label: 'Mis cursos' },
    { routeName: 'student.certificates.index', match: 'student.certificates.*', label: 'Certificados' },
];

function PillLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                active
                    ? 'bg-soft text-primary'
                    : 'text-ink/70 hover:bg-soft hover:text-ink'
            }`}
        >
            {children}
        </Link>
    );
}

export default function StudentLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const initials = user.name
        .split(' ')
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();

    return (
        <div className="min-h-screen bg-page text-ink">
            <nav className="sticky top-0 z-40 border-b border-line bg-page/80 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-8">
                            <Link
                                href={route('student.dashboard')}
                                className="flex items-center gap-2.5"
                            >
                                <ApplicationLogo className="h-9 w-9 text-primary" />
                                <span className="hidden text-base font-extrabold tracking-tight text-primary sm:block">
                                    Aula Clínica
                                </span>
                            </Link>

                            <div className="hidden items-center gap-1 sm:flex">
                                {navItems.map((item) => (
                                    <PillLink
                                        key={item.routeName}
                                        href={route(item.routeName)}
                                        active={route().current(item.match)}
                                    >
                                        {item.label}
                                    </PillLink>
                                ))}
                            </div>
                        </div>

                        <div className="hidden items-center gap-3 sm:flex">
                            <ThemeToggle />
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-3 text-sm font-bold text-ink transition hover:border-lineStrong hover:bg-soft focus:outline-none"
                                    >
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-soft text-xs font-bold text-primary">
                                            {initials}
                                        </span>
                                        {user.name}
                                        <svg
                                            className="h-4 w-4 text-muted"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Perfil
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Cerrar sesión
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        <div className="-me-2 flex items-center gap-2 sm:hidden">
                            <ThemeToggle />
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-lg p-2 text-ink transition hover:bg-soft focus:bg-soft focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' border-t border-line sm:hidden'
                    }
                >
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navItems.map((item) => (
                            <ResponsiveNavLink
                                key={item.routeName}
                                href={route(item.routeName)}
                                active={route().current(item.match)}
                            >
                                {item.label}
                            </ResponsiveNavLink>
                        ))}
                    </div>

                    <div className="border-t border-line pb-3 pt-4">
                        <div className="flex items-center gap-3 px-4">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-soft text-sm font-bold text-primary">
                                {initials}
                            </span>
                            <div>
                                <div className="text-base font-semibold text-ink">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-muted">
                                    {user.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1 px-2">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Perfil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Cerrar sesión
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="border-b border-line bg-surface/40">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
