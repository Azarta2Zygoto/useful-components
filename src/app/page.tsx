"use client";

import { useState } from "react";

import Accordion from "@ui/accordion/Accordion";
import Button from "@ui/button/Button";
import MenuSelect from "@ui/menu-select/MenuSelect";
import type { MenuSelectOption } from "@ui/menu-select/menu-select.type";
import Slider from "@ui/slider/Slider";

import Footer from "@/components/Footer";
import ErrorFrame from "@/components/frames/ErrorFrame";
import WarningFrame from "@/components/frames/WarningFrame";
import InputField from "@/components/ui/input/InputField";

const componentOptions: MenuSelectOption[] = [
    { value: "buttons", label: "Buttons" },
    { value: "fields", label: "Form fields" },
    { value: "feedback", label: "Feedback" },
];

const themeColors = [
    ["Main", "var(--theme-main)"],
    ["Hard", "var(--theme-main-hard)"],
    ["Mid", "var(--theme-main-mid)"],
    ["Light", "var(--theme-main-light)"],
    ["Minor", "var(--theme-main-minor)"],
    ["Few", "var(--theme-main-few)"],
];

export default function HomePage() {
    const [selectedComponent, setSelectedComponent] =
        useState<MenuSelectOption | null>(null);
    const [spacing, setSpacing] = useState(60);

    return (
        <>
            <main>
                <section
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        padding: "clamp(2rem, 7vw, 6rem) 0 3rem",
                    }}
                >
                    <p
                        style={{
                            color: "var(--theme-main)",
                            fontWeight: "bold",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                        }}
                    >
                        Useful Components
                    </p>
                    <h1
                        style={{
                            marginTop: "0.5rem",
                            fontSize: "clamp(2.5rem, 6vw, 5rem)",
                            lineHeight: 1.05,
                        }}
                    >
                        Small building blocks for thoughtful interfaces.
                    </h1>
                    <p
                        style={{
                            maxWidth: "42rem",
                            marginTop: "1.5rem",
                            fontSize: "1.15rem",
                        }}
                    >
                        A personal React component library focused on reusable
                        interactions, native browser behavior, accessibility,
                        and a visual system that works in both light and dark
                        themes.
                    </p>
                </section>

                <section id="showcase">
                    <h2>Interactive showcase</h2>
                    <p>
                        The library is designed for composition. These examples
                        combine fields, controls, feedback, and layout variants
                        without requiring a UI framework dependency.
                    </p>
                    <div
                        className="code-view"
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(15rem, 1fr))",
                            alignItems: "start",
                            justifyContent: "stretch",
                            gap: "1.5rem",
                        }}
                    >
                        <MenuSelect
                            label="Component category"
                            options={componentOptions}
                            value={selectedComponent ?? undefined}
                            onValue={setSelectedComponent}
                            floatingLabel
                            width="15rem"
                        />
                        <InputField
                            label="Search components"
                            placeholder="Try a component name"
                            variant="underlined"
                        />
                        <Slider
                            label="Spacing"
                            min={0}
                            max={100}
                            value={spacing}
                            unit="%"
                            onValue={setSpacing}
                            tooltipThumb="always"
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.75rem",
                            margin: "1.5rem 0",
                        }}
                    >
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="success">Success</Button>
                        <Button variant="danger">Danger</Button>
                        <Button variant="transparent">Transparent</Button>
                    </div>
                </section>

                <section>
                    <h2>The project theme</h2>
                    <p>
                        The visual language uses semantic CSS variables instead
                        of hard-coded component colors. The same palette adapts
                        to light and dark color schemes, while borders, states,
                        and shadows remain consistent across components.
                    </p>
                    <ErrorFrame>
                        <p>
                            Almost no component redefines its own colors. Thus a{" "}
                            <code>globals.ccs</code> file defines everything.
                            This is a choice, that can make a bigger initial
                            bundle but avoid too much CSS duplication and
                            fallbacks.
                        </p>
                    </ErrorFrame>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(7rem, 1fr))",
                            gap: "0.75rem",
                            margin: "1.5rem 0",
                        }}
                    >
                        {themeColors.map(([name, color]) => (
                            <div key={name}>
                                <div
                                    style={{
                                        height: "4rem",
                                        background: color,
                                        border: "1px solid var(--borderE)",
                                        borderRadius: "0.5rem",
                                    }}
                                />
                                <small>{name}</small>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="context">
                    <h2>Why this library exists</h2>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(15rem, 1fr))",
                            gap: "1rem",
                            margin: "1.5rem 0",
                        }}
                    >
                        <Accordion
                            header="Learn by building"
                            view="card"
                        >
                            <p>
                                This project has been made to learn and practice
                                more with HTML, CSS, TS and React
                            </p>
                        </Accordion>
                        <Accordion
                            header="Prefer native behavior"
                            view="card"
                        >
                            <p>
                                Components build on native elements and events
                                whenever possible, keeping forms, keyboard
                                input, and browser semantics predictable.
                            </p>
                        </Accordion>
                        <Accordion
                            header="CCS only + optimized"
                            view="card"
                        >
                            <p>
                                Contrary to many React component library, this
                                one does not use any CSS-in-JS library. It is
                                built with pure CSS and optimized for
                                performance.
                                <br />
                                The components have been designed to be easily
                                customizable and that it is fast to erase
                                potential useless variants!
                            </p>
                        </Accordion>
                    </div>
                    <WarningFrame>
                        This library is a personal project and not a
                        production-ready solution. It will be maintained and
                        improved without taking into account potential users!
                    </WarningFrame>
                </section>
            </main>
            <Footer />
        </>
    );
}
