"use client";

import { useState } from "react";

import Accordion from "@ui/accordion/Accordion";
import Checkbox from "@ui/checkbox/Checkbox";

import Input from "@/components/ui/input/InputField";

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
            <h2>Input</h2>
            <div className="code-view">
                <Input
                    label="Text input"
                    placeholder="Enter text"
                    floatingLabel
                />
            </div>
            <h2>Checkbox</h2>
            <div className="code-view">
                <Checkbox
                    label="Checkbox"
                    checked={isSelected}
                    onChange={(e) => setIsSelected(e.target.checked)}
                />
            </div>
            <h2>Accordion</h2>
            <div className="code-view">
                <Accordion
                    header="Accordion header"
                    view="card"
                >
                    <p>This is the content of the accordion.</p>
                    <p>You can put any JSX element here.</p>
                </Accordion>
            </div>
            <span style={{ backgroundColor: "var(--theme-main)" }}>
                main-theme
            </span>
            <span style={{ backgroundColor: "var(--theme-main-hard)" }}>
                main-theme-hard
            </span>
            <span style={{ backgroundColor: "var(--theme-main-mid)" }}>
                main-theme-mid
            </span>
            <span style={{ backgroundColor: "var(--theme-main-light)" }}>
                main-theme-light
            </span>
            <span style={{ backgroundColor: "var(--theme-main-minor)" }}>
                main-theme-minor
            </span>
            <span style={{ backgroundColor: "var(--theme-main-few)" }}>
                main-theme-few
            </span>
            <span style={{ backgroundColor: "var(--add-few-color)" }}>
                add-hard-color
            </span>
        </main>
    );
}
