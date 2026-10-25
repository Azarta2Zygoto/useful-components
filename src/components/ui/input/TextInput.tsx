import { type ReactNode, useId } from "react";

import Required from "../required/required";
import "./input.css";
import { TextInputProps } from "./type";

export default function TextInput({
    id,
    type = "text",
    required,
    side = "top",
    label,
    autoComplete = "off",
    variant = "outlined",
    state,
    width,
    tooltip,
    labelProps,
    style,
    ...props
}: Readonly<TextInputProps>): ReactNode {
    const generatedId = useId();

    const correctId = id || generatedId;
    const correctWidth = typeof width === "number" ? `${width}px` : width;

    return (
        <label
            {...labelProps}
            id={`${correctId}-label`}
            htmlFor={correctId}
            className={`text-input-label${labelProps?.className ? ` ${labelProps.className}` : ""}`}
            data-side={label ? side : undefined}
        >
            {label && (
                <span>
                    {label}
                    <Required required={required} />
                </span>
            )}
            <input
                {...props}
                id={correctId}
                type={type}
                data-tooltip={tooltip}
                data-state={state}
                data-input-variant={variant}
                required={required}
                autoComplete={autoComplete}
                style={{
                    ...style,
                    ...(correctWidth !== undefined
                        ? { width: correctWidth }
                        : {}),
                }}
            />
        </label>
    );
}
