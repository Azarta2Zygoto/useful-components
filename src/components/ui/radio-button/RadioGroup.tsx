import type { ReactNode } from "react";

import Required from "../required/required";
import RadioButton from "./RadioButton";
import type { RadioGroupProps } from "./radio-button.type";

export default function RadioGroup({
    name,
    elements,
    selectedValue,
    disabled,
    label,
    columns = 1,
    size,
    required,
    ...props
}: RadioGroupProps): ReactNode {
    const validity = required
        ? selectedValue !== null
            ? "true"
            : "false"
        : "";

    return (
        <fieldset
            data-uc-size={size}
            data-uc-radio-group={validity}
            disabled={disabled}
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
