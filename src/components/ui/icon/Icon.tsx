import type { ReactNode } from "react";

import type { IconProps } from "../utils/types";

export default function Icon({
    icon: SvgIcon,
    ariaLabel,
    fill = "currentColor",
    size = 18,
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
