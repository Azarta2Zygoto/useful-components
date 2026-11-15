import type { ReactNode } from "react";

import "./date-info.css";
import type { DateTooltipProps } from "./date-info.type";
import {
    DEFAULT_DISPLAY_FORMAT,
    DEFAULT_TOOLTIP_FORMAT,
    getFormatter,
    toValidDate,
} from "./date-info.utils";

export default function DateTooltip({
    dateTime,
    locale = "fr-FR",
    timeZone,
    fallback = null,
    displayFormat = DEFAULT_DISPLAY_FORMAT,
    tooltipFormat = DEFAULT_TOOLTIP_FORMAT,
    ...props
}: DateTooltipProps): ReactNode {
    const date = toValidDate(dateTime);
    if (!date) return fallback;

    const tooltip = getFormatter(locale, {
        ...tooltipFormat,
        timeZone,
    }).format(date);
    const label = getFormatter(locale, {
        ...displayFormat,
        timeZone,
    }).format(date);

    return (
        <time
            tabIndex={0}
            {...props}
            lang={locale}
            dateTime={date.toISOString()}
            data-uc-date=""
            data-uc-tooltip={tooltip}
        >
            {label}
        </time>
    );
}
