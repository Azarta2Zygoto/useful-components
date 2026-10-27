import type { ComponentProps, LabelHTMLAttributes } from "react";

export type InputVariant = "underline" | "outlined";
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

export interface InputProps extends Omit<ComponentProps<"input">, "type"> {
    type?: InputType;
    tooltip?: boolean;
    variant?: InputVariant;
}

export interface TextInputProps extends Omit<
    InputProps,
    "type" | "value" | "defaultValue"
> {
    type?: TextInputType;
    value?: string;
    defaultValue?: string;
    label: string;
    labelPosition?: "left" | "top";
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}
