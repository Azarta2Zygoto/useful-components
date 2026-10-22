"use client";

import { useState } from "react";

import Accordeon from "@/components/accordeon/accordeon";
import Button from "@/components/button/button";

export default function AccordeonPage() {
    const [openSimple, setOpenSimple] = useState(false);
    const [openSimple2, setOpenSimple2] = useState(false);

    return (
        <main>
            <h1>Accordeon</h1>
            <p>An accordeon allows to hide then show content.</p>

            <h2>Basic Accordeon</h2>
            <p>The most basic accordeon is control outside of the component</p>
            <div
                className="inner-component"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <Button
                    onClick={() => setOpenSimple(!openSimple)}
                    width={150}
                >
                    {openSimple ? "Close Accordeon" : "Open Accordeon"}
                </Button>
                <Accordeon
                    open={openSimple}
                    variant="primary"
                >
                    <div style={{ padding: "1rem" }}>
                        <p>This is the content of the accordeon.</p>
                        <p>You can put any JSX element here.</p>
                    </div>
                </Accordeon>
            </div>
            <h2>Other variant</h2>
            <p>There is another variant of the accordeon with less style.</p>
            <div className="inner-component">
                <Button
                    onClick={() => setOpenSimple2(!openSimple2)}
                    width={150}
                >
                    {openSimple2 ? "Close Accordeon" : "Open Accordeon"}
                </Button>
                <Accordeon
                    title="Simple Accordeon variant"
                    variant="secondary"
                    open={openSimple2}
                    height={80}
                >
                    <p>This is the content of the accordeon.</p>
                    <p>You can put any JSX element here.</p>
                </Accordeon>
                <Accordeon
                    title="Simple Accordeon variant"
                    open={openSimple2}
                    height={80}
                >
                    <p>This is the content of the accordeon.</p>
                    <p>You can put any JSX element here.</p>
                </Accordeon>
            </div>
            <h2>Icon accordeon</h2>
            <p>The accordeon can also be controlled by itself.</p>
            <div className="inner-component">
                <Accordeon
                    header="Icon View Accordeon"
                    view="icon"
                    variant="primary"
                >
                    <div style={{ padding: "1rem" }}>
                        <p>This is an accordeon with icon view.</p>
                        <p>Click the icon to toggle.</p>
                    </div>
                </Accordeon>
                <Accordeon
                    header={
                        <span style={{ fontWeight: "bold" }}>
                            Icon View Accordeon with another variant
                        </span>
                    }
                    view="icon"
                >
                    <div>
                        <p>
                            This accordeon has less style to fit it more easily
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
                </Accordeon>
            </div>
            <h2>Card accordeon</h2>
            <p>
                The accordeon can also have a card view. You can click wherever
                on the card, it will open the accordeon.
            </p>
            <div className="inner-component">
                <Accordeon
                    header="Card View Accordeon"
                    view="card"
                    variant="primary"
                >
                    <div>
                        <p>This is an accordeon with card view.</p>
                    </div>
                </Accordeon>
                <Accordeon
                    header="Card View Accordeon"
                    view="card"
                >
                    <div>
                        <p>This is another accordeon with card view.</p>
                        <p>It has a different style.</p>
                    </div>
                </Accordeon>
            </div>
        </main>
    );
}
