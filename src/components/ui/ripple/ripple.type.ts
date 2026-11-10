import type { PointerEvent, RefObject } from "react";

export interface RippleProps {
    ref: RefObject<HTMLSpanElement | null>;
    "data-uc-ripple": "";
    "aria-hidden": "true";
}

export interface RippleOptions<T extends HTMLElement> {
    disabled?: boolean;
    duration?: number;
    onPointerDown?: (event: PointerEvent<T>) => void;
}

export interface UseRippleReturn<T extends HTMLElement> {
    rippleProps: RippleProps;
    onPointerDown: (event: PointerEvent<T>) => void;
}
