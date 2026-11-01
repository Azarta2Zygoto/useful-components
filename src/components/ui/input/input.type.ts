import type { ComponentProps } from "react";

import type {
    AdornmentProps,
    FieldProps,
    LabelLayoutProps,
    SizeableComponentProps,
} from "../utils/types";

export type InputVariant = "underlined" | "outlined";
export type TextInputType =
    "text" | "password" | "email" | "search" | "tel" | "url";
export type InputType =
    | TextInputType
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week";

export interface InputProps
    extends
        Omit<ComponentProps<"input">, "type" | "size">,
        SizeableComponentProps {
    type?: InputType;
    variant?: InputVariant;
}

export interface TextAreaProps
    extends ComponentProps<"textarea">, SizeableComponentProps {
    minRows?: number;
    maxRows?: number;
    onValue?: (value: string) => void;
}
export type TextAreaFieldProps = TextAreaProps & LabelLayoutProps & FieldProps;

export interface TextFieldProps
    extends
        Omit<InputProps, "type" | "value" | "defaultValue">,
        LabelLayoutProps,
        FieldProps,
        AdornmentProps {
    type?: TextInputType;
    floatingLabel?: boolean;
    value?: string;
    defaultValue?: string;
    onValue?: (value: string) => void;
}

export interface NumberProps extends Omit<
    InputProps,
    "type" | "value" | "defaultValue"
> {
    value?: number | null;
    defaultValue?: number;
    hasStep?: boolean;
    onValue?: (value: number | null) => void;
}

export interface NumberFieldProps
    extends NumberProps, LabelLayoutProps, FieldProps, AdornmentProps {
    floatingLabel?: boolean;
}
