import { type ReactNode, useId } from "react";

import Required from "../required/required";
import "./input.css";
import { TextInputProps } from "./type";

export default function FloatingLabelInput({
    id,
    type = "text",
    required,
    side = "top",
    label,
    placeholder,
    autoComplete = "off",
    variant = "outlined",
    state,
    width,
    tooltip,
    labelProps,
    ...props
}: Readonly<TextInputProps>): ReactNode {
    const generatedId = useId();
    const correctId = id || generatedId;

    const correctWidth = typeof width === "number" ? `${width}px` : width;

    return (
        <div
            data-floating-variant={variant}
            data-side={label ? side : undefined}
            style={{ width: correctWidth }}
        >
            <input
                {...props}
                id={correctId}
                type={type}
                data-tooltip={tooltip}
                data-state={state}
                data-input-variant={variant}
                required={required}
                autoComplete={autoComplete}
                placeholder={placeholder ?? " "}
            />
            {variant === "outlined" && (
                <fieldset aria-hidden="true">
                    <legend>
                        <span>
                            {label}
                            <Required required={required} />
                        </span>
                    </legend>
                </fieldset>
            )}

            {label && (
                <label
                    {...labelProps}
                    id={`${correctId}-label`}
                    htmlFor={correctId}
                >
                    {label}
                    <Required required={required} />
                </label>
            )}
        </div>
    );
}
