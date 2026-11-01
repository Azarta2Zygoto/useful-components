import type { ComponentProps, ComponentType, ReactNode, SVGProps } from "react";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export interface IconProps extends Omit<
    SVGProps<SVGSVGElement>,
    "width" | "height" | "fill"
> {
    icon: IconType;
    size?: number;
    fill?: string;
    ariaLabel?: string;
}

export interface LabelLayoutProps {
    label: ReactNode;
    labelPosition?: "left" | "top";
    labelProps?: ComponentProps<"label">;
}

export interface FieldProps {
    containerProps?: ComponentProps<"div">;
    error?: string;
    errorProps?: ComponentProps<"p">;
}

export type AdornmentType = IconType | IconProps;

export interface AdornmentProps {
    iconRight?: AdornmentType;
    iconLeft?: AdornmentType;
}

export interface SizeableComponentProps {
    size?: "sm" | "md" | "lg";
}
