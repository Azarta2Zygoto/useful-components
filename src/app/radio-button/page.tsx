"use client";

import { useState } from "react";

import CodeView from "@/components/CodeView";
import ComponentAccessibility from "@/components/ComponentAccessibility";
import ComponentApi from "@/components/ComponentApi";
import PageScroll from "@/components/PageScroll";
import Title from "@/components/Title";
import RadioGroup from "@/components/ui/radio-button/RadioGroup";
import radioButtonApi from "@/documentation/radio-button.json";

const options = [
    { value: "banana", label: "Banana", tooltip: "A yellow fruit" },
    { value: "apple", label: "Apple", tooltip: "A red or green fruit" },
    { value: "orange", label: "Orange", tooltip: "A citrus fruit" },
];

export default function RadioButtonPage() {
    const [selectedValue, setSelectedValue] = useState<string | null>("apple");
    const [deselectValue, setDeselectValue] = useState<string | null>(null);

    return (
        <PageScroll
            name={radioButtonApi.name}
            link={radioButtonApi.source}
        >
            <Title level={1}>Radio button</Title>
            <p>
                <code>RadioGroup</code> renders a group of native radio inputs
                where users can select one option. It adds a legend, layout
                controls, visual variants, validation feedback, and optional
                selection behavior.
            </p>

            <Title level={2}>Basic radio group</Title>
            <p>
                A group requires a unique <code>name</code>, a descriptive{" "}
                <code>label</code>, and an <code>elements</code> array. Use{" "}
                <code>value</code> and <code>onChange</code> to control the
                selected option.
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
    value={selectedValue}
    onChange={(event) => setSelectedValue(event.target.value)}
/>`}
            >
                <RadioGroup
                    name="fruit"
                    label="Choose a fruit"
                    elements={options}
                    value={selectedValue}
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
    value={selectedValue}
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
                    value={selectedValue}
                    onChange={(event) => setSelectedValue(event.target.value)}
                />
            </CodeView>

            <Title level={2}>
                Uncontrolled, required, and disabled options
            </Title>
            <p>
                Use <code>defaultValue</code> when the group should manage its
                own selection. Set <code>required</code> to require a selection.
                Disable the whole group with <code>disabled</code>, or disable
                individual options by adding <code>disabled: true</code> to an
                element.
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
    defaultValue="standard"
    required
/>`}
            >
                <RadioGroup
                    name="delivery"
                    label="Delivery method"
                    elements={[
                        { value: "standard", label: "Standard" },
                        { value: "large", label: "Large" },
                        {
                            value: "express",
                            label: "Express",
                            disabled: true,
                        },
                    ]}
                    required
                />
            </CodeView>

            <Title level={2}>Deselect and labels</Title>
            <p>
                Set <code>deselect</code> to allow users to clear the selected
                option by clicking it again. Use <code>onValue</code> to receive
                the selected string or <code>null</code> directly. Each element
                can use a React node as its <code>label</code>; otherwise its{" "}
                <code>value</code> is displayed.
            </p>
            <CodeView
                code={`<RadioGroup
    name="optional-choice"
    label="Optional choice"
    elements={[
        { value: "one", label: <strong>Choice one</strong> },
        { value: "two", label: "Choice two" },
    ]}
    value={deselectValue}
    onValue={setDeselectValue}
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
                    value={deselectValue}
                    onValue={setDeselectValue}
                    deselect
                />
            </CodeView>

            <Title level={2}>Validation, tooltips, and visual indicators</Title>
            <p>
                Set <code>error</code> to display validation feedback and mark
                the group invalid. Tooltips are configured on individual
                elements. The radio indicator is enabled by default; set{" "}
                <code>isIcon={"{false}"}</code> to render the options without
                it. Ripple feedback is enabled by default except for the{" "}
                <code>transparent</code> variant.
            </p>
            <CodeView
                code={`<RadioGroup
    name="tooltip-options"
    label="Choose an option"
    elements={[
        { value: "banana", label: "Banana", tooltip: "A yellow fruit" },
        { value: "apple", label: "Apple", tooltip: "A red or green fruit" },
    ]}
    value={selectedValue}
    onChange={(event) => setSelectedValue(event.target.value)}
    error={!selectedValue ? "Choose an option" : undefined}
/>`}
            >
                <RadioGroup
                    name="tooltip-options"
                    label="Choose an option"
                    elements={options}
                    value={selectedValue}
                    onChange={(event) => setSelectedValue(event.target.value)}
                    error={!selectedValue ? "Choose an option" : undefined}
                />
            </CodeView>

            <ComponentApi elements={radioButtonApi} />
            <ComponentAccessibility elements={radioButtonApi.accessibility} />
        </PageScroll>
    );
}
