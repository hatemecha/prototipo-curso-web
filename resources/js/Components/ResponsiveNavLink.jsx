import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-accent bg-soft text-primary focus:border-primary focus:bg-soft focus:text-ink'
                    : 'border-transparent text-muted hover:border-line hover:bg-page hover:text-ink focus:border-line focus:bg-page focus:text-ink'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
