import type { ReactNode } from "react";

import "./date-info.css";
import type { DateTooltipProps } from "./date-info.type";

export default function DateTooltip({
    date,
    tooltip = true,
    locale = "fr-FR",
    displayFormat,
    tooltipFormat,
    ...props
}: DateTooltipProps): ReactNode {
    const isValidDate = date instanceof Date && !isNaN(date.getTime());

    if (!isValidDate) {
        console.warn("Invalid date provided to DateTooltip");
        return <span className="date-tooltip-error">Invalid date</span>;
    }

    const shortOptions = displayFormat || {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };

    const fullOptions = tooltipFormat || {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    const shortDate = date.toLocaleDateString(locale, shortOptions);
    const fullDate = date.toLocaleDateString(locale, fullOptions);

    return (
        <time
            {...props}
            dateTime={date.toISOString()}
            data-uc-tooltip={tooltip ?? undefined}
            aria-label={fullDate}
        >
            {shortDate}
        </time>
    );
}
