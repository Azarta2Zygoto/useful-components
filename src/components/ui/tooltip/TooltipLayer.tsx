"use client";

import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useSyncExternalStore,
} from "react";

import "./tooltip.css";
import { tooltipStore } from "./tooltip.store";
import { tooltipPlacement } from "./tooltip.utils";

const GAP = 8;
const MARGIN = 4;

export default function TooltipLayer() {
    const { visible, ownerId, content, placement, anchor } =
        useSyncExternalStore(
            tooltipStore.subscribe,
            tooltipStore.getSnapshot,
            tooltipStore.getServerSnapshot,
        );
    const ref = useRef<HTMLDivElement | null>(null);

    const place = useCallback(() => {
        const el = ref.current;
        if (!el || !anchor?.isConnected) return false;

        const a = anchor.getBoundingClientRect();
        if (
            a.bottom < 0 ||
            a.top > window.innerHeight ||
            a.right < 0 ||
            a.left > window.innerWidth
        ) {
            return false;
        }

        const { offsetWidth: w, offsetHeight: h } = el;
        let pos = tooltipPlacement(a, placement, w, h, GAP);
        const overflowsV =
            pos.top < MARGIN || pos.top + h > window.innerHeight - MARGIN;

        if (overflowsV && (placement === "top" || placement === "bottom")) {
            const flipped = tooltipPlacement(
                a,
                placement === "top" ? "bottom" : "top",
                w,
                h,
                GAP,
            );
            if (
                flipped.top >= MARGIN &&
                flipped.top + h <= window.innerHeight - MARGIN
            ) {
                pos = flipped;
            }
        }
        const left = Math.max(
            MARGIN,
            Math.min(pos.left, window.innerWidth - w - MARGIN),
        );
        const top = Math.max(
            MARGIN,
            Math.min(pos.top, window.innerHeight - h - MARGIN),
        );
        el.style.top = `${top}px`;
        el.style.left = `${left}px`;
        return true;
    }, [anchor, placement]);

    useLayoutEffect(() => {
        if (visible && !place()) tooltipStore.hideAll();
    }, [visible, content, place]);

    useEffect(() => {
        if (!visible) return;

        let frame = 0;
        const update = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                if (!place()) tooltipStore.hideAll();
            });
        };

        const close = () => tooltipStore.hideAll();
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && visible) {
                e.preventDefault();
                close();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("scroll", update, true);
        window.addEventListener("resize", update);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("scroll", update, true);
            window.removeEventListener("resize", update);
        };
    }, [place, visible]);

    return (
        <div
            ref={ref}
            id={ownerId ?? undefined}
            role="tooltip"
            data-uc-tooltip-layer={visible}
            onMouseEnter={tooltipStore.cancelHide}
            onMouseLeave={tooltipStore.hideCurrent}
        >
            {content}
        </div>
    );
}
