import { type ReactNode, useId } from "react";

import Required from "../../required/required";
import "../../utils/field.css";
import "../../utils/floating.css";
import Input from "../Input";
import type { TextFieldProps } from "../input.type";

export default function TextField({
    id,
    variant = "outlined",
    error,
    placeholder,
    label,
    labelPosition = "top",
    labelProps,
    errorProps,
    floatingLabel = false,
    "aria-describedby": describedByProp,
    "aria-invalid": invalidProp,
    onChange,
    onValue,
    ...props
}: Readonly<TextFieldProps>): ReactNode {
    const generatedId = useId();
    const correctId = id ?? generatedId;
    const describedBy =
        [describedByProp, error ? `${correctId}-error` : undefined]
            .filter(Boolean)
            .join(" ") || undefined;

    return (
        <div
            className="field-container"
            data-floating-variant={floatingLabel ? variant : undefined}
            data-field-position={floatingLabel ? undefined : labelPosition}
        >
            <Input
                {...props}
                id={correctId}
                variant={variant}
                placeholder={placeholder || " "}
                aria-invalid={error ? true : invalidProp}
                aria-describedby={describedBy}
                onChange={(e) => {
                    onChange?.(e);
                    onValue?.(e.currentTarget.value);
                }}
            />
            {variant === "outlined" && floatingLabel && (
                <fieldset aria-hidden="true">
                    <legend>
                        <span>
                            {label}
                            <Required required={props.required} />
                        </span>
                    </legend>
                </fieldset>
            )}
            <label
                {...labelProps}
                htmlFor={correctId}
            >
                {label}
                <Required required={props.required} />
            </label>
            <p
                {...errorProps}
                id={`${correctId}-error`}
                data-field-error
                aria-live="polite"
            >
                {error}
            </p>
        </div>
    );
}
