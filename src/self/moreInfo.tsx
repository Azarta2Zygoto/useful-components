import Icon from "@/component/utils/icon";
import React, { JSX } from "react";

interface MoreInfoProps {
    children: React.ReactNode;
}

export function InfoComponent({
    children
}: MoreInfoProps): JSX.Element {
    return (
        <div className="info-component">
            <Icon
                name="info-circle-fill"
                size={20}
                color="var(--border-color-special)"
                className="info-icon"
            />
            {children}
        </div>
    );
}


export function WarningComponent({
    children
}: MoreInfoProps): JSX.Element {
    return (
        <div className="warning-component">
            <Icon
                name="exclamation-circle-fill"
                size={20}
                color="var(--warning-border-color)"
                className="info-icon"
            />
            {children}
        </div>
    );
}