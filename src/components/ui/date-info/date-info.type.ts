import type { ComponentProps } from "react";

type DateTooltip = Omit<
    ComponentProps<"time">,
    "dateTime" | "children" | "aria-label"
>;
export interface DateTooltipProps extends DateTooltip {
    date: Date;
    tooltip?: boolean;
    locale?: string;
    displayFormat?: Intl.DateTimeFormatOptions;
    tooltipFormat?: Intl.DateTimeFormatOptions;
}
