"use client";

import { useState } from "react";

import Github from "@ui/assets/github.svg";
import Button from "@ui/button/Button";

import CodeView from "@/components/CodeView";
import ComponentAccessibility from "@/components/ComponentAccessibility";
import ComponentApi from "@/components/ComponentApi";
import PageScroll from "@/components/PageScroll";
import Title from "@/components/Title";
import WarningFrame from "@/components/frames/WarningFrame";
import Icon from "@/components/ui/icon/Icon";
import buttonApi from "@/data/button.json";

export default function ButtonPage() {
    const [isActives, setIsActives] = useState<boolean[]>([
        false,
        false,
        false,
        false,
        false,
    ]);

    const handleButtonClick = (index: number): void => {
        setIsActives((prevIsActives) => {
            const newIsActives = [...prevIsActives];
            newIsActives[index] = !newIsActives[index];
            return newIsActives;
        });
    };

    return (
        <PageScroll>
            <Title level={1}>Button</Title>
            <p>
                A button is a clickable element that allows the user to perform
                an action. It can be used to submit forms, trigger events, or
                navigate to different pages. Buttons can have different styles
                and states, such as primary, secondary, danger, disabled, and
                loading.
                <br />
                The component forwards native button attributes and adds state
                attributes such as <code>aria-busy</code> and{" "}
                <code>aria-pressed</code>. Add an accessible name with visible
                text or <code>aria-label</code>, especially for icon-only
                buttons.
            </p>
            <Title level={2}>Variants</Title>
            <p>
                There are 5 variants: <code>primary</code>,{" "}
                <code>secondary</code>, <code>danger</code>,{" "}
                <code>success</code>, and <code>transparent</code>. The default
                variant is <code>secondary</code>.
            </p>
            <CodeView
                code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>
<Button variant="transparent">Transparent</Button>`}
            >
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
                <Button variant="transparent">Transparent</Button>
            </CodeView>
            <Title level={3}>Size</Title>
            <p>
                There are 3 different sizes as most of the components:{" "}
                <code>small</code>, <code>medium</code>, and <code>large</code>.
                The default size is <code>medium</code>.
            </p>
            <CodeView
                code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
            >
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
            </CodeView>
            <Title level={3}>Ripple</Title>
            <p>
                You can control whether you want to have a ripple effect on the
                button or not. It is activated by default except in transparent
                mode.
            </p>
            <CodeView
                code={`<Button variant="primary" ripple={false}>Primary</Button>
<Button variant="secondary" ripple={false}>Secondary</Button>
<Button variant="danger" ripple={false}>Danger</Button>
<Button variant="success" ripple={false}>Success</Button>
<Button variant="transparent" ripple>Transparent</Button>`}
            >
                <Button
                    variant="primary"
                    ripple={false}
                >
                    Primary
                </Button>
                <Button
                    variant="secondary"
                    ripple={false}
                >
                    Secondary
                </Button>
                <Button
                    variant="danger"
                    ripple={false}
                >
                    Danger
                </Button>
                <Button
                    variant="success"
                    ripple={false}
                >
                    Success
                </Button>
                <Button
                    variant="transparent"
                    ripple
                >
                    Transparent
                </Button>
            </CodeView>
            <Title level={3}>Disabled</Title>
            <CodeView
                code={`<Button variant="primary" disabled>Primary</Button>
<Button variant="secondary" disabled>Secondary</Button>
<Button variant="danger" disabled>Danger</Button>
<Button variant="success" disabled>Success</Button>
<Button variant="transparent" disabled>Transparent</Button>`}
            >
                <Button
                    variant="primary"
                    disabled
                >
                    Primary
                </Button>
                <Button
                    variant="secondary"
                    disabled
                >
                    Secondary
                </Button>
                <Button
                    variant="danger"
                    disabled
                >
                    Danger
                </Button>
                <Button
                    variant="success"
                    disabled
                >
                    Success
                </Button>
                <Button
                    variant="transparent"
                    disabled
                >
                    Transparent
                </Button>
            </CodeView>
            <Title level={3}>Loading</Title>
            <p>
                This is useful when you are waiting before being able to do an
                action. The button becomes disabled, sets{" "}
                <code>aria-busy=&quot;true&quot;</code>, and uses the loading
                cursor.
            </p>
            <CodeView
                code={`<Button variant="primary" loading>Primary</Button>
<Button variant="secondary" loading>Secondary</Button>
<Button variant="danger" loading>Danger</Button>
<Button variant="success" loading>Success</Button>
<Button variant="transparent" loading>Transparent</Button>`}
            >
                <Button
                    variant="primary"
                    loading
                >
                    Primary
                </Button>
                <Button
                    variant="secondary"
                    loading
                >
                    Secondary
                </Button>
                <Button
                    variant="danger"
                    loading
                >
                    Danger
                </Button>
                <Button
                    variant="success"
                    loading
                >
                    Success
                </Button>
                <Button
                    variant="transparent"
                    loading
                >
                    Transparent
                </Button>
            </CodeView>
            <Title level={2}>Icon Buttons</Title>
            <p>
                An icon button is just the use of a button with an icon with it.
                You don&apos;t need to put an aria-label on the icon but on the
                button !
            </p>
            <CodeView
                code={`<Button variant="primary" title="primary" aria-label="GitHub primary">
    <Icon icon={Github} />
</Button>
<Button variant="secondary" title="secondary" aria-label="GitHub secondary">
    <Icon icon={Github} />
</Button>
<Button variant="danger" title="danger" aria-label="GitHub danger">
    <Icon icon={Github} />
</Button>
<Button variant="success" title="success" aria-label="GitHub success">
    <Icon icon={Github} />
</Button>
<Button variant="transparent" title="transparent" aria-label="GitHub transparent">
    <Icon icon={Github} />
</Button>`}
            >
                <Button
                    variant="primary"
                    title="primary"
                    aria-label="GitHub primary"
                >
                    <Icon icon={Github} />
                </Button>
                <Button
                    variant="secondary"
                    title="secondary"
                    aria-label="GitHub secondary"
                >
                    <Icon icon={Github} />
                </Button>
                <Button
                    variant="danger"
                    title="danger"
                    aria-label="GitHub danger"
                >
                    <Icon icon={Github} />
                </Button>
                <Button
                    variant="success"
                    title="success"
                    aria-label="GitHub success"
                >
                    <Icon icon={Github} />
                </Button>
                <Button
                    variant="transparent"
                    title="transparent"
                    aria-label="GitHub transparent"
                >
                    <Icon icon={Github} />
                </Button>
            </CodeView>
            <Title level={2}>Buttons with icon</Title>
            <p>
                There is no special props for it, just put an <code>Icon</code>{" "}
                in a button.
            </p>
            <CodeView
                code={`<Button variant="primary">
    <Icon icon={Github} />
    Github primary
</Button>
<Button variant="secondary">
    <Icon icon={Github} />
    Github secondary
</Button>
<Button variant="danger">
    Github danger
    <Icon icon={Github} />
</Button>`}
            >
                <Button variant="primary">
                    <Icon icon={Github} />
                    Github primary
                </Button>
                <Button variant="secondary">
                    <Icon icon={Github} />
                    Github secondary
                </Button>
                <Button variant="danger">
                    Github danger
                    <Icon icon={Github} />
                </Button>
            </CodeView>
            <Title level={2}>Buttons pressed</Title>
            <p>
                Those buttons have two states : active or inactive. By default
                they are inactive, so it is like a normal button. This is the
                parent component that will manage the state of the button.
            </p>
            <WarningFrame>
                <p>
                    If you want a checkbox or a radio button, you should use the
                    checkbox or radio button component and not try to make a
                    button behave like a checkbox or a radio button. This is not
                    the purpose of this component.
                </p>
            </WarningFrame>
            <CodeView
                code={`<Button pressed={isActive} onClick={() => setIsActive(!isActive)}>
    {isActive ? "Active" : "Inactive"}
</Button>`}
            >
                <Button
                    variant="primary"
                    pressed={isActives[0]}
                    onClick={() => handleButtonClick(0)}
                >
                    {isActives[0] ? "Primary active" : "Primary inactive"}
                </Button>
                <Button
                    variant="secondary"
                    pressed={isActives[1]}
                    onClick={() => handleButtonClick(1)}
                >
                    {isActives[1] ? "Secondary active" : "Secondary inactive"}
                </Button>
                <Button
                    variant="danger"
                    pressed={isActives[2]}
                    onClick={() => handleButtonClick(2)}
                >
                    {isActives[2] ? "Danger active" : "Danger inactive"}
                </Button>
                <Button
                    variant="success"
                    pressed={isActives[3]}
                    onClick={() => handleButtonClick(3)}
                >
                    {isActives[3] ? "Success active" : "Success inactive"}
                </Button>
                <Button
                    variant="transparent"
                    pressed={isActives[4]}
                    onClick={() => handleButtonClick(4)}
                >
                    {isActives[4]
                        ? "Transparent active"
                        : "Transparent inactive"}
                </Button>
            </CodeView>
            <ComponentApi elements={buttonApi} />
            <ComponentAccessibility elements={buttonApi.accessibility} />
        </PageScroll>
    );
}
