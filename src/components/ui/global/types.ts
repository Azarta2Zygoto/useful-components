import type { ComponentProps, ReactNode } from "react";

export interface LabelLayoutProps {
    label: ReactNode;
    labelPosition?: "left" | "top";
    labelProps?: ComponentProps<"label">;
}
