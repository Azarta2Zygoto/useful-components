import { Placement } from "./tooltip.store";

export function tooltipPlacement(
    element: DOMRect,
    placement: Placement,
    w: number,
    h: number,
    gap: number,
): { top: number; left: number } {
    switch (placement) {
        case "top":
            return {
                top: element.top - h - gap,
                left: element.left + element.width / 2 - w / 2,
            };
        case "bottom":
            return {
                top: element.bottom + gap,
                left: element.left + element.width / 2 - w / 2,
            };
        case "left":
            return {
                top: element.top + element.height / 2 - h / 2,
                left: element.left - w - gap,
            };
        case "right":
            return {
                top: element.top + element.height / 2 - h / 2,
                left: element.right + gap,
            };
        case "left-top":
        case "top-left":
            return {
                top: element.top - h - gap,
                left: element.left - w - gap,
            };
        case "right-top":
        case "top-right":
            return {
                top: element.top - h - gap,
                left: element.right + gap,
            };
        case "left-bottom":
        case "bottom-left":
            return {
                top: element.bottom + gap,
                left: element.left - w - gap,
            };
        case "right-bottom":
        case "bottom-right":
            return {
                top: element.bottom + gap,
                left: element.right + gap,
            };
    }
}
