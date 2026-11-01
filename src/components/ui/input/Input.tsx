import type { ReactNode } from "react";

import "./input.css";
import type { InputProps } from "./input.type";

export default function Input({
    variant = "outlined",
    size = "md",
    ...props
}: Readonly<InputProps>): ReactNode {
    return (
        <input
            {...props}
            data-size={size === "md" ? undefined : size}
            data-input-variant={variant}
        />
    );
}
