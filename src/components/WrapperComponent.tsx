import type { PropsWithChildren, ReactNode } from "react";

import Icon from "@ui/icon/icon";

export function InfoComponent({
    children,
}: Readonly<PropsWithChildren>): ReactNode {
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
    children,
}: Readonly<PropsWithChildren>): ReactNode {
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
