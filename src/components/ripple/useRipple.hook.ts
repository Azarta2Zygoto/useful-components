"use client";

import { useCallback, useRef } from "react";
import type { PointerEvent, RefObject } from "react";

import "./ripple.css";

interface Options<T extends HTMLElement> {
    disabled?: boolean;
    duration?: number;
    onPointerDown?: (event: PointerEvent<T>) => void;
}

interface UseRippleReturn<T extends HTMLElement> {
    rippleRef: RefObject<HTMLSpanElement | null>;
    onPointerDown: (event: PointerEvent<T>) => void;
}

export function useRipple<T extends HTMLElement = HTMLElement>({
    disabled = false,
    duration = 400,
    onPointerDown,
}: Options<T> = {}): UseRippleReturn<T> {
    const rippleRef = useRef<HTMLSpanElement>(null);

    const handlePointerDown = useCallback(
        (event: PointerEvent<T>): void => {
            const container = rippleRef.current;

            if (container && !disabled && event.button === 0) {
                const rect = container.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const radius = Math.hypot(
                    Math.max(x, rect.width - x),
                    Math.max(y, rect.height - y),
                );

                const wave = document.createElement("span");
                wave.className = "ripple-wave";
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
                            transform: "translate(-50%, -50%) scale(1)",
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

    return { rippleRef, onPointerDown: handlePointerDown };
}
