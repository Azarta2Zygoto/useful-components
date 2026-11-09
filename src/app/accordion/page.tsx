"use client";

import { useState } from "react";

import Accordion from "@ui/accordion/Accordion";
import Button from "@ui/button/Button";

export default function AccordionPage() {
    const [openSimple, setOpenSimple] = useState(false);
    const [openSimple2, setOpenSimple2] = useState(false);

    return (
        <main>
            <h1>Accordion</h1>
            <p>An accordion allows to hide then show content.</p>

            <h2>Basic Accordion</h2>
            <p>The most basic accordion is control outside of the component</p>
            <div
                className="code-view"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <Button onClick={() => setOpenSimple(!openSimple)}>
                    {openSimple ? "Close Accordion" : "Open Accordion"}
                </Button>
                <Accordion open={openSimple}>
                    <p>This is the content of the accordion.</p>
                    <p>You can put any JSX element here.</p>
                </Accordion>
            </div>
            <h2>Other variant</h2>
            <p>There is another variant of the accordion with less style.</p>
            <div className="code-view">
                <Button onClick={() => setOpenSimple2(!openSimple2)}>
                    {openSimple2 ? "Close Accordion" : "Open Accordion"}
                </Button>
                <Accordion
                    title="Simple Accordion variant"
                    variant="left"
                    open={openSimple2}
                >
                    <p>This is the content of the accordion.</p>
                    <p>You can put any JSX element here.</p>
                </Accordion>
                <Accordion
                    title="Simple Accordion variant"
                    variant="none"
                    open={openSimple2}
                >
                    <p>This is the content of the accordion.</p>
                    <p>You can put any JSX element here.</p>
                </Accordion>
            </div>
            <h2>Icon accordion</h2>
            <p>The accordion can also be controlled by itself.</p>
            <div className="code-view">
                <Accordion
                    header="Icon View Accordion"
                    view="icon"
                >
                    <p>This is an accordion with icon view.</p>
                    <p>Click the icon to toggle.</p>
                </Accordion>
                <Accordion
                    header={
                        <span style={{ fontWeight: "bold" }}>
                            Icon View Accordion with another variant
                        </span>
                    }
                    variant="left"
                    view="icon"
                >
                    <div>
                        <p>
                            This accordion has less style to fit it more easily
                            in our website.
                        </p>
                        <p>It only has a left border</p>
                        <Button
                            variant="primary"
                            onClick={() => alert("Hello")}
                        >
                            Click me
                        </Button>
                    </div>
                </Accordion>
            </div>
            <h2>Card accordion</h2>
            <p>
                The accordion can also have a card view. You can click wherever
                on the card, it will open the accordion.
            </p>
            <div className="code-view">
                <Accordion
                    header="Card View Accordion"
                    view="card"
                >
                    <p>This is an accordion with card view.</p>
                </Accordion>
                <Accordion
                    header="Card View Accordion"
                    view="card"
                    variant="none"
                >
                    <p>This is another accordion with card view.</p>
                    <p>It has a different style.</p>
                </Accordion>
                <Accordion
                    header="Accordion on an accordion"
                    view="card"
                    variant="none"
                >
                    <Accordion
                        header="Card View Accordion"
                        view="card"
                    >
                        <p>This is an accordion with card view.</p>
                    </Accordion>
                </Accordion>
            </div>
        </main>
    );
}
