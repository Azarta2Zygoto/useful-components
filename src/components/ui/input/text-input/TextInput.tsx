import { type ReactNode, useId } from "react";

import "../../css/label.css";
import Required from "../../required/required";
import "../input.css";
import type { TextInputProps } from "../input.type";

export default function TextInput({
    id,
    required,
    variant = "outlined",
    label,
    labelPosition = "top",
    labelProps,
    ...props
}: Readonly<TextInputProps>): ReactNode {
    const generatedId = useId();
    const correctId = id ?? generatedId;

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
                id={correctId}
                required={required}
                data-input-variant={variant}
            />
        </label>
    );
}
