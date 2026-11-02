import type { PropsWithChildren, ReactNode } from "react";

import InfoIcon from "@ui/assets/icons/info.svg";
import Icon from "@ui/icon/Svgr";

export default function InfoFrame({
    children,
}: Readonly<PropsWithChildren>): ReactNode {
    return (
        <div className="frame info">
            <Icon icon={InfoIcon} />
            {children}
        </div>
    );
}
