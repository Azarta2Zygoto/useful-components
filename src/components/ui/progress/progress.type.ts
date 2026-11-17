import type { ComponentProps, ReactNode } from "react";

import type {
    ContainerProps,
    LabelLayoutProps,
    SizeableComponentProps,
} from "../types";

interface PreciseDots {
    value: number;
    label?: ReactNode;
    props?: ContainerProps<"span">;
}

export interface PreciseDotsProps extends PreciseDots {
    max: number;
    index: number;
}

type ProgressType = Omit<ComponentProps<"progress">, "children">;
interface ProgressCore
    extends ProgressType, SizeableComponentProps, LabelLayoutProps {
    value?: number;
    max?: number;
    trackHeight?: string;
    containerProps?: ContainerProps;
    dotsProps?: ContainerProps;
}
export interface ProgressPreciseDots extends ProgressCore {
    preciseDots?: PreciseDots[];
    regularDots?: never;
}

export interface ProgressRegularDots extends ProgressCore {
    preciseDots?: never;
    regularDots?: ReactNode[];
}

export type ProgressProps = ProgressPreciseDots | ProgressRegularDots;
