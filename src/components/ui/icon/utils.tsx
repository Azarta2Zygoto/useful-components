import type { CSSProperties, ReactNode } from "react";

import type { AdornmentType } from "../types";
import { isIconType } from "../utils/utils";
import Icon from "./Icon";

export function getIconElement(
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
