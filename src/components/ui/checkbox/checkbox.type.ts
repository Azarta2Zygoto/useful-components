import type { ComponentProps, ReactNode } from "react";

import type { ContainerProps, SizeableComponentProps } from "../types";

type Checkbox = Omit<
    ComponentProps<"input">,
    | "size"
    | "type"
    | "checked"
    | "style"
    | "className"
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
>;

export interface CheckboxProps extends Checkbox, SizeableComponentProps {
    label: string;
    checked?: boolean;
    defaultChecked?: boolean;
    indeterminate?: boolean;
    position?: "left" | "right";
    hideLabel?: boolean;
    tooltip?: string;
    checkmark?:
        ReactNode | ((checked: boolean, indeterminate: boolean) => ReactNode);
    containerProps?: ContainerProps<"label">;
    onValue?: (checked: boolean) => void;
}
