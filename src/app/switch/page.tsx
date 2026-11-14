"use client";

import { useState } from "react";

import CodeView from "@/components/CodeView";
import ComponentAccessibility from "@/components/ComponentAccessibility";
import ComponentApi from "@/components/ComponentApi";
import PageScroll from "@/components/PageScroll";
import Title from "@/components/Title";
import Switch from "@/components/ui/switch/Switch";
import switchApi from "@/data/switch.json";

export default function SwitchPage() {
    const [enabled, setEnabled] = useState(false);
    const [notifications, setNotifications] = useState(true);

    return (
        <PageScroll
            name={switchApi.name}
            link={switchApi.source}
        >
            <Title level={1}>Switch</Title>
            <p>
                A switch represents an on/off setting. It uses a native checkbox
                with <code>role=&quot;switch&quot;</code> and supports labels,
                state text, tooltips, and custom colors.
            </p>

            <Title level={2}>Basic switch</Title>
            <p>
                Use <code>checked</code> with <code>onChange</code> for a
                controlled switch. The switch can be positioned on the left or
                right of its label.
            </p>
            <CodeView
                code={`const [enabled, setEnabled] = useState(false);

<Switch
    label="Enable feature"
    checked={enabled}
    onChange={(event) => setEnabled(event.target.checked)}
/>
<Switch
    label="Enable notifications"
    position="right"
    defaultChecked
/>`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <Switch
                    label="Enable feature"
                    checked={enabled}
                    onChange={(event) => setEnabled(event.target.checked)}
                />
                <Switch
                    label="Enable notifications"
                    position="right"
                    checked={notifications}
                    onChange={(event) => setNotifications(event.target.checked)}
                />
            </CodeView>

            <Title level={2}>State labels</Title>
            <p>
                Use <code>values</code> to display text for the current state.
                Both <code>on</code> and <code>off</code> values are required.
            </p>
            <CodeView
                code={`<Switch
    label="Automatic updates"
    defaultChecked
    values={{ on: "On", off: "Off" }}
/>`}
            >
                <Switch
                    label="Automatic updates"
                    defaultChecked
                    values={{ on: "On", off: "Off" }}
                />
            </CodeView>

            <Title level={2}>Required and disabled states</Title>
            <p>
                Native <code>required</code> and <code>disabled</code> states
                are forwarded to the checkbox. A required switch uses the
                required state styling.
            </p>
            <CodeView
                code={`<Switch
    label="Accept the terms"
    required
/>
<Switch
    label="Feature unavailable"
    checked
    disabled
/>`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <Switch
                    label="Accept the terms"
                    required
                />
                <Switch
                    label="Feature unavailable"
                    checked
                    disabled
                />
            </CodeView>

            <Title level={2}>Tooltips and colors</Title>
            <p>
                A tooltip can be a single string or an object with separate{" "}
                <code>on</code> and <code>off</code> messages. Use{" "}
                <code>colors</code> to set the thumb color for the on and off
                states.
            </p>
            <CodeView
                code={`<Switch
    label="Custom setting"
    tooltip={{
        on: "The setting is enabled",
        off: "The setting is disabled",
    }}
    colors={["#18864b", "#9b2c2c"]}
/>`}
            >
                <Switch
                    label="Custom setting"
                    tooltip={{
                        on: "The setting is enabled",
                        off: "The setting is disabled",
                    }}
                    colors={["#18864b", "#9b2c2c"]}
                />
            </CodeView>

            <Title level={2}>Hidden label</Title>
            <p>
                Set <code>hideLabel</code> when the visible label should not be
                rendered. The label is still exposed as the switch&apos;s{" "}
                <code>aria-label</code>; provide a tooltip when visual context
                is useful.
            </p>
            <CodeView
                code={`<Switch
    label="Sync data"
    hideLabel
    tooltip="Toggle data synchronization"
/>`}
            >
                <Switch
                    label="Sync data"
                    hideLabel
                    tooltip="Toggle data synchronization"
                />
            </CodeView>

            <ComponentApi elements={switchApi} />
            <ComponentAccessibility elements={switchApi.accessibility} />
        </PageScroll>
    );
}
