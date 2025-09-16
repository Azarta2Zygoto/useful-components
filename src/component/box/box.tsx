import React, { JSX } from "react";
import "./box.css";

/**
 * @param param - The properties for the Box component.
 * @param param.className - Optional additional class name for custom styling.
 * @param param.disabled - Optional disabled state (default is false).
 * @param param.style - Optional inline styles for the box.
 * @param param.children - The content to display inside the box.
 * @param param.onClick - Optional click handler function.
 * @returns A JSX element representing the Box component.
 */
interface BoxProps {
    className?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
    children: React.ReactNode;
    onClick?: () => void;
}

export default function Box({
    children,
    style,
    className,
    disabled,
    onClick,
    ...rest
}: BoxProps): JSX.Element {
    const isClickable = typeof onClick === "function";

    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (!isClickable || disabled) return;

        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
        }
    }

    return (
        <div
            className={`box${isClickable ? " clickable" : ""}${disabled ? " disabled":""} ${className || ""}`}
            role={isClickable ? "button" : undefined}
            onClick={disabled ? undefined : onClick}
            onKeyDown={handleKeyDown}
            tabIndex={isClickable ? 0 : undefined}
            style={style}
            {...rest}
        >
            {children}
        </div>
    );
}