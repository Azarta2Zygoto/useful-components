"use client";

import {
    type LabelHTMLAttributes,
    type ReactNode,
    type TextareaHTMLAttributes,
    useId,
} from "react";

import Required from "../required/required";
import "./input.css";

type TextArea = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "type">;

export interface TextAreaProps extends TextArea {
    value?: string;
    side?: "left" | "top";
    tooltip?: string;
    label?: string;
    hideLabel?: boolean;
    width?: number | string;
    maxHeight?: number | string;
    state?: "default" | "invalid";
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

export default function TextArea({
    id,
    value,
    required,
    side = "top",
    label,
    hideLabel,
    state,
    width,
    maxHeight,
    tooltip,
    labelProps,
    style,
    ...props
}: Readonly<TextAreaProps>): ReactNode {
    const generatedId = useId();

    const correctId = id || generatedId;
    const correctWidth = typeof width === "number" ? `${width}px` : width;
    const correctMaxHeight =
        typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;

    return (
        <div
            className="text-input-label"
            data-side={label ? side : undefined}
        >
            <label
                {...labelProps}
                id={`${correctId}-label`}
                htmlFor={correctId}
            >
                {!hideLabel && (
                    <>
                        {label}
                        <Required required={required} />
                    </>
                )}
            </label>
            <textarea
                {...props}
                id={correctId}
                data-input-variant="outlined"
                data-tooltip={tooltip}
                data-state={state}
                required={required}
                style={{
                    ...style,
                    ...(correctMaxHeight !== undefined
                        ? { maxHeight: correctMaxHeight }
                        : {}),
                    ...(correctWidth !== undefined
                        ? { width: correctWidth }
                        : {}),
                }}
            >
                {value}
            </textarea>
        </div>
    );
}
