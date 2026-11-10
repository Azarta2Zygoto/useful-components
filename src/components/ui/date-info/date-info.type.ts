import type { ComponentProps, ReactNode } from "react";

type DateTooltip = Omit<
    ComponentProps<"time">,
    "dateTime" | "children" | "aria-label"
>;
export interface DateTooltipProps extends DateTooltip {
    date: Date | string | number;
    timeZone?: string;
    fallback?: ReactNode;
    locale?: string;
    displayFormat?: Intl.DateTimeFormatOptions;
    tooltipFormat?: Intl.DateTimeFormatOptions;
}
