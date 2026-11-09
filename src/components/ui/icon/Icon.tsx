import type { ReactNode } from "react";

import type { IconProps } from "../types";

export default function Icon({
    icon: SvgIcon,
    fill = "currentColor",
    size = 18,
    "aria-label": ariaLabel,
    ...props
}: Readonly<IconProps>): ReactNode {
    return (
        <SvgIcon
            {...props}
            width={size}
            height={size}
            fill={fill}
            role={ariaLabel ? "img" : undefined}
            aria-label={ariaLabel}
            aria-hidden={ariaLabel ? undefined : true}
            focusable="false"
        />
    );
}
