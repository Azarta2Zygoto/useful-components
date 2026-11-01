import type { ReactNode } from "react";

import "./required.css";

interface RequiredProps {
    required?: boolean;
}

export default function Required({
    required,
}: Readonly<RequiredProps>): ReactNode {
    if (!required) {
        return null;
    }

    return (
        <span
            className="required"
            aria-hidden="true"
        >
            &nbsp;*
        </span>
    );
}
