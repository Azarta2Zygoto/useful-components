"use client";

import {
    type FocusEvent,
    type MouseEvent,
    type ReactNode,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
} from "react";

import { type Placement, tooltipStore } from "./tooltip.store";

interface UseTooltipOptions {
    content: ReactNode;
    placement?: Placement;
    delay?: number;
}

export function useTooltip({
    content,
    placement = "bottom",
    delay = 0,
}: UseTooltipOptions) {
    const id = useId();
    const contentRef = useRef(content);

    useLayoutEffect(() => {
        contentRef.current = content;
    });

    return useMemo(() => {
        const open = (
            event: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>,
            openDelay: number,
        ) => {
            tooltipStore.show(
                {
                    ownerId: id,
                    content: contentRef.current,
                    placement,
                    anchor: event.currentTarget,
                },
                openDelay,
            );
        };

        const hide = () => tooltipStore.hide(id);

        return {
            onMouseEnter: (e: MouseEvent<HTMLElement>) => open(e, delay),
            onMouseLeave: hide,
            onFocus: (e: FocusEvent<HTMLElement>) => open(e, 0),
            onBlur: hide,
            "aria-describedby": id,
        };
    }, [id, placement, delay]);
}
