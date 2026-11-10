"use client";

import { type CSSProperties, type ReactNode, useId, useState } from "react";

import CaretUpIcon from "../assets/icons/caret-up.svg";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import { useRipple } from "../ripple/useRipple.hook";
import { useTooltip } from "../tooltip/useTooltip.hook";
import "./accordion.css";
import type { AccordionProps, AccordionTextProps } from "./accordion.type";

const defaultText: Required<AccordionTextProps> = {
    collapse: "Collapse",
    expand: "Expand",
};

export default function Accordion({
    id,
    header,
    open,
    defaultOpen,
    tooltip = true,
    ripple,
    view = "none",
    variant = "around",
    transitionMs = 300,
    text,
    children,
    containerProps,
    "aria-describedby": describedByProp,
    onToggleChange,
    ...props
}: AccordionProps): ReactNode {
    const generatedId = useId();
    const correctId = id ?? generatedId;
    const describedBy =
        [describedByProp, view === "none" ? undefined : `${correctId}-header`]
            .filter(Boolean)
            .join(" ") || undefined;

    const isControlled = open !== undefined;
    const hasRipple =
        view !== "card" ? false : (ripple ?? variant === "around");
    const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
    const { rippleProps, onPointerDown: handlePointerDown } =
        useRipple<HTMLButtonElement>({
            disabled: !hasRipple,
        });

    const expanded = isControlled ? open : internalOpen;
    const texts = {
        ...defaultText,
        ...text,
    };

    const tooltipInfo = useTooltip({
        content: tooltip
            ? expanded
                ? texts.collapse
                : texts.expand
            : undefined,
        delay: 300,
    });

    const handleToggle = () => {
        const next = !expanded;

        if (!isControlled) {
            setInternalOpen(next);
        }

        onToggleChange?.(next);
    };

    const child = (
        <div
            data-uc-expanded={expanded}
            className="uc-accordion-content"
            style={
                {
                    "--transition-duration": `${transitionMs}ms`,
                } as CSSProperties
            }
        >
            <div
                {...props}
                id={correctId}
                role="region"
                data-uc-accordion={variant}
                aria-describedby={describedBy}
                inert={!expanded}
            >
                {children}
            </div>
        </div>
    );

    if (view === "none") {
        return child;
    }

    return (
        <div
            {...containerProps}
            style={
                {
                    "--transition-duration": `${transitionMs}ms`,
                    ...containerProps?.style,
                } as CSSProperties
            }
        >
            {view === "card" && (
                <Button
                    id={`${correctId}-header`}
                    variant="transparent"
                    data-uc-accordion-header={variant}
                    data-uc-accordion-toggle
                    aria-expanded={expanded}
                    aria-controls={correctId}
                    onClick={handleToggle}
                    onPointerDown={handlePointerDown}
                    {...tooltipInfo}
                >
                    {header}
                    {hasRipple && <span {...rippleProps} />}
                    <Icon icon={CaretUpIcon} />
                </Button>
            )}

            {view === "icon" && (
                <div
                    data-uc-accordion-header={variant}
                    id={`${correctId}-header`}
                >
                    {header}
                    <Button
                        variant="transparent"
                        data-uc-accordion-toggle
                        aria-label={expanded ? texts.collapse : texts.expand}
                        aria-controls={correctId}
                        aria-expanded={expanded}
                        onClick={handleToggle}
                        {...tooltipInfo}
                    >
                        <Icon icon={CaretUpIcon} />
                    </Button>
                </div>
            )}
            {child}
        </div>
    );
}
