import { type ReactNode, useId } from "react";

import Required from "../../required/required";
import "../input.css";
import type { TextInputProps } from "../input.type";
import "./floating.css";

export default function FloatingTextInput({
    id,
    type = "text",
    required,
    label,
    placeholder,
    autoComplete = "off",
    variant = "outlined",
    width,
    labelProps,
    ...props
}: Readonly<TextInputProps>): ReactNode {
    const generatedId = useId();
    const correctId = id || generatedId;

    const correctWidth = typeof width === "number" ? `${width}px` : width;

    return (
        <div
            data-floating-variant={variant}
            style={{ width: correctWidth }}
        >
            <input
                {...props}
                id={correctId}
                type={type}
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
