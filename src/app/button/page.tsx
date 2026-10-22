"use client";

import { type ReactNode, useState } from "react";

import Button from "@/components/button/button";
import Github from "@/components/icons/github";
import { useTooltip } from "@/components/tooltip/useTooltip";

export default function ButtonPage(): ReactNode {
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
        <main>
            <h1>Button</h1>
            <p>
                A button is a clickable element that allows the user to perform
                an action. It can be used to submit forms, trigger events, or
                navigate to different pages. Buttons can have different styles
                and states, such as primary, secondary, danger, disabled, and
                loading.
                <br />
                All accessibility attributes and visibility are automatically
                added to the button element. You can add your own attributes if
                you want to override the default ones.
            </p>
            <h2>Basic Buttons</h2>
            <div className="inner-component">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button ripple={false}>Without ripple</Button>
                <Button
                    width={300}
                    variant="primary"
                >
                    Primary in a long button
                </Button>
                <Button width={300}>
                    This is a very long button with a text that exceeds the
                    width of the button and is very long to see how the button
                    behaves with a very long text.
                </Button>
            </div>
            <h3>Disabled Buttons</h3>
            <div className="inner-component">
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
            <h3>Loading Buttons</h3>
            <p>
                This is useful when you are waiting before being able to do an
                action. The button will be disabled and a loading indicator will
                be shown on hover.
            </p>
            <div className="inner-component">
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
            <h3>Buttons with tooltip</h3>
            <p>
                You can easily add a tooltip to a button by using the useTooltip
                hook. The tooltip will be shown on hover and focus.
            </p>
            <div className="inner-component">
                <Button
                    variant="primary"
                    {...tooltip}
                >
                    Primary
                </Button>
            </div>
            <h2>Icon Buttons</h2>
            <p>
                An icon button is just the use of a button with an icon with it.
                You don&apos;t need to put an aria-label on the icon but on the
                button !
            </p>
            <div className="inner-component">
                <Button
                    variant="primary"
                    title="primary"
                    aria-label="GitHub primary"
                >
                    <Github></Github>
                </Button>
                <Button
                    variant="secondary"
                    title="secondary"
                    aria-label="GitHub secondary"
                >
                    <Github></Github>
                </Button>
                <Button
                    variant="danger"
                    title="danger"
                    aria-label="GitHub danger"
                >
                    <Github></Github>
                </Button>
                <Button
                    variant="transparent"
                    title="transparent"
                    aria-label="GitHub transparent"
                >
                    <Github></Github>
                </Button>
                <Button
                    variant="transparent"
                    title="transparent with ripple"
                    aria-label="GitHub transparent with ripple"
                    ripple
                >
                    <Github></Github>
                </Button>
            </div>
            <h2>Buttons with icon</h2>
            <div className="inner-component">
                <Button variant="primary">
                    <Github></Github>
                    Github primary
                </Button>
                <Button variant="secondary">
                    <Github></Github>
                    Github secondary
                </Button>
                <Button variant="danger">
                    Github danger
                    <Github></Github>
                </Button>
                <Button
                    variant="danger"
                    width={300}
                >
                    <Github></Github>
                    C&apos;est un bouton vraiment très long avec un texte qui
                    dépasse la largeur du bouton et qui est très long pour voir
                    comment le bouton se comporte avec un texte très long et un
                    icône à côté.
                </Button>
            </div>
            <h2>Buttons pressed</h2>
            <p>
                Those buttons have two states : active or inactive. By default
                they are inactive, so it is like a normal button. This is the
                parent component that will manage the state of the button.
                <br />
                Attention: if you want a checkbox or a radio button, you should
                use the checkbox or radio button component and not try to make a
                button behave like a checkbox or a radio button. This is not the
                purpose of this component.
            </p>
            <div className="inner-component">
                <Button
                    variant="primary"
                    pressed={isActives[0]}
                    onClick={() => handleButtonClick(0)}
                    data-tooltip="This is a primary button that can be pressed"
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
        </main>
    );
}
