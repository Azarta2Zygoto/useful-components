import type { ComponentProps, ReactNode } from "react";

import type { ContainerProps, SizeableComponentProps } from "../types";

type RadioButton = Omit<
    ComponentProps<"input">,
    | "size"
    | "type"
    | "children"
    | "aria-label"
    | "min"
    | "max"
    | "value"
    | "defaultValue"
    | "minLength"
    | "maxLength"
    | "pattern"
    | "readOnly"
    | "step"
    | "multiple"
    | "accept"
    | "alt"
    | "src"
    | "width"
>;

export type RadioButtonVariant = "primary" | "secondary" | "transparent";
export interface RadioButtonProps extends RadioButton {
    name: string;
    value: string;
    label?: ReactNode;
    deselect?: boolean;
    tooltip?: boolean;
    ripple?: boolean;
    variant?: RadioButtonVariant;
    isIcon?: boolean;
    containerProps?: Omit<ContainerProps<"label">, "style" | "className">;
}

export interface RadioGroupProps extends RadioButton, SizeableComponentProps {
    name: string;
    elements: Omit<RadioButtonProps, "name" | "checked" | "id" | "isIcon">[];
    label: string;
    selectedValue: string | null;
    isIcon?: boolean;
    ripple?: boolean;
    deselect?: boolean;
    tooltip?: boolean;
    variant?: RadioButtonVariant;
    columns?: number;
}
