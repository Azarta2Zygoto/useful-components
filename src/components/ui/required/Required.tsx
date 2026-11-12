import type { ReactNode } from "react";

import "./required.css";
import type { RequiredProps } from "./required.type";

export default function Required({ required }: RequiredProps): ReactNode {
    if (!required) {
        return null;
    }

    return (
        <span
            className="uc-required"
            aria-hidden="true"
        >
            &nbsp;*
        </span>
    );
}
