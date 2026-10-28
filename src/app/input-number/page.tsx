"use client";

import NumberInput from "@/components/ui/input/number-input/NumberInput";

export default function NumberInputPage() {
    return (
        <main>
            <h1>Number Input</h1>
            <p>
                The number input component is a wrapper around the native input
                element with type number. It allows you to add a label, a
                tooltip, and a side element. It also allows you to hide the
                label and add a required indicator.
            </p>
            <div className="inner-component">
                <NumberInput
                    step={0.1}
                    max={100}
                    defaultValue={50}
                    label="Number input"
                    placeholder="Enter a number"
                />
                <NumberInput
                    step={0.1}
                    max={100}
                    defaultValue={50}
                    variant="standard"
                    label="Number input standard"
                    placeholder="Enter a number"
                />
            </div>
            <h2>Other props</h2>
            <div className="inner-component">
                <NumberInput
                    required
                    label="Number input required"
                    placeholder="Enter a number"
                />
                <NumberInput
                    disabled
                    label="Number input disabled"
                    placeholder="Enter a number"
                />
                <NumberInput
                    readOnly
                    label="Number input read only"
                    placeholder="Enter a number"
                />
            </div>
        </main>
    );
}
