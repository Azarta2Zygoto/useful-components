import type { ComponentProps } from "react";

import type { SizeableComponentProps } from "../types";

export type ButtonVariant =
    "primary" | "secondary" | "danger" | "transparent" | "success";

type Button = Omit<ComponentProps<"button">, "aria-busy" | "aria-pressed">;
export interface ButtonProps extends Button, SizeableComponentProps {
    variant?: ButtonVariant;
    loading?: boolean;
    ripple?: boolean;
    pressed?: boolean;
}
