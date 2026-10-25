import type { InputHTMLAttributes, ReactNode } from "react";

import Required from "../required/required";
import RadioButton, { RadioButtonProps } from "./RadioButton";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    elements: Omit<RadioButtonProps, "name" | "checked" | "id">[];
    label: string;
    selectedValue: string | null;
    ripple?: boolean;
    deselect?: boolean;
    tooltip?: boolean;
    variant?: "primary" | "secondary" | "basic";
    columns?: number;
    width?: number | string;
}

export default function RadioGroup({
    name,
    elements,
    selectedValue,
    disabled,
    label,
    columns = 1,
    required,
    ...props
}: Readonly<Props>): ReactNode {
    const validity = required
        ? selectedValue !== null
            ? "true"
            : "false"
        : undefined;

    return (
        <fieldset
            data-valid={validity}
            disabled={disabled}
            className="radio-group-container"
            style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
        >
            <legend>
                {label}
                <Required required={required} />
            </legend>
            {elements.map((element) => (
                <RadioButton
                    {...props}
                    {...element}
                    key={`${name}-${element.value}`}
                    name={name}
                    required={required}
                    checked={selectedValue === element.value}
                    disabled={element.disabled || disabled}
                />
            ))}
        </fieldset>
    );
}
