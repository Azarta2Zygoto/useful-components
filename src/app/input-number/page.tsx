"use client";

import CaretDownIcon from "@ui/assets/icons/caret-down.svg";

import NumberField from "@/components/ui/input/number-input/NumberField";

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
            <div className="code-view">
                <NumberField
                    step={0.1}
                    max={100}
                    defaultValue={50}
                    label="Number input"
                    placeholder="Enter a number"
                />
                <NumberField
                    step={0.1}
                    max={100}
                    defaultValue={50}
                    variant="underlined"
                    label="Number input underlined"
                    placeholder="Enter a number"
                />
            </div>
            <h2>Other input props</h2>
            <p>As the text input, the number inupt has the same state.</p>
            <div className="code-view">
                <NumberField
                    required
                    label="Number input required"
                    placeholder="Enter a number"
                />
                <NumberField
                    disabled
                    label="Number input disabled"
                    placeholder="Enter a number"
                />
                <NumberField
                    readOnly
                    label="Number input read only"
                    placeholder="Enter a number"
                    value={844968984992489489}
                />
                <NumberField
                    floatingLabel
                    label="Number input read floating Label"
                    placeholder="Enter a number"
                />
                <NumberField
                    floatingLabel
                    variant="underlined"
                    label="Number input read floating Label"
                    placeholder="Enter a number"
                />
                <NumberField
                    floatingLabel
                    label="Number input read floating Label"
                    placeholder="Enter a number"
                    size="sm"
                />
                <NumberField
                    floatingLabel
                    variant="underlined"
                    label="Number input read floating Label"
                    placeholder="Enter a number"
                    size="lg"
                />
                <NumberField
                    floatingLabel
                    variant="underlined"
                    label="Number input read floating Label, which is a very long label"
                    placeholder="Enter a number"
                    iconRight={CaretDownIcon}
                    iconLeft={CaretDownIcon}
                />
            </div>
        </main>
    );
}
