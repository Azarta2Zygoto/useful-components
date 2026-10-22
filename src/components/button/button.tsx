"use client";

import type {
    ButtonHTMLAttributes,
    PointerEvent,
    PropsWithChildren,
    ReactNode,
} from "react";

import { applyRippleEffect } from "../utils/ripple";
import "./button.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "transparent";
    loading?: boolean;
    ripple?: boolean;
    pressed?: boolean;
    width?: number | string;
}

export default function Button({
    type = "button",
    variant = "secondary",
    loading = false,
    pressed = false,
    disabled = false,
    ripple,
    width,
    style,
    onPointerDown,
    children,
    ...props
}: Readonly<PropsWithChildren<Props>>): ReactNode {
    const isDisabled = disabled || loading;

    const shouldRipple = ripple ?? variant !== "transparent";

    const correctWidth = typeof width === "number" ? `${width}px` : width;

    const handlePointerDown = (
        event: PointerEvent<HTMLButtonElement>,
    ): void => {
        if (!isDisabled && shouldRipple) {
            applyRippleEffect(event);
        }

        onPointerDown?.(event);
    };

    return (
        <button
            {...props}
            type={type}
            data-variant={variant}
            data-loading={loading || undefined}
            disabled={isDisabled}
            aria-busy={loading || undefined}
            aria-pressed={pressed || undefined}
            onPointerDown={handlePointerDown}
            style={{
                ...style,
                ...(correctWidth !== undefined ? { width: correctWidth } : {}),
            }}
        >
            {shouldRipple && <span className="ripple" />}
            {children}
        </button>
    );
}
