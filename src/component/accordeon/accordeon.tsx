import React, { JSX, useState, useEffect, useId, useRef, useLayoutEffect } from "react";
import Tooltip from "../tooltip/tooltip";
import Icon from "../utils/icon";
import "./accordeon.css";


/**
 * @param param - The properties for the Accordeon component.
 * @param param.title - The title of the accordeon (string or JSX element).
 * @param param.isOpen - Optional initial open state of the accordeon (default is false).
 * @param param.className - Optional additional class name for custom styling.
 * @param param.height - Optional fixed height for the content area (default is auto).
 * @param param.tooltip - Optional tooltip for the toggle button (default is true).
 * @param param.view - Optional view type ("simple", "icon", or "card", default is "simple").
 * @param param.type - Optional type of header ("component" or "inner", default is "component").
 * @param param.transitionMs - Optional transition duration in milliseconds (default is 300ms).
 * @param param.text - Optional text for toggle, collapse, and expand buttons.
 * @param param.style - Optional inline styles for the content area.
 * @param param.children - The content to display inside the accordeon.
 * @param param.onToggle - Optional callback function to execute when the accordeon is toggled.
 * @returns A JSX element representing the Accordeon component.
 */

interface AccordeonProps {
    title: string|JSX.Element;
    isOpen?: boolean;
    className?: string;
    height?:number;
    tooltip?: boolean;
    view?:"simple" | "icon" | "card";
    type?: "component" | "inner";
    transitionMs?: number;
    text?: {
        toggle?: string;
        collapse?: string;
        expand?: string;
        collapseDesc?: string;
        expandDesc?: string;
    }
    style?: React.CSSProperties;
    children: React.ReactNode;
    onToggle?: () => void;
}

export default function Accordeon({
    title,
    isOpen,
    className,
    height,
    tooltip = true,
    view = "simple",
    type = "component",
    transitionMs = 300,
    text,
    style,
    children,
    onToggle
}: AccordeonProps) {
    const contentId = useId();
    const headerId = useId();
    const contentRef = useRef<HTMLDivElement | null>(null);

    const [openState, setOpenState] = useState(!!isOpen);
    const [maxHeight, setMaxHeight] = useState<string>("0px");

    
    useEffect(() => {
        setOpenState(Boolean(isOpen));
    }, [isOpen]);

    useLayoutEffect(() => {
        const el = contentRef.current;
        let tidyTimer: number|undefined;
        let raf1: number|undefined;
        let raf2: number|undefined;

        if (!el) {
            setMaxHeight(openState ? (height ? `${height}px` : "none") : "0px");
            return;
        }

        if (openState) {
            
            const measured = height ? height : el.scrollHeight;
            
            setMaxHeight(`${measured}px`);
            tidyTimer = window.setTimeout(() => {
                setMaxHeight("none");
            }, transitionMs);
        } else {
            
            const current = el.scrollHeight;
            setMaxHeight(`${current}px`);
            
            raf1 = window.requestAnimationFrame(() => {
                raf2 = window.requestAnimationFrame(() => {
                    setMaxHeight("0px");
                });
            });
        }

        return () => {
            if (typeof tidyTimer !== "undefined") window.clearTimeout(tidyTimer);
            if (typeof raf1 !== "undefined") window.cancelAnimationFrame(raf1);
            if (typeof raf2 !== "undefined") window.cancelAnimationFrame(raf2);
        };
        
    }, [openState, height, transitionMs, children]);

    function handleToggle() {
        setOpenState(!openState);
        onToggle?.();
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter" || e.key === " ") {
            handleToggle();
        }
    }

    return (
        <div className={`accordeon-wrapper${openState ? " open" : " closed"} ${className || ""}`}>
            {view==="card"&&(
                <div
                    id={headerId}
                    role="button"
                    className={`accordeon-header ${type}`}
                    onClick={handleToggle}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    aria-expanded={openState}
                    aria-controls={contentId}
                    aria-label={text?.toggle || "Toggle Accordeon"}
                >
                    <span></span>
                    <span className="accordeon-title">{title}</span>
                    <Icon
                        title={openState?text?.collapse||"Collapse":text?.expand||"Expand"}
                        desc={openState?text?.collapseDesc||"Collapse the content of the accordeon":
                            text?.expandDesc||"Expand the content of the accordeon"}
                        name="caret-up-fill"
                        style={{
                            transform: openState ? "rotate(0deg)" : "rotate(180deg)",
                            transition: `transform ${transitionMs}ms ease`,
                        }}
                    />
                </div>
            )}
            {view==="icon"&&(
                <div
                    id={headerId}
                    className={`accordeon-header ${type}`}
                >
                    <span></span>
                    <span className="accordeon-title">{title}</span>
                    <Tooltip
                        title={openState?text?.collapse||"Collapse":text?.expand||"Expand"}
                        active={tooltip}
                    >
                        <button
                            type="button"
                            className={`background-click${openState ? " selected" : ""}`}
                            onClick={handleToggle}
                            aria-label={text?.toggle || "Toggle Accordeon"}
                            aria-controls={contentId}
                            aria-expanded={openState}
                        >
                            <Icon
                                name="caret-up-fill"
                                style={{
                                    transform: openState ? "rotate(0deg)" : "rotate(180deg)",
                                    transition: `transform ${transitionMs}ms ease`,
                                }}
                            />
                        </button>
                    </Tooltip>
                </div>
            )}
            <div
                ref={contentRef}
                id={contentId}
                className={`accordeon-content${view==="simple"?" accordeon-simple":""} ${type}`}
                role="region"
                aria-labelledby={view !== "simple" ? headerId : undefined}
                aria-hidden={!openState}
                style={{
                    maxHeight: maxHeight === "none" ? undefined : maxHeight,
                    transition: `max-height ${transitionMs}ms ease, padding ${transitionMs}ms ease, border-color ${transitionMs}ms ease`,
                    ...style,
                }}
            >
                {children}
            </div>
        </div>
    );
}