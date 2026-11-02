import type { PropsWithChildren, ReactNode } from "react";

import ExclamationIcon from "@ui/assets/icons/exclamation.svg";
import Icon from "@ui/icon/Icon";

export default function WarningFrame({
    children,
}: Readonly<PropsWithChildren>): ReactNode {
    return (
        <div className="frame warning">
            <Icon icon={ExclamationIcon} />
            {children}
        </div>
    );
}
