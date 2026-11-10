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
    date,
    locale = "fr-FR",
    fallback = null,
    timeZone,
    displayFormat = DEFAULT_DISPLAY_FORMAT,
    tooltipFormat = DEFAULT_TOOLTIP_FORMAT,
    ...props
}: DateTooltipProps): ReactNode {
    const value = toValidDate(date);
    if (!value) return fallback;

    const shortDate = getFormatter(locale, {
        ...displayFormat,
        timeZone,
    }).format(value);
    const fullDate = getFormatter(locale, {
        ...tooltipFormat,
        timeZone,
    }).format(value);

    return (
        <time
            tabIndex={0}
            {...props}
            lang={locale}
            dateTime={value.toISOString()}
            data-uc-date=""
            data-uc-tooltip={fullDate}
        >
            {shortDate}
        </time>
    );
}
