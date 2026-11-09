import type {
    ComponentProps,
    ComponentType,
    JSX,
    JSXElementConstructor,
    ReactNode,
    SVGProps,
} from "react";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;
export type ContainerProps<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> = "div",
> = Omit<ComponentProps<T>, "children">;

export interface IconProps extends Omit<
    SVGProps<SVGSVGElement>,
    "width" | "height" | "fill"
> {
    icon: IconType;
    size?: number;
    fill?: string;
}

export interface LabelLayoutProps {
    label: ReactNode;
    labelPosition?: "left" | "top";
    labelProps?: ContainerProps<"label">;
}

export interface FieldProps {
    containerProps?: ContainerProps;
    error?: string;
    errorProps?: ComponentProps<"p">;
}

export type AdornmentType = IconType | IconProps;

export interface AdornmentProps {
    iconRight?: AdornmentType;
    iconLeft?: AdornmentType;
}

export type Size = "sm" | "md" | "lg";
export interface SizeableComponentProps {
    size?: Size;
}
