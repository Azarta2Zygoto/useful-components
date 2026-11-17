"use client";

import Button from "@ui/button/Button";
import useTooltip from "@ui/tooltip/useTooltip.hook";

import CodeView from "@/components/CodeView";
import ComponentAccessibility from "@/components/ComponentAccessibility";
import ComponentApi from "@/components/ComponentApi";
import PageScroll from "@/components/PageScroll";
import Title from "@/components/Title";
import ErrorFrame from "@/components/frames/ErrorFrame";
import InfoFrame from "@/components/frames/InfoFrame";
import tooltipApi from "@/documentation/tooltip.json";

export default function TooltipPage() {
    const topTooltip = useTooltip({
        content: "Tooltip above the button",
        placement: "top",
    });
    const rightTooltip = useTooltip({
        content: "Tooltip to the right",
        placement: "right",
    });
    const delayedTooltip = useTooltip({
        content: "This tooltip appears after 300 milliseconds",
        delay: 300,
    });
    const graceTooltip = useTooltip({
        content: "This tooltip remains open briefly while moving to it",
        hideGrace: 300,
    });
    const bottomTooltip = useTooltip({
        content: "Tooltip below the button",
        placement: "bottom",
    });
    const leftTooltip = useTooltip({
        content: "Tooltip on the left",
        placement: "left",
    });

    return (
        <PageScroll
            name={tooltipApi.name}
            link={tooltipApi.source}
        >
            <Title level={1}>Tooltip</Title>
            <p>
                A tooltip provides short, supplementary information when an
                element is hovered or focused. This library offers a simple CSS
                attribute and an advanced <code>useTooltip</code> hook.
            </p>

            <Title level={2}>Basic tooltip</Title>
            <p>
                Add <code>data-uc-tooltip</code> to an element to display a CSS
                tooltip on hover and keyboard focus. Add an accessible name
                separately when the tooltip trigger has no visible name.
            </p>
            <InfoFrame>
                For the moment, theses tooltips also appears on phone after a
                click on the element.
            </InfoFrame>
            <CodeView
                code={`<Button
    data-uc-tooltip="Save your changes"
    aria-label="Save your changes"
>
    Save
</Button>
<p data-uc-tooltip="Additional information">
    Information
</p>`}
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                }}
            >
                <Button
                    data-uc-tooltip="Save your changes"
                    aria-label="Save your changes"
                >
                    Save
                </Button>
                <p data-uc-tooltip="Additional information">Information</p>
            </CodeView>

            <Title level={2}>Advanced tooltip</Title>
            <p>
                Use <code>useTooltip</code> when you need dynamic positioning, a
                delay, or automatic ARIA association. Spread its returned props
                onto the trigger element.
            </p>
            <ErrorFrame>
                Theses tooltips are not working for phones! You should always
                have understandable components, tooltips are a bonus to the
                comprehension
            </ErrorFrame>
            <CodeView
                code={`const tooltip = useTooltip({
    content: "Tooltip above the button",
    placement: "top",
});

<Button {...tooltip}>Top tooltip</Button>`}
                style={{
                    display: "flex",
                    gap: "1rem",
                }}
            >
                <Button {...topTooltip}>Top tooltip</Button>
                <Button {...rightTooltip}>Right tooltip</Button>
            </CodeView>

            <Title level={2}>Placements</Title>
            <p>
                The hook supports <code>top</code>, <code>bottom</code>,{" "}
                <code>left</code>, <code>right</code>, and corner placements
                such as <code>top-left</code> and <code>bottom-right</code>. The
                layer stays inside the viewport and can flip vertically when
                needed.
            </p>
            <CodeView
                code={`const tooltip = useTooltip({
    content: "Tooltip on the left",
    placement: "left",
});

<Button {...tooltip}>Left tooltip</Button>`}
            >
                <Button {...bottomTooltip}>Bottom</Button>
                <Button {...leftTooltip}>Left</Button>
            </CodeView>

            <Title level={2}>Delay and keyboard behavior</Title>
            <p>
                Set <code>delay</code> in milliseconds to defer opening. Hook
                tooltips open on pointer hover and visible keyboard focus, close
                on blur or pointer leave, and close globally with{" "}
                <code>Escape</code>. Use <code>hideGrace</code> to delay closing
                after leaving the trigger, which gives the pointer time to reach
                the tooltip.
            </p>
            <CodeView
                code={`<Button
    {...useTooltip({
        content: "Delayed tooltip",
        delay: 300,
    })}
>
    Delayed tooltip
</Button>
<Button
    {...useTooltip({
        content: "Tooltip with a closing grace period",
        hideGrace: 300,
    })}
>
    Grace period
</Button>`}
                style={{
                    display: "flex",
                    gap: "1rem",
                }}
            >
                <Button {...delayedTooltip}>Delayed tooltip</Button>
                <Button {...graceTooltip}>Grace period</Button>
            </CodeView>

            <Title level={2}>Custom anchor</Title>
            <p>
                Use <code>positionRef</code> when the tooltip should be
                positioned relative to a different element than the trigger. The
                ref must point to an <code>HTMLElement</code>.
            </p>

            <ComponentApi
                title="CSS tooltip API"
                elements={tooltipApi.css}
            />
            <ComponentApi
                title="useTooltip API"
                elements={tooltipApi.hook}
            />
            <ComponentAccessibility elements={tooltipApi.accessibility} />
        </PageScroll>
    );
}
