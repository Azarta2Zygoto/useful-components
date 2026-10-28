import { type ReactNode, useId } from "react";

import "../../global/label.css";
import Required from "../../required/required";
import Input from "../Input";
import type { TextInputProps } from "../input.type";

export default function TextInput({
    id,
    required,
    label,
    labelPosition = "top",
    labelProps,
    onChange,
    onValue,
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
            <Input
                {...props}
                id={correctId}
                required={required}
                onChange={(e) => {
                    onChange?.(e);
                    onValue?.(e.currentTarget.value);
                }}
            />
        </label>
    );
}
