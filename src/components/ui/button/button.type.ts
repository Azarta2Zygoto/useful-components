import type { ComponentProps } from "react";

export type ButtonVariant =
    "primary" | "secondary" | "danger" | "transparent" | "success";

export interface ButtonProps extends ComponentProps<"button"> {
    variant?: ButtonVariant;
    loading?: boolean;
    ripple?: boolean;
    pressed?: boolean;
    tooltip?: boolean;
}
