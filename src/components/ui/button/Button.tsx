"use client";

import type { ReactNode } from "react";

import { useRipple } from "../ripple/useRipple.hook";
import "./button.css";
import type { ButtonProps } from "./button.type";

export default function Button({
    type = "button",
    variant = "secondary",
    size,
    loading,
    pressed,
    disabled = false,
    ripple,
    onPointerDown,
    children,
    ...props
}: ButtonProps): ReactNode {
    const isDisabled = disabled || loading;
    const hasRipple = !isDisabled && (ripple ?? variant !== "transparent");

    const { rippleProps, onPointerDown: handlePointerDown } =
        useRipple<HTMLButtonElement>({
            disabled: !hasRipple,
            onPointerDown,
        });

    return (
        <button
            {...props}
            type={type}
            data-uc-size={size}
            data-uc-variant={variant}
            disabled={disabled}
            aria-disabled={loading || undefined}
            aria-busy={loading || undefined}
            aria-pressed={pressed}
            onClick={
                loading
                    ? (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                      }
                    : props.onClick
            }
            onPointerDown={handlePointerDown}
        >
            {loading && (
                <span
                    data-uc-loading
                    aria-hidden="true"
                />
            )}
            {hasRipple && <span {...rippleProps} />}
            {children}
        </button>
    );
}
