"use client";

import { type ReactNode, useId } from "react";

import Required from "../../required/required";
import "../../utils/field.css";
import "../../utils/floating.css";
import type { NumberFieldProps } from "../input.type";
import Numbering from "./Numbering";

export default function NumberField({
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
    ...props
}: Readonly<NumberFieldProps>): ReactNode {
    const generatedId = useId();
    const correctId = id || generatedId;
    const describedBy =
        [describedByProp, error ? `${correctId}-error` : undefined]
            .filter(Boolean)
            .join(" ") || undefined;

    const labelElement = (
        <label
            {...labelProps}
            htmlFor={correctId}
        >
            {label}
            <Required required={props.required} />
        </label>
    );

    return (
        <div
            className="field-container"
            data-floating-variant={floatingLabel ? variant : undefined}
            data-field-position={labelPosition}
        >
            <Numbering
                {...props}
                id={correctId}
                variant={variant}
                placeholder={placeholder || " "}
                aria-invalid={error ? true : invalidProp}
                aria-describedby={describedBy}
            >
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
                {floatingLabel && labelElement}
            </Numbering>
            {!floatingLabel && labelElement}
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
