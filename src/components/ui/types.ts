import type {
    ComponentProps,
    JSX,
    JSXElementConstructor,
    ReactNode,
} from "react";

import type { IconProps, IconType } from "./icon/icon.type";

type IntrinsicElements =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    keyof JSX.IntrinsicElements | JSXElementConstructor<any>;

export type ContainerProps<T extends IntrinsicElements = "div"> = Omit<
    ComponentProps<T>,
    "children"
>;

export interface LabelLayoutProps {
    label?: ReactNode;
    labelPosition?: "left" | "top";
    labelProps?: ContainerProps<"label">;
}

export interface FieldProps<T extends IntrinsicElements = "div"> {
    containerProps?: ContainerProps<T>;
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
