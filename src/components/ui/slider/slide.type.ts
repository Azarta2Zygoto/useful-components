import type { ComponentProps } from "react";

import type { ContainerProps, SizeableComponentProps } from "../types";

type SliderType = Omit<
    ComponentProps<"input">,
    | "size"
    | "type"
    | "checked"
    | "children"
    | "minLength"
    | "maxLength"
    | "pattern"
    | "readOnly"
    | "multiple"
    | "accept"
    | "alt"
    | "src"
>;
export interface SliderProps extends SliderType, SizeableComponentProps {
    label: string;
    hideLabel?: boolean;
    labelProps?: ContainerProps<"label">;
    position?: "top" | "left";
    height?: string;
    tick?: boolean;
    unit?: string;
    tooltipThumb?: "hover" | "always" | "never";
    onValue?: (value: number) => void;
}
