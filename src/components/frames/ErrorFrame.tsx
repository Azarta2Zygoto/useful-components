import type { PropsWithChildren, ReactNode } from "react";

import ErrorIcon from "@ui/assets/icons/error.svg";
import Icon from "@ui/icon/Icon";

export default function ErrorFrame({
    children,
}: Readonly<PropsWithChildren>): ReactNode {
    return (
        <div className="frame error">
            <Icon icon={ErrorIcon} />
            {children}
        </div>
    );
}
