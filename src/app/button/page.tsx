"use client";

import { useState } from "react";

import Github from "@ui/assets/github.svg";
import Button from "@ui/button/Button";
import { useTooltip } from "@ui/tooltip/useTooltip.hook";

import PageScroll from "@/components/PageScroll";
import Title from "@/components/Title";
import WarningFrame from "@/components/frames/WarningFrame";
import Icon from "@/components/ui/icon/Icon";

export default function ButtonPage() {
    const tooltip = useTooltip({ content: "Button tooltip" });
    const [isActives, setIsActives] = useState<boolean[]>([
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
            <Title level={2}>API</Title>
            <p>
                <code>Button</code> extends the native{" "}
                <code>ButtonHTMLAttributes&lt;HTMLButtonElement&gt;</code>{" "}
                properties.
            </p>
            <ul>
                <li>
                    <code>variant</code>: <code>primary</code>,{" "}
                    <code>secondary</code> (default), <code>danger</code>,{" "}
                    <code>transparent</code> or <code>success</code>.
                </li>
                <li>
                    <code>loading</code>: disables the button and sets{" "}
                    <code>aria-busy=&quot;true&quot;</code>.
                </li>
                <li>
                    <code>ripple</code>: enables or disables the ripple effect.
                    It is enabled by default except for the{" "}
                    <code>transparent</code> variant.
                </li>
                <li>
                    <code>pressed</code>: exposes the active state through{" "}
                    <code>aria-pressed</code>.
                </li>
                <li>
                    <code>tooltip</code>: set to <code>&quot;true&quot;</code>{" "}
                    to enable the CSS tooltip. Its text comes from the{" "}
                    <code>aria-label</code>.
                </li>
                <li>
                    <code>width</code>: a number in pixels or any valid CSS
                    width value.
                </li>
                <li>
                    <code>type</code>: defaults to <code>button</code>.
                </li>
            </ul>
            <Title level={2}>Basic Buttons</Title>
            <div className="code-view">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
                <Button ripple={false}>Without ripple</Button>
                <Button variant="primary">Primary in a long button</Button>
                <Button>
                    This is a very long button with a text that exceeds the
                    width of the button and is very long to see how the button
                    behaves with a very long text.
                </Button>
            </div>
            <Title level={3}>Disabled Buttons</Title>
            <div className="code-view">
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
            </div>
            <Title level={3}>Loading Buttons</Title>
            <p>
                This is useful when you are waiting before being able to do an
                action. The button becomes disabled, sets{" "}
                <code>aria-busy=&quot;true&quot;</code>, and uses the loading
                cursor.
            </p>
            <div className="code-view">
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
            </div>
            <Title level={3}>Buttons with tooltip</Title>
            <p>
                You can easily add a tooltip to a button by using the useTooltip
                hook. The tooltip will be shown on hover and focus. You can also
                use the simple tooltip API made entirely in CSS.
            </p>
            <div className="code-view">
                <Button
                    variant="primary"
                    tooltip={true}
                    aria-label="CSS Tooltip on primary button"
                >
                    Primary
                </Button>
                <Button
                    variant="primary"
                    {...tooltip}
                >
                    Primary
                </Button>
            </div>
            <Title level={2}>Icon Buttons</Title>
            <p>
                An icon button is just the use of a button with an icon with it.
                You don&apos;t need to put an aria-label on the icon but on the
                button !
            </p>
            <div className="code-view">
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
                    variant="transparent"
                    title="transparent"
                    aria-label="GitHub transparent"
                >
                    <Icon icon={Github} />
                </Button>
                <Button
                    variant="transparent"
                    title="transparent with ripple"
                    aria-label="GitHub transparent with ripple"
                    ripple
                >
                    <Icon icon={Github} />
                </Button>
            </div>
            <Title level={2}>Buttons with icon</Title>
            <div className="code-view">
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
                <Button variant="danger">
                    <Icon icon={Github} />
                    C&apos;est un bouton vraiment très long avec un texte qui
                    dépasse la largeur du bouton et qui est très long pour voir
                    comment le bouton se comporte avec un texte très long et un
                    icône à côté.
                </Button>
            </div>
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
            <div className="code-view">
                <Button
                    variant="primary"
                    pressed={isActives[0]}
                    onClick={() => handleButtonClick(0)}
                    data-uc-tooltip="This is a primary button that can be pressed"
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
                    variant="transparent"
                    pressed={isActives[3]}
                    onClick={() => handleButtonClick(3)}
                >
                    {isActives[3]
                        ? "Transparent active"
                        : "Transparent inactive"}
                </Button>
            </div>
        </PageScroll>
    );
}
