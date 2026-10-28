"use client";

import { useState } from "react";

import NumberInput from "@/components/ui/input/number-input/NumberInput";
import Numbering from "@/components/ui/input/number-input/Numbering";

export default function NumberInputPage() {
    const [value, setValue] = useState<number | null>(50);
    return (
        <main>
            <h1>Number Input</h1>
            <p>
                The number input component is a wrapper around the native input
                element with type number. It allows you to add a label, a
                tooltip, and a side element. It also allows you to hide the
                label and add a required indicator.
            </p>
            <Numbering
                defaultValue={50}
                max={103}
                min={1}
            />
            <Numbering
                max={103}
                min={1}
                value={value}
                onValue={setValue}
            />
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
                    variant="underline"
                    label="Number input underline"
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
