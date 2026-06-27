import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

function setDocumentTheme(theme) {
    document.documentElement.classList.toggle('theme-dark', theme === 'dark');
    document.documentElement.classList.toggle('theme-light', theme === 'light');
}

function initialTheme() {
    if (typeof window === 'undefined') {
        return 'light';
    }

    if (document.documentElement.classList.contains('theme-dark')) {
        return 'dark';
    }

    if (document.documentElement.classList.contains('theme-light')) {
        return 'light';
    }

    let saved = null;

    try {
        saved = window.localStorage.getItem('theme');
    } catch {
        saved = null;
    }

    if (saved === 'dark' || saved === 'light') {
        return saved;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

export default function ThemeToggle({ className = '' }) {
    const [theme, setTheme] = useState(initialTheme);
    const [hasOverride, setHasOverride] = useState(() => {
        if (typeof window === 'undefined') {
            return false;
        }

        try {
            return ['dark', 'light'].includes(window.localStorage.getItem('theme'));
        } catch {
            return false;
        }
    });
    const isDark = theme === 'dark';

    useEffect(() => {
        setDocumentTheme(theme);

        if (!hasOverride) {
            return;
        }

        try {
            window.localStorage.setItem('theme', theme);
        } catch {
            //
        }
    }, [hasOverride, theme]);

    const nextLabel = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';

    return (
        <button
            type="button"
            onClick={() => {
                setHasOverride(true);
                setTheme(isDark ? 'light' : 'dark');
            }}
            className={`inline-flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 text-sm font-medium text-ink transition hover:bg-soft focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
            aria-label={nextLabel}
            title={nextLabel}
        >
            <FontAwesomeIcon
                icon={isDark ? faMoon : faSun}
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
            />
            <span>{isDark ? 'Oscuro' : 'Claro'}</span>
        </button>
    );
}
