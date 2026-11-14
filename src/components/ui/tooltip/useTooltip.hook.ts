"use client";

import {
    type FocusEvent,
    type HTMLAttributes,
    type MouseEvent,
    type PointerEvent,
    useEffect,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
} from "react";

import { tooltipStore } from "./tooltip.store";
import type { UseTooltipOptions } from "./tooltip.type";

export default function useTooltip({
    content,
    placement = "bottom",
    delay = 0,
    positionRef,
    hideGrace,
}: UseTooltipOptions) {
    const id = useId();
    const contentRef = useRef(content);
    const enabled =
        content !== null &&
        content !== undefined &&
        content !== false &&
        content !== "";

    useLayoutEffect(() => {
        contentRef.current = content;
        tooltipStore.update(id, content);
    }, [id, content]);

    useEffect(() => {
        if (!enabled) return;
        return () => tooltipStore.release(id);
    }, [id, enabled]);

    return useMemo(() => {
        if (!enabled) return {};
        const open = (
            event: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>,
            openDelay: number,
        ) => {
            tooltipStore.show(
                {
                    ownerId: id,
                    content: contentRef.current,
                    placement,
                    anchor: positionRef?.current ?? event.currentTarget,
                    hideGrace,
                },
                openDelay,
            );
        };

        return {
            onPointerEnter: (e: PointerEvent<HTMLElement>) => {
                if (e.pointerType !== "touch") open(e, delay);
            },
            onPointerLeave: (e: PointerEvent<HTMLElement>) => {
                if (!e.currentTarget.matches(":focus-visible"))
                    tooltipStore.hide(id);
            },
            onFocus: (e: FocusEvent<HTMLElement>) => {
                if (e.currentTarget.matches(":focus-visible")) open(e, 0);
            },
            onBlur: (e: FocusEvent<HTMLElement>) => {
                if (!e.currentTarget.matches(":hover"))
                    tooltipStore.hide(id, true);
            },
            "aria-describedby": id,
        };
    }, [enabled, id, placement, positionRef, delay, hideGrace]);
}

type Tip = ReturnType<typeof useTooltip>;

export function mergeTooltipProps<P extends HTMLAttributes<HTMLElement>>(
    own: P | undefined,
    tip: Tip,
) {
    const chain =
        <E>(a?: (e: E) => void, b?: (e: E) => void) =>
        (e: E) => {
            a?.(e);
            b?.(e);
        };
    return {
        ...own,
        ...tip,
        onPointerEnter: chain(own?.onPointerEnter, tip.onPointerEnter),
        onPointerLeave: chain(own?.onPointerLeave, tip.onPointerLeave),
        onFocus: chain(own?.onFocus, tip.onFocus),
        onBlur: chain(own?.onBlur, tip.onBlur),
        "aria-describedby":
            [own?.["aria-describedby"], tip["aria-describedby"]]
                .filter(Boolean)
                .join(" ") || undefined,
    };
}
