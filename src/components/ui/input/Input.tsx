import type { ReactNode } from "react";

import "./input.css";
import type { InputProps } from "./input.type";

export default function Input({
    variant = "outlined",
    ...props
}: Readonly<InputProps>): ReactNode {
    return (
        <input
            {...props}
            data-input-variant={variant}
        />
    );
}
