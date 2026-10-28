import type { ComponentProps, ReactNode } from "react";

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
    variant?: InputVariant;
}

export interface TextAreaProps extends ComponentProps<"textarea"> {
    minRows?: number;
    maxRows?: number;
}

export interface TextInputProps extends Omit<
    InputProps,
    "type" | "value" | "defaultValue"
> {
    type?: TextInputType;
    value?: string;
    defaultValue?: string;
    label: ReactNode;
    labelPosition?: "left" | "top";
    labelProps?: ComponentProps<"label">;
}
