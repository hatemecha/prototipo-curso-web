export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-line text-primary shadow-sm focus:ring-primary ' +
                className
            }
        />
    );
}
