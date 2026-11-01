import type { CSSProperties, ReactNode } from "react";

import type { AdornmentType } from "../utils/types";
import { isIconType } from "../utils/utils";
import Icon from "./Svgr";

export function getIconElement(
    icon: AdornmentType | undefined,
    position: "left" | "right",
): ReactNode {
    if (!icon) return null;

    if (isIconType(icon)) {
        return (
            <Icon
                icon={icon}
                data-field-icon={position}
            />
        );
    }

    return (
        <Icon
            icon={icon.icon}
            fill={icon.fill}
            ariaLabel={icon.ariaLabel}
            className={icon.className}
            data-field-icon={position}
            style={
                icon.size
                    ? ({ "--icon-width": `${icon.size}px` } as CSSProperties)
                    : undefined
            }
        />
    );
}
