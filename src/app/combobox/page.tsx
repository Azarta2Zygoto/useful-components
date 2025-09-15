"use client";

import { useState } from "react";
import Combobox from "@/component/combobox/combobox";


const options = ["Apple", "Banana", "Orange", "Grape", "Pineapple", "Mango", "Strawberry", "Blueberry", "Raspberry", "Blackberry"];

export default function ComboboxPage() {
    const [selectedValue, setSelectedValue] = useState<string[]>(["", "", ""]);

    function handleValidation(val: string, index:number) {
        console.log("Selected:", val);
        setSelectedValue(prev => {
            const newValues = [...prev];
            newValues[index] = val;
            return newValues;
        });
    }

    return (
        <div>
            <h1>Combobox Example</h1>
            <Combobox
                id="fruit-combobox"
                value={selectedValue[0]}
                options={options}
                placeholder="Select or type a fruit"
                floatingLabel
                onChange={(val) => handleValidation(val, 0)}
            />
            <Combobox
                id="fruit-combobox-perfect"
                value={selectedValue[1]}
                options={options}
                placeholder="Select or type a fruit - perfect match"
                floatingLabel
                perfectMatch
                onChange={(val) => handleValidation(val, 1)}
            />
            <Combobox
                id="fruit-combobox-valid"
                value={selectedValue[2]}
                options={options}
                placeholder="Select or type a fruit - valid only"
                floatingLabel
                perfectMatch
                validOnly
                onChange={(val) => handleValidation(val, 2)}
            />
            <p>Selected Value: {selectedValue[0]}</p>
            <p>Selected Value: {selectedValue[1]}</p>
            <p>Selected Value: {selectedValue[2]}</p>
        </div>
    );
}