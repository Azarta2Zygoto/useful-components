import type { ComponentType, ReactNode, SVGProps } from "react";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export interface IconProps {
    icon: IconType;
    size?: number;
    fill?: string;
    ariaLabel?: string;
    className?: string;
}

export default function Icon({
    icon: SvgIcon,
    ariaLabel,
    fill,
    size = 16,
    className,
    ...props
}: Readonly<IconProps>): ReactNode {
    return (
        <SvgIcon
            {...props}
            width={size}
            height={size}
            fill={fill}
            className={className}
            aria-label={ariaLabel}
            aria-hidden={ariaLabel ? undefined : "true"}
            focusable="false"
        />
    );
}
