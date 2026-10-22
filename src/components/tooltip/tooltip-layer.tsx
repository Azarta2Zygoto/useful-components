"use client";

import { type ReactNode, useEffect, useState } from "react";

import { createPortal } from "react-dom";

import { useTooltipContext } from "./tooltip-context";
import "./tooltip.css";
import { getTooltipPosition } from "./tooltip.utils";

export function TooltipLayer(): ReactNode {
    const { active } = useTooltipContext();
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0, transform: "" });

    useEffect(() => {
        const element = document.createElement("div");
        element.dataset.tooltipLayer = "";
        document.body.appendChild(element);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setContainer(element);

        return () => element.remove();
    }, []);

    useEffect(() => {
        if (!active) return;

        const updatePosition = () => {
            setPosition(getTooltipPosition(active));
        };

        updatePosition();

        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);

        const observer = new ResizeObserver(updatePosition);
        observer.observe(active.anchor);

        return () => {
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
            observer.disconnect();
        };
    }, [active]);

    if (!container || !active) return null;

    return createPortal(
        <div
            role="tooltip"
            data-state={active.open ? "open" : "closed"}
            style={{
                left: position.x,
                top: position.y,
                transform: position.transform,
            }}
        >
            {active.content}
        </div>,
        container,
    );
}
