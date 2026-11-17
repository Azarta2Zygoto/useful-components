"use client";

import { useState } from "react";

import MenuSelect from "@ui/menu-select/MenuSelect";
import type { MenuSelectOption } from "@ui/menu-select/menu-select.type";

import CodeView from "@/components/CodeView";
import ComponentAccessibility from "@/components/ComponentAccessibility";
import ComponentApi from "@/components/ComponentApi";
import PageScroll from "@/components/PageScroll";
import Title from "@/components/Title";
import menuSelectApi from "@/documentation/menu-select.json";

const options: MenuSelectOption[] = [
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "apple", label: "Apple" },
    { value: "grape", label: "Grape" },
];

export default function MenuSelectPage() {
    const [selectedOption, setSelectedOption] =
        useState<MenuSelectOption | null>(null);

    return (
        <PageScroll
            name={menuSelectApi.name}
            link={menuSelectApi.source}
        >
            <Title level={1}>Menu Select</Title>
            <p>
                <code>MenuSelect</code> is an accessible listbox component for
                choosing one option from a list. It supports controlled and
                uncontrolled values, field variants, labels, validation
                feedback, and keyboard navigation.
            </p>

            <Title level={2}>Basic menu select</Title>
            <p>
                Provide a <code>label</code> and an array of options. Each
                option must contain a unique <code>value</code> and a displayed{" "}
                <code>label</code>.
            </p>
            <CodeView
                code={`<MenuSelect
    label="Fruit"
    options={options}
/>`}
            >
                <MenuSelect
                    label="Fruit"
                    options={options}
                />
            </CodeView>

            <Title level={2}>Variants and sizes</Title>
            <p>
                Use the <code>outlined</code> (default) or{" "}
                <code>underlined</code> variant. Available sizes are{" "}
                <code>sm</code>, <code>md</code> (default), and <code>lg</code>.
            </p>
            <CodeView
                code={`<MenuSelect
    label="Outlined select"
    options={options}
    variant="outlined"
    size="md"
/>
<MenuSelect
    label="Underlined select"
    options={options}
    variant="underlined"
    size="lg"
/>`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <MenuSelect
                    label="Outlined select"
                    options={options}
                    variant="outlined"
                    size="md"
                />
                <MenuSelect
                    label="Underlined select"
                    options={options}
                    variant="underlined"
                    size="lg"
                />
            </CodeView>

            <Title level={2}>Labels and initial values</Title>
            <p>
                Set <code>floatingLabel</code> to place the label inside the
                field. Without a floating label, <code>labelPosition</code> can
                place the label on the top or left. Use{" "}
                <code>defaultValue</code> for an uncontrolled initial value.
            </p>
            <CodeView
                code={`<MenuSelect
    label="Floating label"
    options={options}
    floatingLabel
    defaultValue={options[0]}
/>
<MenuSelect
    label="Label on the left"
    options={options}
    labelPosition="left"
    defaultValue={options[1]}
/>`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <MenuSelect
                    label="Floating label"
                    options={options}
                    floatingLabel
                    defaultValue={options[0]}
                    width="150px"
                />
                <MenuSelect
                    label="Label on the left"
                    options={options}
                    labelPosition="left"
                    defaultValue={options[1]}
                />
            </CodeView>

            <Title level={2}>Controlled value and validation</Title>
            <p>
                Use <code>value</code> with <code>onValue</code> for a
                controlled menu select. Set <code>required</code> when a
                selection is mandatory and <code>error</code> to display
                validation feedback.
            </p>
            <CodeView
                code={`<MenuSelect
    label="Fruit"
    options={options}
    required
    value={selectedOption ?? undefined}
    error={!selectedOption ? "Choose a fruit" : undefined}
    onValue={setSelectedOption}
/>`}
            >
                <MenuSelect
                    label="Fruit"
                    options={options}
                    required
                    value={selectedOption ?? undefined}
                    error={!selectedOption ? "Choose a fruit" : undefined}
                    onValue={setSelectedOption}
                />
            </CodeView>

            <Title level={2}>States and custom text</Title>
            <p>
                Native button properties such as <code>disabled</code> are
                supported. Use <code>readOnly</code> to prevent changing the
                current selection, and <code>text</code> to customize the
                placeholder or empty-list message.
            </p>
            <CodeView
                code={`<MenuSelect
    label="Disabled select"
    options={options}
    defaultValue={options[2]}
    disabled
/>
<MenuSelect
    label="Read-only select"
    options={options}
    defaultValue={options[0]}
    readOnly
/>
<MenuSelect
    label="No available fruit"
    options={[]}
    text={{ noOptions: "No fruit available" }}
/>`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <MenuSelect
                    label="Disabled select"
                    options={options}
                    defaultValue={options[2]}
                    disabled
                />
                <MenuSelect
                    label="Read-only select"
                    options={options}
                    defaultValue={options[0]}
                    readOnly
                />
                <MenuSelect
                    label="No available fruit"
                    options={[]}
                    text={{ noOptions: "No fruit available" }}
                />
            </CodeView>

            <ComponentApi elements={menuSelectApi} />
            <ComponentAccessibility elements={menuSelectApi.accessibility} />
        </PageScroll>
    );
}
