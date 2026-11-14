"use client";

import { useState } from "react";

import Checkbox from "@ui/checkbox/Checkbox";

import CodeView from "@/components/CodeView";
import ComponentAccessibility from "@/components/ComponentAccessibility";
import ComponentApi from "@/components/ComponentApi";
import PageScroll from "@/components/PageScroll";
import Title from "@/components/Title";
import checkboxApi from "@/data/checkbox.json";

export default function CheckboxPage() {
    const [checked, setChecked] = useState(false);
    const [items, setItems] = useState([true, false, false]);
    const allChecked = items.every(Boolean);
    const someChecked = items.some(Boolean);

    const handleHeart = (isChecked: boolean) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="red"
            viewBox="0 0 16 16"
        >
            <path
                fillRule={isChecked ? "evenodd" : undefined}
                d={
                    isChecked
                        ? "M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                        : "m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
                }
            />
        </svg>
    );

    const toggleItem = (index: number) => {
        setItems((previous) =>
            previous.map((item, itemIndex) =>
                itemIndex === index ? !item : item,
            ),
        );
    };

    return (
        <PageScroll
            name={checkboxApi.name}
            link={checkboxApi.source}
        >
            <Title level={1}>Checkbox</Title>
            <p>
                A checkbox lets users select or clear an option. It supports
                native checkbox attributes as well as controlled, uncontrolled,
                indeterminate, and custom-checkmark states.
            </p>

            <Title level={2}>Basic checkbox</Title>
            <p>
                Provide a required <code>label</code>. Use <code>checked</code>{" "}
                with <code>onChange</code> for a controlled checkbox, or{" "}
                <code>defaultChecked</code> for an uncontrolled checkbox.
            </p>
            <CodeView
                code={`<Checkbox
    label="Accept the terms"
    checked={checked}
    onChange={(event) => setChecked(event.target.checked)}
/>`}
            >
                <Checkbox
                    label="Accept the terms"
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                />
            </CodeView>

            <Title level={2}>Indeterminate checkbox</Title>
            <p>
                Use <code>indeterminate</code> when a parent option represents a
                partially selected group.
            </p>
            <CodeView
                code={`<Checkbox
    label="Select all"
    checked={allChecked}
    indeterminate={someChecked && !allChecked}
    onChange={(event) =>
        setItems(items.map(() => event.target.checked))
    }
/>
<Checkbox
    label="First item"
    checked={items[0]}
    onChange={() => toggleItem(0)}
/>`}
            >
                <Checkbox
                    label="Select all"
                    checked={allChecked}
                    indeterminate={someChecked && !allChecked}
                    onChange={(event) =>
                        setItems(items.map(() => event.target.checked))
                    }
                />
                <Checkbox
                    label="First item"
                    checked={items[0]}
                    onChange={() => toggleItem(0)}
                />
                <Checkbox
                    label="Second item"
                    checked={items[1]}
                    onChange={() => toggleItem(1)}
                />
                <Checkbox
                    label="Third item"
                    checked={items[2]}
                    onChange={() => toggleItem(2)}
                />
            </CodeView>

            <Title level={2}>Options</Title>
            <p>
                The checkbox can be positioned on the right, resized, marked as
                required, disabled, or displayed without its visible label.
            </p>
            <CodeView
                code={`<Checkbox
    label="Required option"
    position="right"
    size="lg"
    required
/>
<Checkbox
    label="Disabled option"
    disabled
/>
<Checkbox
    label="Hidden visual label"
    hideLabel
    tooltip="This option has a hidden visual label"
/>`}
            >
                <Checkbox
                    label="Required option"
                    position="right"
                    size="lg"
                    required
                />
                <Checkbox
                    label="Disabled option"
                    disabled
                />
                <Checkbox
                    label="Hidden visual label"
                    hideLabel
                    tooltip="This option has a hidden visual label"
                />
            </CodeView>

            <Title level={2}>Custom checkmark</Title>
            <p>
                Pass a React node or a function receiving the checked and
                indeterminate states through <code>checkmark</code>.
            </p>
            <CodeView
                code={`<Checkbox
    label="Favorite"
    checkmark={handleHeart}
/>`}
            >
                <Checkbox
                    label="Favorite"
                    checkmark={handleHeart}
                />
            </CodeView>

            <ComponentApi elements={checkboxApi} />
            <ComponentAccessibility elements={checkboxApi.accessibility} />
        </PageScroll>
    );
}
