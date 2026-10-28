"use client";

import { type ReactNode, useId } from "react";

import "../../global/label.css";
import Required from "../../required/required";
import TextArea from "../TextArea";
import type { TextAreaInputProps } from "../input.type";

export default function TextAreaInput({
    id,
    required,
    label,
    labelPosition = "top",
    labelProps,
    ...props
}: Readonly<TextAreaInputProps>): ReactNode {
    const generatedId = useId();
    const correctId = id || generatedId;

    return (
        <label
            {...labelProps}
            htmlFor={correctId}
            data-label-position={labelPosition}
        >
            <span>
                {label}
                <Required required={required} />
            </span>
            <TextArea
                {...props}
                id={correctId}
                required={required}
            />
        </label>
    );
}
