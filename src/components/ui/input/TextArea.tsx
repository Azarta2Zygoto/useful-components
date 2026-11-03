import type { CSSProperties, ReactNode } from "react";

import "./input.css";
import type { TextAreaProps } from "./input.type";

export default function TextArea({
    minRows = 3,
    maxRows = 6,
    style,
    size,
    onChange,
    onValue,
    ...props
}: Readonly<TextAreaProps>): ReactNode {
    return (
        <textarea
            {...props}
            data-uc-size={size === "md" ? undefined : size}
            data-input-variant="outlined"
            onChange={(e) => {
                onChange?.(e);
                onValue?.(e.currentTarget.value);
            }}
            style={
                {
                    ...style,
                    "--rows-min": minRows,
                    "--rows-max": maxRows,
                } as CSSProperties
            }
        />
    );
}
