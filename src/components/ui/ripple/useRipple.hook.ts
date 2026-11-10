"use client";

import { useCallback, useRef } from "react";
import type { PointerEvent } from "react";

import "./ripple.css";
import type {
    RippleOptions,
    RippleProps,
    UseRippleReturn,
} from "./ripple.type";
import { prefersReducedMotion } from "./ripple.utils";

export function useRipple<T extends HTMLElement = HTMLElement>({
    disabled = false,
    duration = 400,
    onPointerDown,
}: RippleOptions<T>): UseRippleReturn<T> {
    const rippleRef = useRef<HTMLSpanElement>(null);
    const rippleProps: RippleProps = {
        ref: rippleRef,
        "data-uc-ripple": "",
        "aria-hidden": "true",
    };

    const handlePointerDown = useCallback(
        (event: PointerEvent<T>): void => {
            const container = rippleRef.current;

            if (
                container &&
                !disabled &&
                event.button === 0 &&
                !prefersReducedMotion()
            ) {
                const rect = container.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const radius = Math.hypot(
                    Math.max(x, rect.width - x),
                    Math.max(y, rect.height - y),
                );

                const wave = document.createElement("span");
                wave.style.left = `${x}px`;
                wave.style.top = `${y}px`;
                wave.style.width = `${radius * 2}px`;
                wave.style.height = `${radius * 2}px`;

                container.appendChild(wave);

                const animation = wave.animate(
                    [
                        {
                            transform: "translate(-50%, -50%) scale(0)",
                            opacity: 0.5,
                        },
                        {
                            transform: "translate(-50%, -50%) scale(1.5)",
                            opacity: 0,
                        },
                    ],
                    { duration, easing: "ease-out", fill: "forwards" },
                );

                const cleanup = (): void => wave.remove();
                animation.addEventListener("finish", cleanup, { once: true });
                animation.addEventListener("cancel", cleanup, { once: true });
            }

            onPointerDown?.(event);
        },
        [disabled, duration, onPointerDown],
    );

    return { rippleProps, onPointerDown: handlePointerDown };
}
