import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-accent text-ink focus:border-primary'
                    : 'border-transparent text-muted hover:border-line hover:text-ink focus:border-line focus:text-ink') +
                className
            }
        >
            {children}
        </Link>
    );
}
