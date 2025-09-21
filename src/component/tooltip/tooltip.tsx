"use client";

import { useState, useRef, JSX } from "react";
import BodyAccess from "@/component/utils/bodyAccess";
import "./tooltip.css";

interface TooltipProps {
    title: string;
    children: React.ReactNode;
    placement?: "top" | "bottom" | "left" | "right";
    active?: boolean;
    offset?: number;
    keepWrapper?: boolean;
    targetRef?: React.RefObject<HTMLElement|null>;
    style?: React.CSSProperties;
}

export default function Tooltip({
    title,
    children,
    active = true,
    placement = "bottom",
    offset = 4,
    keepWrapper,
    targetRef,
    style
}: TooltipProps) : JSX.Element {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState({ left: 0, top: 0 });
    const [showTooltip, setShowTooltip] = useState(false);

    const mouseEnter = () => {
        if (!active) return;

        const ref = targetRef?.current || wrapperRef.current;
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        let left = rect.left + rect.width / 2;
        let top = rect.top + rect.height;
        if (placement === "top") {
            top = rect.top - offset;
        } else if (placement === "bottom") {
            top = rect.bottom + offset;
        } else if (placement === "left") {
            left = rect.left - offset;
            top = rect.top + rect.height / 2;
        } else if (placement === "right") {
            left = rect.right + offset;
            top = rect.top + rect.height / 2;
        }
        
        setCoords({ left, top });
        setShowTooltip(true);
    };

    const mouseLeave = () => {
        setShowTooltip(false);
    };

    if (!active&&!keepWrapper) return <>{children}</>;
    return (
        <div
            className="tooltip-wrapper"
            ref={wrapperRef}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            aria-describedby={active && showTooltip ? "tooltip" : undefined}
            style={style}
        >
            {children}
            {active && showTooltip && (
                <BodyAccess>
                    <span
                        id="tooltip"
                        className="tooltip-component"
                        role="tooltip"
                        style={{
                            left: coords.left,
                            top: coords.top,
                        }}
                    >
                        {title}
                    </span>
                </BodyAccess>
            )}
        </div>
    );
}