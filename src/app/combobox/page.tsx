"use client";

import { useState } from "react";
import Combobox from "@/component/combobox/combobox";

const selectOptionsList = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
]

const selectOptions = [
    "banana",
    "apple",
    "orange",
    "grape",
    "mango",
    "pineapple",
    "strawberry",
    "blueberry",
    "watermelon",
    "kiwi"
]

export default function ComboboxPage() {
    const [selectedValue, setSelectedValue] = useState<string[]>(selectOptionsList);

    function handleValidation(val: string, index:number) {
        setSelectedValue(prev => {
            const newValues = [...prev];
            newValues[index] = val;
            return newValues;
        });
    }

    return (
        <main>
            <h1>Combobox</h1>
            <p>A combobox is a combination of a dropdown list and a single-line textbox, allowing the user to either type a value directly or select a value from the list.</p>
            
            <h2>Basic combobox</h2>
            <div className="inner-component">
                <Combobox
                    id="fruit-combobox"
                    value={selectedValue[0]}
                    options={selectOptions}
                    placeholder="Select or type a fruit"
                    floatingLabel
                    onChange={(val) => handleValidation(val, 0)}
                />
            </div>

            <h2>Perfect match</h2>
            <p>You can show on the dropdown list only the value that start exactly as the same as the user is entering.</p>
            <div className="inner-component">
                <Combobox
                    id="fruit-combobox-perfect"
                    value={selectedValue[1]}
                    options={selectOptions}
                    placeholder="Select or type a fruit - perfect match"
                    floatingLabel
                    perfectMatch
                    onChange={(val) => handleValidation(val, 1)}
                />
            </div>
            <h2>Valid only</h2>
            <p>You can restrict the user to select only a value from the list with the validOnly property.</p>
            <div className="inner-component">
                <Combobox
                    id="fruit-combobox-valid"
                    value={selectedValue[2]}
                    options={selectOptions}
                    placeholder="Select or type a fruit - valid only"
                    floatingLabel
                    validOnly
                    onChange={(val) => handleValidation(val, 2)}
                />
            </div>
            <h2>Maximum option</h2>
            <p>You can limit the number of option shown in the dropdown list.</p>
            <div className="inner-component">
                <Combobox
                    id="fruit-combobox-max-option"
                    value={selectedValue[3]}
                    options={selectOptions}
                    placeholder="Select or type a fruit - 3 options"
                    floatingLabel
                    maximumOptions={3}
                    onChange={(val) => handleValidation(val, 3)}
                />
            </div>

            <h2>Other options</h2>
            <p>All options of an input can be use for the combobox.</p>
            <div className="inner-component">
                <Combobox
                    id="fruit-combobox-max-variant"
                    value={selectedValue[4]}
                    options={selectOptions}
                    placeholder="Select or type a fruit"
                    floatingLabel
                    variant="standard"
                    onChange={(val) => handleValidation(val, 4)}
                />
                <Combobox
                    id="fruit-combobox-max-variant"
                    value={selectedValue[5]}
                    options={selectOptions}
                    placeholder="Select or type a fruit"
                    floatingLabel
                    required
                    onChange={(val) => handleValidation(val, 5)}
                />
                <Combobox
                    id="fruit-combobox-max-variant"
                    value={selectedValue[6]}
                    options={selectOptions}
                    placeholder="Select or type a fruit"
                    floatingLabel
                    disabled
                    variant="compact"
                    onChange={(val) => handleValidation(val, 6)}
                />
            </div>
        </main>
    );
}