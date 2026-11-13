import type { ReactNode, RefObject } from "react";

export type Placement =
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "left-top"
    | "left-bottom"
    | "right-top"
    | "right-bottom";

type TooltipElement = HTMLElement | SVGSVGElement;
export interface TooltipState {
    visible: boolean;
    ownerId: string | null;
    content: ReactNode;
    placement: Placement;
    anchor: TooltipElement | null;
}

export interface UseTooltipOptions {
    content: ReactNode;
    placement?: Placement;
    delay?: number;
    positionRef?: RefObject<TooltipElement | null>;
}
