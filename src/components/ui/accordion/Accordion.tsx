"use client";

import {
    type CSSProperties,
    type HTMLAttributes,
    type PropsWithChildren,
    type ReactNode,
    useId,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

import Button from "../button/Button";
import Icon from "../icon/icon";
import { useRipple } from "../ripple/useRipple.hook";
import "./accordion.css";

interface AccordionTextProps {
    collapse?: string;
    expand?: string;
    collapseDesc?: string;
    expandDesc?: string;
}

const defaultText: Required<AccordionTextProps> = {
    collapse: "Collapse",
    expand: "Expand",
    collapseDesc: "Collapse the content of the accordion",
    expandDesc: "Expand the content of the accordion",
};

interface Props extends HTMLAttributes<HTMLDivElement> {
    header?: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    height?: number;
    tooltip?: boolean;
    ripple?: boolean;
    view?: "simple" | "icon" | "card";
    variant?: "primary" | "secondary" | "transparent";
    transitionMs?: number;
    text?: AccordionTextProps;
    onToggleChange?: (open: boolean) => void;
}

export default function Accordion({
    header,
    open,
    defaultOpen,
    height,
    tooltip = true,
    ripple,
    view = "simple",
    variant = "transparent",
    transitionMs = 300,
    text,
    style,
    children,
    onToggleChange,
    ...props
}: Readonly<PropsWithChildren<Props>>): ReactNode {
    const contentId = useId();
    const headerId = useId();
    const contentRef = useRef<HTMLDivElement | null>(null);

    const isControlled = open !== undefined;
    const shouldRipple = ripple ?? variant === "primary";
    const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
    const { rippleRef, onPointerDown: handlePointerDown } =
        useRipple<HTMLButtonElement>({
            disabled: !shouldRipple,
        });

    const expanded = isControlled ? open : internalOpen;
    const texts = {
        ...defaultText,
        ...text,
    };

    useLayoutEffect(() => {
        const el = contentRef.current;

        if (!el) return;

        let timeoutId: number | undefined;
        let raf1: number | undefined;
        let raf2: number | undefined;

        if (expanded) {
            const measured = height ?? el.scrollHeight;
            el.style.maxHeight = `${measured}px`;

            timeoutId = window.setTimeout(() => {
                el.style.maxHeight = "none";
            }, transitionMs);
        } else {
            el.style.maxHeight = `${el.scrollHeight}px`;

            raf1 = window.requestAnimationFrame(() => {
                raf2 = window.requestAnimationFrame(() => {
                    el.style.maxHeight = "0px";
                });
            });
        }

        return () => {
            if (timeoutId !== undefined) {
                window.clearTimeout(timeoutId);
            }

            if (raf1 !== undefined) {
                window.cancelAnimationFrame(raf1);
            }

            if (raf2 !== undefined) {
                window.cancelAnimationFrame(raf2);
            }
        };
    }, [expanded, height, transitionMs]);

    const handleToggle = () => {
        const next = !expanded;

        if (!isControlled) {
            setInternalOpen(next);
        }

        onToggleChange?.(next);
    };

    const child = (
        <div
            {...props}
            ref={contentRef}
            id={contentId}
            data-expanded={expanded}
            data-accordion={view}
            data-accordion-variant={variant}
            role="region"
            aria-labelledby={view !== "simple" ? headerId : undefined}
            aria-hidden={!expanded}
            inert={!expanded}
            style={
                {
                    "--transition-duration": `${transitionMs}ms`,
                    ...style,
                } as CSSProperties
            }
        >
            {children}
        </div>
    );

    if (view === "simple") {
        return child;
    }

    return (
        <div className="accordion-wrapper">
            {view === "card" && (
                <button
                    type="button"
                    id={headerId}
                    data-accordion-header={variant}
                    aria-expanded={expanded}
                    aria-controls={contentId}
                    onClick={handleToggle}
                    onPointerDown={handlePointerDown}
                >
                    {header}
                    {shouldRipple && (
                        <span
                            ref={rippleRef}
                            className="ripple"
                        />
                    )}
                    <Icon
                        title={expanded ? texts.collapse : texts.expand}
                        desc={expanded ? texts.collapseDesc : texts.expandDesc}
                        name="caret-up-fill"
                        style={{
                            transition: `transform ${transitionMs}ms ease`,
                        }}
                    />
                </button>
            )}

            {view === "icon" && (
                <div
                    id={headerId}
                    data-accordion-header={variant}
                >
                    {header}
                    <Button
                        tooltip={
                            tooltip
                                ? expanded
                                    ? texts.collapse
                                    : texts.expand
                                : undefined
                        }
                        variant="transparent"
                        aria-label={expanded ? texts.collapse : texts.expand}
                        aria-controls={contentId}
                        aria-expanded={expanded}
                        onClick={handleToggle}
                    >
                        <Icon
                            name="caret-up-fill"
                            style={{
                                transition: `transform ${transitionMs}ms ease`,
                            }}
                        />
                    </Button>
                </div>
            )}
            {child}
        </div>
    );
}
