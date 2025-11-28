import { JSX } from "react";

import RadioButton from "./radioButton";

interface RadioGroupProps {
    name: string;
    values: string[];
    label?: React.ReactNode[];
    selectedValue?: string;
    disabled?: boolean;
    title?: string;
    size?: number;
    className?: string;
    individualStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    deselect?: boolean;
    required?: boolean;
    disabledValues?: string[];
    tooltip?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioGroup({
    name,
    values,
    selectedValue,
    label,
    disabled,
    title,
    size = 1,
    deselect,
    individualStyle,
    className,
    style,
    required,
    disabledValues,
    tooltip,
    onChange,
}: RadioGroupProps): JSX.Element {
    return (
        <fieldset
            className={`radio-group-container ${className ? className : ""} ${required && selectedValue === "" ? "required" : ""}`}
            role="radiogroup"
            style={{
                ...style,
                gridTemplateColumns: `repeat(${size}, 1fr)`,
            }}
            disabled={disabled}
            aria-required={required}
            aria-disabled={disabled}
        >
            {title && (
                <legend className="radio-group-title">
                    {title}
                    {required && (
                        <span
                            aria-hidden="true"
                            style={{ color: "red", margin: "0 5px" }}
                        >
                            &nbsp;*
                        </span>
                    )}
                </legend>
            )}
            {values.map((val, j) => (
                <RadioButton
                    key={`${name}-${val}`}
                    name={name}
                    value={val}
                    checked={selectedValue === val}
                    label={label ? label[j] : undefined}
                    disabled={
                        disabled ||
                        (disabledValues && disabledValues.includes(val))
                    }
                    onChange={onChange}
                    deselect={deselect}
                    style={individualStyle}
                    tooltip={tooltip}
                    className={className}
                />
            ))}
        </fieldset>
    );
}
