"use client";

import {
    CSSProperties,
    type ComponentProps,
    type ReactNode,
    useId,
} from "react";

import "../../css/label.css";
import Required from "../../required/required";
import "../input.css";
import { TextAreaProps } from "../input.type";

interface TextAreaInputProps extends TextAreaProps {
    label: ReactNode;
    labelPosition?: "left" | "top";
    labelProps?: ComponentProps<"label">;
}

export default function TextAreaInput({
    id,
    required,
    label,
    labelPosition = "top",
    labelProps,
    style,
    minRows = 3,
    maxRows = 6,
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
            <textarea
                {...props}
                id={correctId}
                required={required}
                data-input-variant="outlined"
                style={
                    {
                        ...style,
                        "--rows-min": minRows,
                        "--rows-max": maxRows,
                    } as CSSProperties
                }
            />
        </label>
    );
}
