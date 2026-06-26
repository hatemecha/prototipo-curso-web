import { useEffect, useState } from 'react';

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

    return (
        <button
            type="button"
            onClick={() => {
                setHasOverride(true);
                setTheme(isDark ? 'light' : 'dark');
            }}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface text-ink transition hover:bg-soft focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
            aria-label={isDark ? 'Usar modo claro' : 'Usar modo oscuro'}
            title={isDark ? 'Modo claro' : 'Modo oscuro'}
        >
            {isDark ? (
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3.25a.75.75 0 0 1 .75.75v1.25a.75.75 0 0 1-1.5 0V4a.75.75 0 0 1 .75-.75ZM10 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM16.75 10a.75.75 0 0 1-.75.75h-1.25a.75.75 0 0 1 0-1.5H16a.75.75 0 0 1 .75.75ZM5.25 10a.75.75 0 0 1-.75.75H3.25a.75.75 0 0 1 0-1.5H4.5a.75.75 0 0 1 .75.75ZM14.77 5.23a.75.75 0 0 1 0 1.06l-.88.88a.75.75 0 1 1-1.06-1.06l.88-.88a.75.75 0 0 1 1.06 0ZM7.17 12.83a.75.75 0 0 1 0 1.06l-.88.88a.75.75 0 1 1-1.06-1.06l.88-.88a.75.75 0 0 1 1.06 0ZM14.77 14.77a.75.75 0 0 1-1.06 0l-.88-.88a.75.75 0 1 1 1.06-1.06l.88.88a.75.75 0 0 1 0 1.06ZM7.17 7.17a.75.75 0 0 1-1.06 0l-.88-.88a.75.75 0 0 1 1.06-1.06l.88.88a.75.75 0 0 1 0 1.06Z" />
                </svg>
            ) : (
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.5 2.7a.75.75 0 0 1 .64.98 6.3 6.3 0 0 0 2.18 6.93.75.75 0 0 1-.28 1.33A7.5 7.5 0 1 1 8.06 3.96a.75.75 0 0 1 1.33-.28 6.3 6.3 0 0 0 4.11-.98Z" />
                </svg>
            )}
        </button>
    );
}
