import type { PointerEvent } from "react";

export function applyRippleEffect(event: PointerEvent<HTMLElement>): void {
    const { currentTarget, clientX, clientY } = event;
    const bounds = currentTarget.getBoundingClientRect();

    currentTarget.style.setProperty("--x", `${clientX - bounds.left}px`);
    currentTarget.style.setProperty("--y", `${clientY - bounds.top}px`);
}
