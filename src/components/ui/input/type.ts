import type { InputHTMLAttributes, LabelHTMLAttributes } from "react";

export type InputVariant = "standard" | "outlined";
export type TextType = "text" | "password" | "email" | "search" | "tel" | "url";

type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "defaultValue"
>;

export interface TextInputProps extends InputProps {
    value?: string;
    defaultValue?: string;
    type?: "text" | "password" | "email" | "search" | "tel" | "url";
    side?: "left" | "top";
    label?: string;
    variant?: InputVariant;
    tooltip?: string;
    width?: number | string;
    state?: "default" | "invalid";
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}
