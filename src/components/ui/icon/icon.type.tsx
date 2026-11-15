import type { ComponentType, SVGProps } from "react";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export interface IconProps extends Omit<
    SVGProps<SVGSVGElement>,
    "role" | "aria-hidden"
> {
    icon: IconType;
    size?: number;
}
