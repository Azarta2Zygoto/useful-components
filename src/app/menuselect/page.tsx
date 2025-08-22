"use client";

import { useState } from "react";
import MenuSelect from "@/component/menuSelect/menuSelect";

const selectOptionsList = [
    "",
    "",
    "",
    "Option 2",
    "",
    "",
    "Option 1",
    "Option 3"
]

const options = [
    "cheval",
    "Option 2",
    "Carambar",
    "Hello World",
    "bibliothèque"
];

export default function MenuSelectPage(){
    const [selectedOption, setSelectedOption] = useState<string[]>(selectOptionsList);

    return (
        <main>
            <MenuSelect
                id="example-select"
                label="Example Select"
                options={["Option 1", "Option 2", "Option 3", "Option 4"]}
                selectedOption={selectedOption[0]}
                onSelect={(value) => setSelectedOption(prev=>
                    prev.map((_, index) => index === 0 ? value : _)
                )}
                style={{ width: "200px" }}
            />
            <MenuSelect
                id="example-select-floating"
                label="Example Select floating Label"
                options={["Option 1", "Option 2", "Option 3", "Option 4"]}
                selectedOption={selectedOption[1]}
                floatingLabel
                onSelect={(value) => setSelectedOption(prev=>
                    prev.map((_, index) => index === 1 ? value : _)
                )}
                style={{ width: "200px" }}
            />
            <MenuSelect
                id="example-select-without-icon"
                label="Example Select without Icon"
                options={["Option 1", "Option 2", "Option 3", "Option 4"]}
                selectedOption={selectedOption[2]}
                hideIcon
                onSelect={(value) => setSelectedOption(prev=>
                    prev.map((_, index) => index === 2 ? value : _)
                )}
                style={{ width: "200px" }}
            />
            <label htmlFor="example-select-without-label">Example Select without label</label>
            <MenuSelect
                id="example-select-without-label"
                options={["Option 1", "Option 2", "Option 3", "Option 4"]}
                selectedOption={selectedOption[3]}
                onSelect={(value) => setSelectedOption(prev=>
                    prev.map((_, index) => index === 3 ? value : _)
                )}
                style={{ width: "200px" }}
            />
            <MenuSelect
                id="example-select-disabled"
                label="Example Select floating Label"
                options={["Option 1", "Option 2", "Option 3", "Option 4"]}
                selectedOption="Option 1"
                floatingLabel
                disabled
                onSelect={(value) => setSelectedOption(prev=>
                    prev.map((_, index) => index === 0 ? value : _)
                )}
                style={{ width: "200px" }}
            />
            <MenuSelect
                id="example-select-required"
                label="Example Select required"
                options={["Option 1", "Option 2", "Option 3", "Option 4"]}
                selectedOption={selectedOption[5]}
                floatingLabel
                required
                onSelect={(value) => setSelectedOption(prev=>
                    prev.map((_, index) => index === 5 ? value : _)
                )}
                style={{ width: "200px" }}
            />
            <MenuSelect
                id="example-select-empty"
                label="Example Select empty"
                options={[]}
                selectedOption={selectedOption[6]}
                floatingLabel
                onSelect={(value) => setSelectedOption(prev=>
                    prev.map((_, index) => index === 6 ? value : _)
                )}
                style={{ width: "200px" }}
            />
            <MenuSelect
                id="example-select-tooltip"
                label="Example Select tooltip"
                options={options}
                selectedOption={selectedOption[7]}
                tooltip
                onSelect={(value) => setSelectedOption(prev=>
                    prev.map((_, index) => index === 7 ? value : _)
                )}
            />
        </main>
    );
}