"use client";

import {
    type CSSProperties,
    type ComponentProps,
    type ReactNode,
    useId,
    useState,
} from "react";

import CaretUpIcon from "../assets/icons/caret-up.svg";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import { useRipple } from "../ripple/useRipple.hook";
import { useTooltip } from "../tooltip/useTooltip.hook";
import "./accordion.css";

interface AccordionTextProps {
    collapse?: string;
    expand?: string;
}

const defaultText: Required<AccordionTextProps> = {
    collapse: "Collapse",
    expand: "Expand",
};

export type AccordionView = "none" | "icon" | "card";
export type AccordionInnerVariant = "around" | "left" | "none";

interface AccordionCoreProps {
    open?: boolean;
    defaultOpen?: boolean;
    variant?: AccordionInnerVariant;
    transitionMs?: number;
    onToggleChange?: (open: boolean) => void;
}

interface AccordionNoneProps extends ComponentProps<"div">, AccordionCoreProps {
    view?: "none";
    header?: never;
    tooltip?: never;
    ripple?: never;
    text?: never;
    containerProps?: never;
}

interface AccordionVariantProps
    extends ComponentProps<"div">, AccordionCoreProps {
    header?: ReactNode;
    tooltip?: boolean;
    ripple?: boolean;
    view: Exclude<AccordionView, "none">;
    text?: AccordionTextProps;
    containerProps?: ComponentProps<"div">;
}

export type AccordionProps = AccordionNoneProps | AccordionVariantProps;

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
}: Readonly<AccordionProps>): ReactNode {
    const generatedId = useId();
    const correctId = id ?? generatedId;
    const describedBy =
        [describedByProp, view === "none" ? undefined : `${correctId}-header`]
            .filter(Boolean)
            .join(" ") || undefined;

    const isControlled = open !== undefined;
    const shouldRipple =
        view !== "card" ? false : (ripple ?? variant === "around");
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

    const tooltipInfo = useTooltip({
        content: expanded ? texts.collapse : texts.expand,
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
                    {...(tooltip ? tooltipInfo : {})}
                >
                    {header}
                    {shouldRipple && (
                        <span
                            ref={rippleRef}
                            data-uc-ripple
                        />
                    )}
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
                        {...(tooltip ? tooltipInfo : {})}
                    >
                        <Icon icon={CaretUpIcon} />
                    </Button>
                </div>
            )}
            {child}
        </div>
    );
}
