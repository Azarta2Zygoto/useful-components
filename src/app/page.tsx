"use client";

import { useState } from "react";

import Accordion from "@ui/accordion/Accordion";
import Checkbox from "@ui/checkbox/Checkbox";
import * as Input from "@ui/input";

export default function HomePage() {
    const [isSelected, setIsSelected] = useState<boolean>(false);

    return (
        <main>
            <h1>Welcome to the Component Library !</h1>
            <p>
                Explore a variety of reusable components designed to enhance
                your web applications.
                <br />
                The library is made by an amateur to learn JS, CSS and HTML
                using the framework React.
                <br />
                Feel free to browse through the components.
                <br />
                However there is no plain to make them public as they are
                clearly not professionaly made.
            </p>
            <div
                className="component-box"
                style={{ width: "300px", gap: "1rem" }}
            >
                <h2>Input</h2>
                <Input.TextField
                    label="Text input"
                    placeholder="Enter text"
                />
                <Input.NumberField
                    label="Number input"
                    variant="underlined"
                    placeholder="Enter a number"
                />
                <Input.TextField
                    label="Text input with a floating label"
                    placeholder="Enter text"
                    floatingLabel
                />
            </div>
            <div
                className="component-box"
                style={{ width: "300px" }}
            >
                <h2>Checkbox</h2>
                <Checkbox
                    label="Checkbox"
                    checked={isSelected}
                    onChange={(e) => setIsSelected(e.target.checked)}
                />
            </div>
            <div
                className="component-box"
                style={{ width: "300px" }}
            >
                <h2>Accordion</h2>
                <Accordion
                    header="Accordion header"
                    view="card"
                    variant="primary"
                >
                    <p>This is the content of the accordion.</p>
                    <p>You can put any JSX element here.</p>
                </Accordion>
            </div>
        </main>
    );
}
