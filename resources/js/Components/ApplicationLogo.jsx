export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <rect width="64" height="64" rx="18" fill="currentColor" />
            <path
                d="M21 35.5h6.5l4-13 6 22 4.5-9h8"
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
            />
            <path
                d="M32 14v10M27 19h10"
                stroke="rgb(var(--color-accent))"
                strokeLinecap="round"
                strokeWidth="4"
            />
        </svg>
    );
}
