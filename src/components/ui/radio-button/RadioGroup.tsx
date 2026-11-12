"use client";

import {
    type CSSProperties,
    type ChangeEvent,
    type ReactNode,
    useId,
    useState,
} from "react";

import "../field.css";
import Required from "../required/Required";
import RadioButton from "./RadioButton";
import type { RadioGroupProps } from "./radio-button.type";

export default function RadioGroup({
    id,
    name,
    elements,
    value,
    defaultValue,
    disabled,
    label,
    columns = 1,
    size,
    required,
    containerProps,
    error,
    errorProps,
    onValue,
    onChange,
    ...props
}: RadioGroupProps): ReactNode {
    const generatedId = useId();
    const correctId = id ?? generatedId;
    const isControlled = value !== undefined;
    const [innerSelectedValue, setInnerSelectedValue] = useState(
        defaultValue ?? null,
    );
    const currentSelectedValue = isControlled ? value : innerSelectedValue;

    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (!isControlled) {
            setInnerSelectedValue(newValue);
        }

        onChange?.(e);
        onValue?.(newValue);
    };

    const safeColumns = Math.max(1, Math.floor(columns));

    return (
        <fieldset
            {...containerProps}
            id={correctId}
            data-uc-size={size}
            data-uc-radio-group={error ? "false" : ""}
            aria-describedby={error ? `${correctId}-error` : undefined}
            aria-invalid={error ? "true" : undefined}
            disabled={disabled}
            style={
                {
                    ...containerProps?.style,
                    "--uc-columns": safeColumns,
                } as CSSProperties
            }
        >
            <legend>
                {label}
                <Required required={required} />
            </legend>
            <div>
                {elements.map((element) => (
                    <RadioButton
                        {...props}
                        {...element}
                        id={`${correctId}-${element.value.toLowerCase().replace(/\s+/g, "-")}`}
                        key={`${name}-${element.value}`}
                        name={name}
                        required={required}
                        checked={currentSelectedValue === element.value}
                        disabled={element.disabled || disabled}
                        onChange={handleValueChange}
                    />
                ))}
            </div>
            <p
                aria-live="polite"
                {...errorProps}
                id={`${correctId}-error`}
                data-uc-field-error
            >
                {error}
            </p>
        </fieldset>
    );
}
