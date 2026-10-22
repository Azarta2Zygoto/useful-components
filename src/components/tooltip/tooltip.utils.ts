import { TooltipState } from "./tooltip-context";

interface TooltipPosition {
    x: number;
    y: number;
    transform: string;
}

export function getTooltipPosition({
    anchor,
    placement = "b",
    offset = 8,
}: Readonly<TooltipState>): TooltipPosition {
    const rect = anchor.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    switch (placement) {
        case "t":
            return {
                x: centerX,
                y: rect.top - offset,
                transform: "translate(-50%, -100%)",
            };

        case "b":
            return {
                x: centerX,
                y: rect.bottom + offset,
                transform: "translate(-50%, 0)",
            };

        case "l":
            return {
                x: rect.left - offset,
                y: centerY,
                transform: "translate(-100%, -50%)",
            };

        case "r":
            return {
                x: rect.right + offset,
                y: centerY,
                transform: "translate(0, -50%)",
            };

        case "tl":
            return {
                x: rect.left,
                y: rect.top - offset,
                transform: "translate(50%, -100%)",
            };

        case "tr":
            return {
                x: rect.right,
                y: rect.top - offset,
                transform: "translate(-100%, -100%)",
            };

        case "bl":
            return {
                x: rect.left,
                y: rect.bottom + offset,
                transform: "translate(50%, 0)",
            };

        case "br":
            return {
                x: rect.right,
                y: rect.bottom + offset,
                transform: "translate(-100%, 0)",
            };
    }
}
