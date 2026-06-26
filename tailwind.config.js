import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'media',

    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                accent: 'rgb(var(--color-accent) / <alpha-value>)',
                accentSoft: 'rgb(var(--color-accent-soft) / <alpha-value>)',
                cream: 'rgb(var(--color-cream) / <alpha-value>)',
                lavender: 'rgb(var(--color-lavender) / <alpha-value>)',
                hero: 'rgb(var(--color-hero) / <alpha-value>)',
                ink: 'rgb(var(--color-ink) / <alpha-value>)',
                line: 'rgb(var(--color-line) / <alpha-value>)',
                lineStrong: 'rgb(var(--color-line-strong) / <alpha-value>)',
                link: 'rgb(var(--color-link) / <alpha-value>)',
                linkHover: 'rgb(var(--color-link-hover) / <alpha-value>)',
                muted: 'rgb(var(--color-muted) / <alpha-value>)',
                onHero: 'rgb(var(--color-on-hero) / <alpha-value>)',
                onHeroMute: 'rgb(var(--color-on-hero-mute) / <alpha-value>)',
                page: 'rgb(var(--color-page) / <alpha-value>)',
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                primaryHover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
                primaryTint: 'rgb(var(--color-primary-tint) / <alpha-value>)',
                soft: 'rgb(var(--color-soft) / <alpha-value>)',
                success: 'rgb(var(--color-success) / <alpha-value>)',
                danger: 'rgb(var(--color-error) / <alpha-value>)',
                surface: 'rgb(var(--color-surface) / <alpha-value>)',
            },
            fontFamily: {
                display: ['Inter', ...defaultTheme.fontFamily.sans],
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
                pill: '90px',
            },
        },
    },

    plugins: [forms],
};
