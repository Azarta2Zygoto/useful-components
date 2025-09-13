import { JSX, useState, useEffect, useId, useRef } from "react";
import Icon from "@/component/utils/icon";
import "./accordeon.css";

interface AccordeonProps {
    title: string|JSX.Element;
    children: JSX.Element;
    isOpen?: boolean;
    style?: React.CSSProperties;
    className?: string;
    height?:number;
    view?:"simple" | "icon" | "card";
    type?: "component" | "inner";
    transitionMs?: number;
    onToggle?: () => void;
}

export default function Accordeon({
    title,
    children,
    isOpen,
    style,
    className,
    height,
    view = "simple",
    type = "component",
    transitionMs = 300,
    onToggle
}: AccordeonProps) {
    const contentId = useId();
    const headerId = useId();

    const [openState, setOpenState] = useState(!!isOpen);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [maxHeight, setMaxHeight] = useState<string>("0px");

    
    useEffect(() => {
        setOpenState(Boolean(isOpen));
    }, [isOpen]);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) {
            setMaxHeight(openState ? (height ? `${height}px` : "none") : "0px");
            return;
        }

        if (openState) {
            // expand: set measured height then remove limit to allow auto-height
            const measured = height ? height : el.scrollHeight;
            // set to measured px to animate from 0 -> measured
            setMaxHeight(`${measured}px`);
            const tidy = window.setTimeout(() => {
                // remove maxHeight so content can grow/shrink naturally
                setMaxHeight("none");
            }, transitionMs);
            return () => clearTimeout(tidy);
        } else {
            // collapse: if we had 'none', force current height then animate to 0
            const current = el.scrollHeight;
            // ensure browser sees current height before changing to 0
            setMaxHeight(`${current}px`);
            // next frame -> 0
            const raf = window.setTimeout(() => {
                setMaxHeight("0px");
            }
            , 10);
            return () => clearTimeout(raf);
        }
    }, [openState, height, transitionMs, children]);

    function handleToggle() {
        setOpenState(!openState);
        onToggle?.();
    }

    return (
        <div className={`accordeon-wrapper ${openState ? "open" : "closed"} ${className || ""}`}>
            {view==="card"&&(
                <div
                    id={headerId}
                    className={`accordeon-header ${type}`}
                    onClick={handleToggle}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {if (e.key === "Enter" || e.key === " ") {handleToggle();}}}
                    aria-expanded={openState}
                    aria-controls={contentId}
                    aria-label="Toggle Accordeon">
                    <span></span>
                    <span className="accordeon-title">{title}</span>
                    <Icon
                        title={openState?"Collapse":"Expand"}
                        desc={openState?"Collapse the accordeon":"Expand the accordeon"}
                        name={"caret-up-fill"}
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
                    <button
                        className={`background-click ${openState ? "selected" : ""}`}
                        onClick={handleToggle}
                        type="button"
                        aria-label="Toggle Accordeon"
                        aria-controls={contentId}
                        aria-expanded={openState}>
                        <Icon
                            name={"caret-up-fill"}
                            style={{
                                transform: openState ? "rotate(0deg)" : "rotate(180deg)",
                                transition: `transform ${transitionMs}ms ease`,
                            }}
                        />
                    </button>
                </div>
            )}
            <div
                id={contentId}
                role="region"
                aria-labelledby={view !== "simple" ? headerId : undefined}
                ref={contentRef}
                aria-hidden={!openState}
                className={`accordeon-content ${type} ${view==="simple"?"accordeon-simple":""}`}
                style={{
                    maxHeight: maxHeight === "none" ? undefined : maxHeight,
                    overflow: "hidden",
                    transition: `max-height ${transitionMs}ms ease, padding ${transitionMs}ms ease, border-color ${transitionMs}ms ease`,
                    ...style,
                }}
            >
                {children}
            </div>
        </div>
    );
}