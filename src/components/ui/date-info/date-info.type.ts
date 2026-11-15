import type { ComponentProps, ReactNode } from "react";

type DateTooltip = Omit<
    ComponentProps<"time">,
    "dateTime" | "children" | "lang"
>;
export interface DateTooltipProps extends DateTooltip {
    dateTime: Date | string | number;
    locale?: string;
    timeZone?: string;
    fallback?: ReactNode;
    displayFormat?: Intl.DateTimeFormatOptions;
    tooltipFormat?: Intl.DateTimeFormatOptions;
    "aria-label"?: never;
}
