"use client";

import { type ReactNode, useId } from "react";

import Required from "../../required/required";
import "../../utils/field.css";
import TextArea from "../TextArea";
import type { TextAreaFieldProps } from "../input.type";

export default function TextAreaField({
    id,
    required,
    error,
    label,
    labelPosition = "top",
    labelProps,
    errorProps,
    "aria-describedby": describedByProp,
    "aria-invalid": invalidProp,
    ...props
}: Readonly<TextAreaFieldProps>): ReactNode {
    const generatedId = useId();
    const correctId = id || generatedId;
    const describedBy =
        [describedByProp, error ? `${correctId}-error` : undefined]
            .filter(Boolean)
            .join(" ") || undefined;

    return (
        <div
            className="field-container"
            data-field-position={labelPosition}
        >
            <TextArea
                {...props}
                id={correctId}
                required={required}
                aria-invalid={error ? true : invalidProp}
                aria-describedby={describedBy}
            />
            <label
                {...labelProps}
                htmlFor={correctId}
            >
                {label}
                <Required required={required} />
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
