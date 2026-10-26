"use client";

import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";

import { useRipple } from "../ripple/useRipple.hook";
import "./button.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "transparent";
    loading?: boolean;
    ripple?: boolean;
    pressed?: boolean;
    tooltip?: string;
    width?: number | string;
}

export default function Button({
    type = "button",
    variant = "secondary",
    loading = false,
    pressed = false,
    disabled = false,
    tooltip,
    ripple,
    width,
    style,
    onPointerDown,
    children,
    ...props
}: Readonly<PropsWithChildren<ButtonProps>>): ReactNode {
    const isDisabled = disabled || loading;
    const shouldRipple = ripple ?? variant !== "transparent";
    const correctWidth = typeof width === "number" ? `${width}px` : width;

    const { rippleRef, onPointerDown: handlePointerDown } =
        useRipple<HTMLButtonElement>({
            disabled: isDisabled || !shouldRipple,
            onPointerDown,
        });

    return (
        <button
            {...props}
            type={type}
            data-variant={variant}
            data-loading={loading || undefined}
            data-tooltip={tooltip}
            disabled={isDisabled}
            aria-busy={loading || undefined}
            aria-pressed={pressed || undefined}
            onPointerDown={handlePointerDown}
            style={{
                ...style,
                ...(correctWidth !== undefined ? { width: correctWidth } : {}),
            }}
        >
            {shouldRipple && (
                <span
                    ref={rippleRef}
                    className="ripple"
                />
            )}
            {children}
        </button>
    );
}
