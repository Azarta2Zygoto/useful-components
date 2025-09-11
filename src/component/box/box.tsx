import { JSX, useMemo, useCallback } from "react";
import "./box.css";

interface BoxProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    disabled?: boolean;
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

    const classNameCombined = useMemo(
        () => `box${className ? " " + className : ""}${isClickable ? " clickable" : ""}`,
        [className, isClickable]
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (!isClickable||disabled) return;
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
            }
        },
        [isClickable, onClick, disabled]
    );
    return (
        <div
            className={classNameCombined}
            style={style}
            onClick={disabled ? undefined : onClick}
            onKeyDown={handleKeyDown}
            role={isClickable ? "button" : undefined}
            tabIndex={isClickable ? 0 : undefined}
            {...rest}
        >
            {children}
        </div>
    );
}