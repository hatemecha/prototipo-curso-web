export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-full border border-transparent bg-primary px-7 py-2.5 text-base font-bold text-white transition duration-150 ease-in-out hover:bg-primaryHover focus:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-page active:bg-primaryHover ${
                    disabled && 'opacity-50'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
