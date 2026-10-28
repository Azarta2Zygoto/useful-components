import type { CSSProperties, ReactNode } from "react";

import "./input.css";
import type { TextAreaProps } from "./input.type";

export default function TextArea({
    minRows = 3,
    maxRows = 6,
    style,
    ...props
}: Readonly<TextAreaProps>): ReactNode {
    return (
        <textarea
            {...props}
            data-input-variant="outlined"
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
