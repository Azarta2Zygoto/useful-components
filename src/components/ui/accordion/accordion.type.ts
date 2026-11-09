import type { ComponentProps, ReactNode } from "react";

export type AccordionView = "none" | "icon" | "card";
export type AccordionInnerVariant = "around" | "left" | "none";

type Accordion = Omit<ComponentProps<"div">, "inert" | "region">;
interface AccordionCoreProps extends Accordion {
    open?: boolean;
    defaultOpen?: boolean;
    variant?: AccordionInnerVariant;
    transitionMs?: number;
    onToggleChange?: (open: boolean) => void;
}

interface AccordionNoneProps extends AccordionCoreProps {
    view?: "none";
    header?: never;
    tooltip?: never;
    ripple?: never;
    text?: never;
    containerProps?: never;
}

interface AccordionVariantProps extends AccordionCoreProps {
    header?: ReactNode;
    tooltip?: boolean;
    ripple?: boolean;
    view: Exclude<AccordionView, "none">;
    text?: AccordionTextProps;
    containerProps?: ComponentProps<"div">;
}

export type AccordionProps = AccordionNoneProps | AccordionVariantProps;

export interface AccordionTextProps {
    collapse?: string;
    expand?: string;
}
