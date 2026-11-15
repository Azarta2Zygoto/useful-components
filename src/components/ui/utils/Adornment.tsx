import type { CSSProperties, ReactNode } from "react";

import Icon from "../icon/Icon";
import type { AdornmentType } from "../types";
import { isIconType } from "./utils";

export function getAdornment(
    icon: AdornmentType | undefined,
    position: "left" | "right",
): ReactNode {
    if (!icon) return null;

    if (isIconType(icon)) {
        return (
            <Icon
                icon={icon}
                data-uc-adornment={position}
            />
        );
    }

    return (
        <Icon
            {...icon}
            data-uc-adornment={position}
            style={
                icon.size
                    ? ({ "--icon-width": `${icon.size}px` } as CSSProperties)
                    : undefined
            }
        />
    );
}
