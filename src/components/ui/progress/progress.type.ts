import type { ComponentProps, ReactNode } from "react";

import type { ContainerProps } from "../types";

export interface ProgressDot {
    value: number;
    label?: ReactNode;
    props?: ContainerProps<"span">;
}

type Progress = Omit<ComponentProps<"progress">, "children">;
interface ProgressCore extends Progress {
    label: string;
    value: number;
    max?: number;
    height?: string;
    hideLabel?: boolean;
    labelProps?: ContainerProps<"label">;
    dotsProps?: ContainerProps;
}
export interface ProgressDots extends ProgressCore {
    dots?: ProgressDot[];
    labels?: never;
}

export interface ProgressLabels extends ProgressCore {
    dots?: never;
    labels?: ReactNode[];
}

export type ProgressProps = ProgressDots | ProgressLabels;
