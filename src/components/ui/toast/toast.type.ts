import type { PropsWithChildren, ReactNode } from "react";

import type { Size, SizeableComponentProps } from "../types";

export type ToastType = "success" | "error" | "info" | "warning";
type ToastState = "visible" | "exiting";
type ToastPosition = "tl" | "tr" | "bl" | "br";

export interface ToastTextProps {
    close?: string;
    info?: string;
    success?: string;
    warning?: string;
    error?: string;
}

export interface ToastOptions {
    duration?: number;
    exitDuration?: number;
    tooltip?: boolean;
    toastText?: ToastTextProps;
    size?: Size;
    onClose?: () => void;
}

export interface ToastItem {
    id: number;
    type: ToastType;
    message: ReactNode;
    options: ToastOptions | undefined;
    state: ToastState;
}

export interface ToastRuntime {
    exitDuration: number;
    remaining: number;
    startedAt: number;
    timer?: number;
    exitTimer?: number;
    onClose?: () => void;
}

export interface ToastContextValue {
    success: (message: ReactNode, options?: ToastOptions) => number;
    error: (message: ReactNode, options?: ToastOptions) => number;
    info: (message: ReactNode, options?: ToastOptions) => number;
    warning: (message: ReactNode, options?: ToastOptions) => number;
    dismiss: (id: number) => void;
}

export interface ToastProviderProps
    extends SizeableComponentProps, PropsWithChildren {
    duration?: number;
    exitDuration?: number;
    tooltip?: boolean;
    position?: ToastPosition;
    toastNumberLimit?: number;
    toastText?: ToastTextProps;
}

export interface ToastProps extends SizeableComponentProps {
    toast: ToastItem;
    exitDuration: number;
    toastText: Required<ToastTextProps>;
    tooltip: boolean;
    onDismiss: (id: number) => void;
    onPause: (id: number) => void;
    onResume: (id: number) => void;
}
