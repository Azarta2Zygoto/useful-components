"use client";

import DateTooltip from "@/components/ui/date-info/DateInfo";

export default function DateInfoPage() {
    const currentDate = new Date();

    return (
        <main>
            <h1>Date Info Page</h1>
            <p>
                Current Date:{" "}
                <DateTooltip
                    date={currentDate}
                    locale="en-US"
                />
            </p>
            <h2>Custom Locales</h2>
            <p>
                Current Date in french: <DateTooltip date={currentDate} />
            </p>
            <p>
                Current Date in Spanish:{" "}
                <DateTooltip
                    date={currentDate}
                    locale="es"
                />
            </p>
            <h2>Custom Date Formats</h2>
            <p>
                Current Date with Custom Formats:{" "}
                <DateTooltip
                    date={currentDate}
                    locale="en-US"
                    displayFormat={{
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    }}
                    tooltipFormat={{
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    }}
                />
            </p>
        </main>
    );
}
