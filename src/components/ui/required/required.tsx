"use client";

import { ReactNode } from "react";

import "./required.css";

interface Props {
    required?: boolean;
}

export default function Required({ required }: Readonly<Props>): ReactNode {
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
