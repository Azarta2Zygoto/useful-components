import type { ReactNode } from "react";

import type { IconProps } from "./icon.type";

export default function Icon({
    icon: SvgIcon,
    fill = "currentColor",
    size = 18,
    width,
    height,
    "aria-label": ariaLabel,
    ...props
}: IconProps): ReactNode {
    return (
        <SvgIcon
            {...props}
            width={width ?? size}
            height={height ?? size}
            fill={fill}
            role={ariaLabel ? "img" : undefined}
            aria-label={ariaLabel}
            aria-hidden={ariaLabel ? undefined : true}
            focusable="false"
        />
    );
}
