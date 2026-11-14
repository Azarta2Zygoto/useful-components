import type { ButtonProps } from "../button/button.type";
import type { InputVariant } from "../input/input.type";
import type { AdornmentProps, FieldProps, LabelLayoutProps } from "../types";

export interface MenuSelectTextProps {
    placeholder?: string;
    noOptions?: string;
}
export interface MenuSelectOption {
    value: string;
    label: string;
}

type MenuSelectType = Omit<
    ButtonProps,
    | "value"
    | "defaultValue"
    | "variant"
    | "pressed"
    | "children"
    | "popoverTarget"
    | "popoverTargetAction"
>;
export interface MenuSelectProps
    extends MenuSelectType, LabelLayoutProps, FieldProps, AdornmentProps {
    options: MenuSelectOption[];
    variant?: InputVariant;
    required?: boolean;
    readOnly?: boolean;
    value?: MenuSelectOption;
    defaultValue?: MenuSelectOption;
    floatingLabel?: boolean;
    text?: MenuSelectTextProps;
    width?: string;
    onValue?: (option: MenuSelectOption) => void;
}
