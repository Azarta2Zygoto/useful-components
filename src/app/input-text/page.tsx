"use client";

import { useState } from "react";

import CaretDownIcon from "@ui/assets/icons/caret-down.svg";

import CodeView from "@/components/CodeView";
import ComponentAccessibility from "@/components/ComponentAccessibility";
import ComponentApi from "@/components/ComponentApi";
import PageScroll from "@/components/PageScroll";
import Title from "@/components/Title";
import InfoFrame from "@/components/frames/InfoFrame";
import InputField from "@/components/ui/input/InputField";
import inputApi from "@/data/input-text.json";

export default function InputPage() {
    const [value, setValue] = useState("");

    return (
        <PageScroll>
            <Title level={1}>Text Input</Title>
            <p>
                <code>InputField</code> is a labeled text field built on top of
                the native HTML input. It supports native input attributes,
                validation feedback, visual variants, labels, and icon
                adornments.
            </p>
            <InfoFrame>
                <p>
                    The component does not manage a value internally when it is
                    controlled. Use <code>onValue</code> to receive the current
                    string value directly.
                </p>
            </InfoFrame>

            <Title level={2}>Basic input</Title>
            <p>
                The <code>label</code> prop is required and is associated with
                the native input automatically.
            </p>
            <CodeView
                code={`<InputField
    label="Your name"
    placeholder="Enter your name"
/>`}
            >
                <InputField
                    label="Your name"
                    placeholder="Enter your name"
                />
            </CodeView>

            <Title level={2}>Variants and sizes</Title>
            <p>
                Use the <code>outlined</code> (default) or{" "}
                <code>underlined</code> variant. Available sizes are{" "}
                <code>sm</code>, <code>md</code> (default), and <code>lg</code>.
            </p>
            <CodeView
                code={`<InputField
    label="Outlined input"
    variant="outlined"
    size="md"
/>
<InputField
    label="Underlined input"
    variant="underlined"
    size="lg"
/>`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <InputField
                    label="Outlined input"
                    variant="outlined"
                    size="md"
                />
                <InputField
                    label="Underlined input"
                    variant="underlined"
                    size="lg"
                />
            </CodeView>

            <Title level={2}>Floating and positioned labels</Title>
            <p>
                Set <code>floatingLabel</code> to move the label into the field
                until it is focused or contains a value. Without a floating
                label, use <code>labelPosition</code> to place the label on the
                top or left.
            </p>
            <CodeView
                code={`<InputField
    label="Floating label"
    placeholder="Enter text"
    floatingLabel
/>
<InputField
    label="Label on the left"
    placeholder="Enter text"
    labelPosition="left"
/>`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <InputField
                    label="Floating label"
                    placeholder="Enter text"
                    floatingLabel
                />
                <InputField
                    label="Label on the left"
                    placeholder="Enter text"
                    labelPosition="left"
                />
            </CodeView>

            <Title level={2}>Controlled value and validation</Title>
            <p>
                The input accepts native validation attributes such as{" "}
                <code>required</code> and <code>type</code>. Use{" "}
                <code>error</code> to display a message and mark the field as
                invalid.
            </p>
            <CodeView
                code={`<InputField
    label="Email"
    type="email"
    required
    value={value}
    error={!value ? "Email is required" : undefined}
    onValue={setValue}
/>`}
            >
                <InputField
                    label="Email"
                    type="email"
                    required
                    value={value}
                    error={!value ? "Email is required" : undefined}
                    onValue={setValue}
                />
            </CodeView>

            <Title level={2}>States and adornments</Title>
            <p>
                Native <code>disabled</code> and <code>readOnly</code> states
                are supported. SVG components can be passed as{" "}
                <code>iconLeft</code> or <code>iconRight</code>.
            </p>
            <CodeView
                code={`<InputField
    label="Disabled input"
    value="Cannot edit this"
    disabled
/>
<InputField
    label="Read-only input"
    value="Read-only value"
    readOnly
/>
<InputField
    label="InputField with an icon"
    iconRight={CaretDownIcon}
/>`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <InputField
                    label="Disabled input"
                    value="Cannot edit this"
                    disabled
                />
                <InputField
                    label="Read-only input"
                    value="Read-only value"
                    readOnly
                />
                <InputField
                    label="InputField with an icon"
                    iconRight={CaretDownIcon}
                />
            </CodeView>

            <ComponentApi elements={inputApi} />
            <ComponentAccessibility elements={inputApi.accessibility} />
        </PageScroll>
    );
}
