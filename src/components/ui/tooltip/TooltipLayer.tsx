"use client";

import {
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

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el || !anchor || !visible) return;

        const a = anchor.getBoundingClientRect();
        const { offsetWidth: w, offsetHeight: h } = el;

        let { top, left } = tooltipPlacement(a, placement, w, h, GAP);

        left = Math.max(MARGIN, Math.min(left, window.innerWidth - w - MARGIN));
        top = Math.max(MARGIN, Math.min(top, window.innerHeight - h - MARGIN));

        el.style.top = `${top}px`;
        el.style.left = `${left}px`;
    }, [visible, content, placement, anchor]);

    useEffect(() => {
        if (!visible) return;

        const close = () => tooltipStore.hideAll();
        const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && close();

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("scroll", close, true);
        window.addEventListener("resize", close);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("scroll", close, true);
            window.removeEventListener("resize", close);
        };
    }, [visible]);

    return (
        <div
            ref={ref}
            id={ownerId ?? undefined}
            role="tooltip"
            data-uc-tooltip-layer
            data-visible={visible}
            data-placement={placement}
        >
            {content}
        </div>
    );
}
