import type { ComponentProps, ReactNode } from "react";

export interface LabelLayoutProps {
    label: ReactNode;
    labelPosition?: "left" | "top";
    labelProps?: ComponentProps<"label">;
}

export interface FieldProps {
    error?: string;
    errorProps?: ComponentProps<"p">;
}
