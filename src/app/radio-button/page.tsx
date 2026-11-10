"use client";

import { useState } from "react";

import CodeView from "@/components/CodeView";
import ComponentAccessibility from "@/components/ComponentAccessibility";
import ComponentApi from "@/components/ComponentApi";
import PageScroll from "@/components/PageScroll";
import Title from "@/components/Title";
import RadioGroup from "@/components/ui/radio-button/RadioGroup";
import radioButtonApi from "@/data/radio-button.json";

const options = [
    { value: "banana", label: "Banana" },
    { value: "apple", label: "Apple" },
    { value: "orange", label: "Orange" },
];

export default function RadioButtonPage() {
    const [selectedValue, setSelectedValue] = useState<string | null>("apple");
    const [deselectValue, setDeselectValue] = useState<string | null>(null);

    return (
        <PageScroll>
            <Title level={1}>Radio button</Title>
            <p>
                <code>RadioGroup</code> renders a group of native radio inputs
                where users can select one option. It adds a legend, layout
                controls, visual variants, and optional selection behavior.
            </p>

            <Title level={2}>Basic radio group</Title>
            <p>
                A group requires a unique <code>name</code>, a descriptive{" "}
                <code>label</code>, and an <code>elements</code> array. Use{" "}
                <code>selectedValue</code> and <code>onChange</code> to control
                the selected option.
            </p>
            <CodeView
                code={`const options = [
    { value: "banana", label: "Banana" },
    { value: "apple", label: "Apple" },
    { value: "orange", label: "Orange" },
];

<RadioGroup
    name="fruit"
    label="Choose a fruit"
    elements={options}
    selectedValue={selectedValue}
    onChange={(event) => setSelectedValue(event.target.value)}
/>`}
            >
                <RadioGroup
                    name="fruit"
                    label="Choose a fruit"
                    elements={options}
                    selectedValue={selectedValue}
                    onChange={(event) => setSelectedValue(event.target.value)}
                />
            </CodeView>

            <Title level={2}>Variants and layout</Title>
            <p>
                Choose the <code>primary</code>, <code>secondary</code>{" "}
                (default), or <code>transparent</code> variant. Use{" "}
                <code>columns</code> to control how many options appear per row,
                and <code>size</code> for the shared small, medium, or large
                sizing.
            </p>
            <CodeView
                code={`<RadioGroup
    name="layout"
    label="Choose a layout"
    variant="primary"
    size="lg"
    columns={2}
    elements={options}
    selectedValue={selectedValue}
    onChange={(event) => setSelectedValue(event.target.value)}
/>`}
            >
                <RadioGroup
                    name="layout"
                    label="Choose a layout"
                    variant="primary"
                    size="lg"
                    columns={2}
                    elements={options}
                    selectedValue={selectedValue}
                    onChange={(event) => setSelectedValue(event.target.value)}
                />
            </CodeView>

            <Title level={2}>Required and disabled options</Title>
            <p>
                Set <code>required</code> to require a selection. Disable the
                whole group with <code>disabled</code>, or disable individual
                options by adding <code>disabled: true</code> to an element.
            </p>
            <CodeView
                code={`const optionsWithDisabled = [
    { value: "standard", label: "Standard" },
    { value: "express", label: "Express", disabled: true },
];

<RadioGroup
    name="delivery"
    label="Delivery method"
    elements={optionsWithDisabled}
    selectedValue={selectedValue}
    onChange={(event) => setSelectedValue(event.target.value)}
    required
/>`}
            >
                <RadioGroup
                    name="delivery"
                    label="Delivery method"
                    elements={[
                        { value: "standard", label: "Standard" },
                        {
                            value: "express",
                            label: "Express",
                            disabled: true,
                        },
                    ]}
                    selectedValue={selectedValue}
                    onChange={(event) => setSelectedValue(event.target.value)}
                    required
                />
            </CodeView>

            <Title level={2}>Deselect and labels</Title>
            <p>
                Set <code>deselect</code> to allow users to clear the selected
                option by clicking it again. Each element can use a React node
                as its <code>label</code>; otherwise its <code>value</code> is
                displayed.
            </p>
            <CodeView
                code={`<RadioGroup
    name="optional-choice"
    label="Optional choice"
    elements={[
        { value: "one", label: <strong>Choice one</strong> },
        { value: "two", label: "Choice two" },
    ]}
    selectedValue={selectedValue}
    onChange={(event) =>
        setSelectedValue(event.target.value || null)
    }
    deselect
/>`}
            >
                <RadioGroup
                    name="optional-choice"
                    label="Optional choice"
                    elements={[
                        {
                            value: "one",
                            label: <strong>Choice one</strong>,
                        },
                        { value: "two", label: "Choice two" },
                    ]}
                    selectedValue={deselectValue}
                    onChange={(event) =>
                        setDeselectValue(event.target.value || null)
                    }
                    deselect
                />
            </CodeView>

            <Title level={2}>Tooltips and visual indicators</Title>
            <p>
                Tooltips can expose each option&apos;s value on hover with{" "}
                <code>tooltip</code>. The radio indicator is enabled by default;
                set <code>isIcon={"{false}"}</code> to render the options
                without it. Ripple feedback is enabled by default except for the
                transparent variant.
            </p>
            <CodeView
                code={`<RadioGroup
    name="tooltip-options"
    label="Choose an option"
    elements={options}
    selectedValue={selectedValue}
    onChange={(event) => setSelectedValue(event.target.value)}
    tooltip
/>`}
            >
                <RadioGroup
                    name="tooltip-options"
                    label="Choose an option"
                    elements={options}
                    selectedValue={selectedValue}
                    onChange={(event) => setSelectedValue(event.target.value)}
                    tooltip
                />
            </CodeView>

            <ComponentApi elements={radioButtonApi} />
            <ComponentAccessibility elements={radioButtonApi.accessibility} />
        </PageScroll>
    );
}
