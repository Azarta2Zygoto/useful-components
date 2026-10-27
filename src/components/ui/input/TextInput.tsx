import type { ReactNode } from "react";

import "../css/label.css";
import Required from "../required/required";
import "./input.css";
import type { TextInputProps } from "./type";

export default function TextInput({
    required,
    tooltip,
    variant = "outlined",
    label,
    labelPosition = "top",
    labelProps,
    ...props
}: Readonly<TextInputProps>): ReactNode {
    return (
        <label
            {...labelProps}
            data-label-position={labelPosition}
        >
            <span>
                {label}
                <Required required={required} />
            </span>
            <input
                {...props}
                required={required}
                data-tooltip={tooltip ?? undefined}
                data-input-variant={variant}
            />
        </label>
    );
}
