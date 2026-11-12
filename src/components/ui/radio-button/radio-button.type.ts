import type { ComponentProps, ReactNode } from "react";

import type {
    ContainerProps,
    FieldProps,
    SizeableComponentProps,
} from "../types";

type RadioButtonType = Omit<
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
export interface RadioButtonProps extends RadioButtonType {
    name: string;
    value: string;
    label?: ReactNode;
    deselect?: boolean;
    tooltip?: string;
    ripple?: boolean;
    variant?: RadioButtonVariant;
    isIcon?: boolean;
    containerProps?: Omit<ContainerProps<"label">, "style" | "className">;
}

export type RadioElement = Omit<
    RadioButtonProps,
    "name" | "checked" | "id" | "isIcon" | "onChange"
>;
export interface RadioGroupProps
    extends RadioButtonType, SizeableComponentProps, FieldProps<"fieldset"> {
    name: string;
    elements: RadioElement[];
    label: string;
    value?: string | null;
    defaultValue?: string | null;
    isIcon?: boolean;
    ripple?: boolean;
    deselect?: boolean;
    variant?: RadioButtonVariant;
    columns?: number;
    onValue?: (value: string | null) => void;
}
