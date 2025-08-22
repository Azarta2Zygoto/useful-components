import { JSX } from 'react';
import './dateTooltip.css';

interface DateTooltipProps {
    date: Date;
    showTooltip?: boolean;
    language?: string;
    displayFormat?: Intl.DateTimeFormatOptions;
    tooltipFormat?: Intl.DateTimeFormatOptions;
    className?: string;
    style?: React.CSSProperties;
}

export default function DateTooltip({
    date,
    showTooltip = true,
    language = 'fr-FR',
    displayFormat,
    tooltipFormat,
    className,
    style
}: DateTooltipProps): JSX.Element {
    const isValidDate = date instanceof Date && !isNaN(date.getTime());
    
    if (!isValidDate) {
        console.warn('Invalid date provided to DateTooltip');
        return <span className="date-tooltip-error">Invalid date</span>;
    }

    const shortOptions = displayFormat || {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };

    const fullOptions = tooltipFormat || {
        weekday: 'long', // This gets the day name (Monday, Tuesday, etc.)
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

    const shortDate = date.toLocaleDateString(language, shortOptions);
    const fullDate = date.toLocaleDateString(language, fullOptions);


    return (
        <time
            dateTime={date.toISOString()}
            className={`date-tooltip ${showTooltip ? 'tooltip' : ''} ${className || ''}`}
            aria-label={fullDate}
            {...(showTooltip !== false ? { 'data-tooltip': fullDate } : {})}
            style={style}
        >
            {shortDate}
        </time>
    );
}