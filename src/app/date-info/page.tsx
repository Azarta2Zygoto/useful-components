"use client";

import CodeView from "@/components/CodeView";
import ComponentAccessibility from "@/components/ComponentAccessibility";
import ComponentApi from "@/components/ComponentApi";
import PageScroll from "@/components/PageScroll";
import Title from "@/components/Title";
import ErrorFrame from "@/components/frames/ErrorFrame";
import WarningFrame from "@/components/frames/WarningFrame";
import DateInfo from "@/components/ui/date-info/DateInfo";
import dateApi from "@/documentation/date-tooltip.json";

export default function DateInfoPage() {
    const currentDate = new Date();

    return (
        <PageScroll
            name={dateApi.name}
            link={dateApi.source}
        >
            <Title level={1}>Date Info</Title>
            <p>
                This component allows to give more details on the dateTime that
                it is shown. The tooltip can be disabled if needed.
            </p>
            <ErrorFrame>
                If you put the current dateTime as shown in the example, the
                dateTime will not be updated automatically. You will need to
                refresh the page to see the new dateTime.
            </ErrorFrame>
            <CodeView
                code={`<DateInfo
    dateTime={currentDate}
    locale="en-US"
/>`}
            >
                Current Date:
                <DateInfo
                    dateTime={currentDate}
                    locale="en-US"
                />
            </CodeView>
            <Title level={2}>Custom Locales</Title>
            <p>
                It possible to change the locale of the dateTime to display it
                in different languages.
            </p>
            <CodeView
                code={`<DateInfo
    dateTime={currentDate}
    locale="fr-FR"
/>`}
            >
                <div>
                    Date du jour:&nbsp;
                    <DateInfo
                        dateTime={currentDate}
                        locale="fr-FR"
                    />
                </div>
                <div>
                    Dato actual:&nbsp;
                    <DateInfo
                        dateTime={currentDate}
                        locale="es-ES"
                    />
                </div>
            </CodeView>
            <Title level={2}>Timezone</Title>
            <p>
                You can also change the timezone of the dateTime to display it
                in.
            </p>
            <WarningFrame>
                It seems useless if it only displays the dateTime, but it avoids
                errors near midnight.
            </WarningFrame>
            <CodeView
                code={`<DateInfo
    dateTime={currentDate}
    timeZone="America/New_York"
/>`}
            >
                <p>
                    Current hour in New-York&nbsp;
                    <DateInfo
                        dateTime={currentDate}
                        timeZone="America/New_York"
                        locale="en-US"
                        displayFormat={{
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        }}
                    />
                </p>
            </CodeView>
            <Title level={2}>Custom Formats</Title>
            <p>
                You can change the format of the text shown or of th text in the
                tooltip
            </p>

            <CodeView
                code={`<DateInfo
    dateTime={currentDate}
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
/>`}
            >
                Current Date:
                <DateInfo
                    dateTime={currentDate}
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
            </CodeView>
            <ComponentApi elements={dateApi} />
            <ComponentAccessibility elements={dateApi.accessibility} />
        </PageScroll>
    );
}
