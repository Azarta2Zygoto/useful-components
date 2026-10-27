import type { ReactNode } from "react";

import "./input.css";
import type { InputProps } from "./type";

export default function Input({
    tooltip,
    variant = "outlined",
    ...props
}: InputProps): ReactNode {
    return (
        <input
            {...props}
            data-tooltip={tooltip ?? undefined}
            data-input-variant={variant}
        />
    );
}
