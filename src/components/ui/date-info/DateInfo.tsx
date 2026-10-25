import type { ReactNode, TimeHTMLAttributes } from "react";

import "./date-info.css";

interface DateTooltipProps extends TimeHTMLAttributes<HTMLTimeElement> {
    date: Date;
    tooltip?: boolean;
    language?: string;
    displayFormat?: Intl.DateTimeFormatOptions;
    tooltipFormat?: Intl.DateTimeFormatOptions;
}

export default function DateTooltip({
    date,
    tooltip = true,
    language = "fr-FR",
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

    const shortDate = date.toLocaleDateString(language, shortOptions);
    const fullDate = date.toLocaleDateString(language, fullOptions);

    return (
        <time
            {...props}
            dateTime={date.toISOString()}
            data-tooltip={tooltip ? fullDate : undefined}
            aria-label={fullDate}
        >
            {shortDate}
        </time>
    );
}
