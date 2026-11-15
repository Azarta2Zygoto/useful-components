const formatCache = new Map<string, Intl.DateTimeFormat>();

export function getFormatter(
    locale: string,
    options: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat {
    const key = `${locale}-${JSON.stringify(options)}`;
    let formatter = formatCache.get(key);
    if (!formatter) {
        formatter = new Intl.DateTimeFormat(locale, options);
        formatCache.set(key, formatter);
    }
    return formatter;
}

export function toValidDate(value: Date | string | number): Date | null {
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
}

export const DEFAULT_DISPLAY_FORMAT: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
};

export const DEFAULT_TOOLTIP_FORMAT: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
};
