"use client";
import { useState } from "react";
import MultipleMenuSelect from "@/component/multipleMenuSelect/multipleMenuSelect";

const options = [
    "cheval",
    "Option 2",
    "Carambaraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
];

const chosenOptionsInitial: string[] = [];

export default function Page() {
    const [chosenOptions, setChosenOptions] = useState<string[][]>([
        chosenOptionsInitial,
        chosenOptionsInitial,
        chosenOptionsInitial,
        chosenOptionsInitial,
        chosenOptionsInitial,
        chosenOptionsInitial,]);

    function handleSelect(index: number, values: string[]) {
        const newChosenOptions = [...chosenOptions];
        newChosenOptions[index] = values;
        setChosenOptions(newChosenOptions);
    }

    return (
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px", maxWidth: "400px" }}>
            <MultipleMenuSelect
                id="example-multiple-menuselect"
                options={options}
                selectedOptions={chosenOptions[0]}
                label="Choose options"
                onSelect={(value) => handleSelect(0, value)}
            />
            <div>
                Selected options: {chosenOptions.length > 0 ? chosenOptions.join(", ") : "None"}
            </div>
            <MultipleMenuSelect
                id="example-multiple-menuselect-disabled"
                options={options}
                selectedOptions={chosenOptions[1]}
                label="Choose options"
                disabled
                onSelect={(value) => handleSelect(1, value)}
            />
            <MultipleMenuSelect
                id="example-multiple-menuselect-floating"
                options={options}
                selectedOptions={chosenOptions[2]}
                label="Choose options"
                floatingLabel
                onSelect={(value) => handleSelect(2, value)}
            />
            <MultipleMenuSelect
                id="example-multiple-menuselect-required"
                options={options}
                selectedOptions={chosenOptions[3]}
                label="Choose options"
                floatingLabel
                required
                onSelect={(value) => handleSelect(3, value)}
            />
            <MultipleMenuSelect
                id="example-multiple-menuselect-required"
                options={options}
                selectedOptions={chosenOptions[4]}
                label="Choose options"
                floatingLabel
                required
                checkbox="left"
                style={{width: "250px"}}
                onSelect={(value) => handleSelect(4, value)}
            />
            <MultipleMenuSelect
                id="example-multiple-menuselect-required"
                options={options}
                selectedOptions={chosenOptions[5]}
                label="Choose options"
                floatingLabel
                required
                checkbox="right"
                style={{width: "250px"}}
                onSelect={(value) => handleSelect(5, value)}
            />
        </div>
    );
}