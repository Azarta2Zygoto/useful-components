import type { ComponentProps } from "react";

import type { ContainerProps, SizeableComponentProps } from "../types";

type CheckboxType = Omit<
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

type SwitchState =
    | { checked: boolean; defaultChecked?: never }
    | { checked?: undefined; defaultChecked?: boolean };

interface SwitchCore extends CheckboxType, SizeableComponentProps {
    label: string;
    hideLabel?: boolean;
    values?: { on: string; off: string };
    position?: "left" | "right";
    tooltip?: string | { on: string; off: string };
    colors?: [string, string];
    containerProps?: ContainerProps<"label">;
    onValue?: (checked: boolean) => void;
}

export type SwitchProps = SwitchCore & SwitchState;
