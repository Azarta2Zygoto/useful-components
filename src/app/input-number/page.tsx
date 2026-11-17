"use client";

import { useState } from "react";

import CaretDownIcon from "@ui/assets/icons/caret-down.svg";

import CodeView from "@/components/CodeView";
import ComponentAccessibility from "@/components/ComponentAccessibility";
import ComponentApi from "@/components/ComponentApi";
import PageScroll from "@/components/PageScroll";
import Title from "@/components/Title";
import Input from "@/components/ui/input/number-input/NumberField";
import numberInputApi from "@/documentation/input-number.json";

export default function NumberInputPage() {
    const [value, setValue] = useState<number | null>(50);

    return (
        <PageScroll
            name={numberInputApi.name}
            link={numberInputApi.source}
        >
            <Title level={1}>Number Field</Title>
            <p>
                <code>NumberField</code> is a labeled numeric field built on the
                native <code>input type=&quot;number&quot;</code>. It adds
                optional step controls, validation feedback, labels, and icon
                adornments.
            </p>

            <Title level={2}>Basic number field</Title>
            <p>
                Use <code>defaultValue</code> for an uncontrolled field. The
                step controls are enabled by default and follow the native{" "}
                <code>step</code>, <code>min</code>, and <code>max</code>{" "}
                constraints.
            </p>
            <CodeView
                code={`<NumberField
    label="Quantity"
    placeholder="Enter a quantity"
    defaultValue={50}
    step={0.1}
    min={0}
    max={100}
/>`}
            >
                <Input
                    label="Quantity"
                    placeholder="Enter a quantity"
                    defaultValue={50}
                    step={0.1}
                    min={0}
                    max={100}
                />
            </CodeView>

            <Title level={2}>Controlled value</Title>
            <p>
                The <code>value</code> prop accepts a number or{" "}
                <code>null</code>. Use <code>onValue</code> to receive the
                parsed number; it receives <code>null</code> when the field is
                empty.
            </p>
            <CodeView
                code={`const [value, setValue] = useState<number | null>(50);

<NumberField
    label="Controlled value"
    value={value}
    onValue={setValue}
/>`}
            >
                <Input
                    label="Controlled value"
                    value={value}
                    onValue={setValue}
                />
            </CodeView>

            <Title level={2}>Step controls</Title>
            <p>
                The increment and decrement controls are shown by default. Set{" "}
                <code>hasStep=false</code> to hide them while keeping the native
                numeric input behavior.
            </p>
            <CodeView
                code={`<NumberField
    label="Without step controls"
    defaultValue={10}
    step={1}
    hasStep={false}
/>`}
            >
                <Input
                    label="Without step controls"
                    defaultValue={10}
                    step={1}
                    hasStep={false}
                />
            </CodeView>

            <Title level={2}>Variants, sizes, and labels</Title>
            <p>
                Choose the <code>outlined</code> (default) or{" "}
                <code>underlined</code> variant. Available sizes are{" "}
                <code>sm</code>, <code>md</code> (default), and <code>lg</code>.
                Labels can float or be placed on the left.
            </p>
            <CodeView
                code={`<NumberField
    label="Floating number"
    floatingLabel
    variant="underlined"
    size="lg"
/>
<NumberField
    label="Left label"
    labelPosition="left"
    size="sm"
/>`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <Input
                    label="Floating number"
                    floatingLabel
                    variant="underlined"
                    size="lg"
                />
                <Input
                    label="Left label"
                    labelPosition="left"
                    size="sm"
                />
            </CodeView>

            <Title level={2}>Validation and states</Title>
            <p>
                Native properties such as <code>required</code>,{" "}
                <code>disabled</code>, and <code>readOnly</code> are forwarded
                to the input. Use <code>error</code> to display validation
                feedback.
            </p>
            <CodeView
                code={`<NumberField
    label="Required number"
    required
    error="A value is required"
/>
<NumberField
    label="Read-only number"
    value={844}
    readOnly
/>
<NumberField
    label="Disabled number"
    value={10}
    disabled
/>`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <Input
                    label="Required number"
                    required
                    error="A value is required"
                />
                <Input
                    label="Read-only number"
                    value={844}
                    readOnly
                />
                <Input
                    label="Disabled number"
                    value={10}
                    disabled
                />
            </CodeView>

            <Title level={2}>Icon adornments</Title>
            <p>
                Pass an SVG component to <code>iconLeft</code> or{" "}
                <code>iconRight</code> to add a visual adornment.
            </p>
            <CodeView
                code={`<NumberField
    label="Number with adornments"
    iconLeft={CaretDownIcon}
    iconRight={CaretDownIcon}
/>`}
            >
                <Input
                    label="Number with adornments"
                    iconLeft={CaretDownIcon}
                    iconRight={CaretDownIcon}
                />
            </CodeView>

            <ComponentApi elements={numberInputApi} />
            <ComponentAccessibility elements={numberInputApi.accessibility} />
        </PageScroll>
    );
}
