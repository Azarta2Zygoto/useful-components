"use client";

import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";

import { useRipple } from "../ripple/useRipple.hook";
import "./button.css";

export type ButtonVariant =
    "primary" | "secondary" | "danger" | "transparent" | "success";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    loading?: boolean;
    ripple?: boolean;
    pressed?: boolean;
    tooltip?: boolean;
}

export default function Button({
    type = "button",
    variant = "secondary",
    loading = false,
    pressed = false,
    disabled = false,
    tooltip,
    ripple,
    onPointerDown,
    children,
    ...props
}: Readonly<PropsWithChildren<ButtonProps>>): ReactNode {
    const isDisabled = disabled || loading;
    const shouldRipple = ripple ?? variant !== "transparent";

    const { rippleRef, onPointerDown: handlePointerDown } =
        useRipple<HTMLButtonElement>({
            disabled: isDisabled || !shouldRipple,
            onPointerDown,
        });

    return (
        <button
            {...props}
            type={type}
            data-uc-variant={variant}
            data-uc-loading={loading || undefined}
            data-uc-tooltip={tooltip}
            disabled={isDisabled}
            aria-busy={loading || undefined}
            aria-pressed={pressed || undefined}
            onPointerDown={handlePointerDown}
        >
            {shouldRipple && (
                <span
                    ref={rippleRef}
                    data-uc-ripple
                />
            )}
            {children}
        </button>
    );
}
