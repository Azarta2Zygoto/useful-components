"use client";

import { useState } from "react";

import CodeView from "@/components/CodeView";
import ComponentAccessibility from "@/components/ComponentAccessibility";
import ComponentApi from "@/components/ComponentApi";
import PageScroll from "@/components/PageScroll";
import Title from "@/components/Title";
import Slider from "@/components/ui/slider/Slider";
import sliderApi from "@/documentation/slider.json";

export default function SliderPage() {
    const [value, setValue] = useState(50);

    return (
        <PageScroll
            name={sliderApi.name}
            link={sliderApi.source}
        >
            <Title level={1}>Slider</Title>
            <p>
                <code>Slider</code> lets users select a numeric value from a
                range using the native <code>input type=&quot;range&quot;</code>
                . It adds labels, value tooltips, units, and optional tick
                marks.
            </p>

            <Title level={2}>Basic slider</Title>
            <p>
                Provide a required <code>label</code>. The default range is{" "}
                <code>0</code> to <code>100</code>, with an initial value of{" "}
                <code>0</code>.
            </p>
            <CodeView
                code={`<Slider
    label="Volume"
    min={0}
    max={100}
    defaultValue={50}
/>`}
            >
                <Slider
                    label="Volume"
                    min={0}
                    max={100}
                    defaultValue={50}
                />
            </CodeView>

            <Title level={2}>Controlled value and step</Title>
            <p>
                Use <code>value</code> with <code>onValue</code> for a
                controlled slider. The callback receives the current value as a
                number. The <code>step</code> prop controls the increment.
            </p>
            <CodeView
                code={`const [value, setValue] = useState(50);

<Slider
    label="Percentage"
    min={0}
    max={100}
    step={5}
    value={value}
    onValue={setValue}
/>`}
            >
                <Slider
                    label="Percentage"
                    min={0}
                    max={100}
                    step={5}
                    value={value}
                    onValue={setValue}
                />
            </CodeView>

            <Title level={2}>Ticks and units</Title>
            <p>
                Set <code>tick</code> to display marks based on the range and
                step. Add a <code>unit</code> to the value tooltip and the
                accessible value text.
            </p>
            <CodeView
                code={`<Slider
    label="Storage used"
    min={0}
    max={100}
    step={10}
    defaultValue={40}
    tick
    unit="%"
/>`}
            >
                <Slider
                    label="Storage used"
                    min={0}
                    max={100}
                    step={10}
                    defaultValue={40}
                    tick
                    unit="%"
                />
            </CodeView>

            <Title level={2}>Thumb tooltip</Title>
            <p>
                The thumb tooltip is shown on hover by default. Use{" "}
                <code>tooltipThumb=&quot;always&quot;</code> to keep it visible
                or <code>tooltipThumb=&quot;never&quot;</code> to hide it.
            </p>
            <CodeView
                code={`<Slider
    label="Always visible value"
    defaultValue={75}
    tooltipThumb="always"
/>
<Slider
    label="Hidden value tooltip"
    defaultValue={25}
    tooltipThumb="never"
/>`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <Slider
                    label="Always visible value"
                    defaultValue={75}
                    tooltipThumb="always"
                />
                <Slider
                    label="Hidden value tooltip"
                    defaultValue={25}
                    tooltipThumb="never"
                />
            </CodeView>

            <Title level={2}>Layout and states</Title>
            <p>
                Use <code>position=&quot;left&quot;</code> to place the label
                beside the slider, <code>size</code> for the shared component
                sizes, and <code>height</code> for the track height. Native
                input states such as <code>disabled</code> are forwarded.
            </p>
            <CodeView
                code={`<Slider
    label="Disabled slider"
    defaultValue={30}
    disabled
/>
<Slider
    label="Left label"
    defaultValue={60}
    position="left"
    size="lg"
    height="10px"
/>`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <Slider
                    label="Disabled slider"
                    defaultValue={30}
                    disabled
                />
                <Slider
                    label="Left label"
                    defaultValue={60}
                    position="left"
                    size="lg"
                    height="10px"
                />
            </CodeView>

            <Title level={2}>Hidden label</Title>
            <p>
                Set <code>hideLabel</code> when the visible label should not be
                rendered. The label is still exposed to assistive technologies
                through <code>aria-label</code>.
            </p>
            <CodeView
                code={`<Slider
    label="Brightness"
    defaultValue={80}
    hideLabel
/>`}
            >
                <Slider
                    label="Brightness"
                    defaultValue={80}
                    hideLabel
                />
            </CodeView>

            <ComponentApi elements={sliderApi} />
            <ComponentAccessibility elements={sliderApi.accessibility} />
        </PageScroll>
    );
}
