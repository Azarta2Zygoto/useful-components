"use client";

import { useState } from "react";

import MenuSelect from "@ui/menu-select/MenuSelect";

const options = [
    { value: "option1", label: "Banana" },
    { value: "option2", label: "Orange" },
    { value: "option3", label: "Apple" },
    { value: "option4", label: "Grape" },
];

export default function MenuSelectPage() {
    const [selectedOption, setSelectedOption] = useState<{
        value: string;
        label: string;
    } | null>(null);

    return (
        <main>
            <h1>Menu Select Page</h1>
            <p>
                This is a simple menu select component. You can use it to select
                an option from a list.
            </p>
            <h2>Basic Menu Select</h2>
            <div className="code-view">
                <MenuSelect
                    label="Basic Menu Select"
                    options={options}
                    selected={selectedOption ?? undefined}
                    onSelect={(option) => {
                        setSelectedOption(option);
                        console.log("Selected option:", option);
                    }}
                />
            </div>
            <h2>Left side label</h2>
            <div className="code-view">
                <MenuSelect
                    label="Basic Menu Select"
                    side="left"
                    options={options}
                    width={150}
                    selected={selectedOption ?? undefined}
                    onSelect={(option) => {
                        setSelectedOption(option);
                        console.log("Selected option:", option);
                    }}
                />
            </div>
        </main>
    );
}
