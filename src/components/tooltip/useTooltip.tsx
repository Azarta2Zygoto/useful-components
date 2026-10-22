"use client";

import { type ReactNode, useCallback, useRef } from "react";

import { TooltipPlacement, useTooltipContext } from "./tooltip-context";

interface Props {
    content: ReactNode;
    placement?: TooltipPlacement;
    offset?: number;
    time?: number;
}

export function useTooltip({
    content,
    placement = "b",
    offset = 8,
    time,
}: Readonly<Props>) {
    const { show, hide } = useTooltipContext();
    const anchorRef = useRef<HTMLElement | null>(null);

    const ref = useCallback((element: HTMLElement | null) => {
        anchorRef.current = element;
    }, []);

    const open = useCallback(
        (onFocus?: boolean) => {
            if (anchorRef.current) {
                show({
                    anchor: anchorRef.current,
                    content,
                    placement,
                    offset,
                    time: onFocus ? 0 : time,
                });
            }
        },
        [content, offset, placement, time, show],
    );

    const close = useCallback(() => {
        if (anchorRef.current) {
            hide(anchorRef.current);
        }
    }, [hide]);

    const openOnFocus = useCallback(() => open(true), [open]);
    const openOnPointerEnter = useCallback(() => open(false), [open]);

    return {
        ref,
        onPointerEnter: openOnPointerEnter,
        onPointerLeave: close,
        onFocus: openOnFocus,
        onBlur: close,
    };
}
