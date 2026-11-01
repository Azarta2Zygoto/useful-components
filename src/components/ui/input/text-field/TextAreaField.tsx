"use client";

import { type ReactNode, useId } from "react";

import IconCadenas from "../../assets/icons/cadenas.svg";
import Icon from "../../icon/Svgr";
import Required from "../../required/required";
import "../../utils/field.css";
import TextArea from "../TextArea";
import type { TextAreaFieldProps } from "../input.type";

export default function TextAreaField({
    id,
    required,
    size,
    error,
    label,
    labelPosition = "top",
    labelProps,
    errorProps,
    containerProps,
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

    const textArea = (
        <TextArea
            {...props}
            id={correctId}
            required={required}
            aria-invalid={error ? true : invalidProp}
            aria-describedby={describedBy}
        />
    );

    return (
        <div
            {...containerProps}
            data-field="outlined"
            data-size={size === "md" ? undefined : size}
            data-field-position={labelPosition}
        >
            {props.readOnly ? (
                <span className="field-control">
                    {textArea}
                    <Icon
                        icon={IconCadenas}
                        size={18}
                        data-field-icon="right"
                    />
                </span>
            ) : (
                textArea
            )}
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
