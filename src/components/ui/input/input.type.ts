import type { ComponentProps } from "react";

import { LabelLayoutProps } from "../global/types";

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
    onValue?: (value: string) => void;
}
export type TextAreaInputProps = TextAreaProps & LabelLayoutProps;

export interface TextInputProps
    extends
        Omit<InputProps, "type" | "value" | "defaultValue">,
        LabelLayoutProps {
    type?: TextInputType;
    value?: string;
    defaultValue?: string;
    onValue?: (value: string) => void;
}

export interface NumberInputProps extends Omit<
    InputProps,
    "type" | "value" | "defaultValue"
> {
    value?: number | null;
    defaultValue?: number;
    onValue?: (value: number | null) => void;
}
