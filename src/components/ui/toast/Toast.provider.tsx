"use client";

import { PropsWithChildren, ReactNode } from "react";

import ToastContextProvider, { ToastProviderProps } from "./Toast.context";

export function ToastProvider({
    duration,
    exitDuration,
    tooltip,
    position,
    toastText,
    toastNumberLimit,
    children,
}: Readonly<PropsWithChildren<ToastProviderProps>>): ReactNode {
    return (
        <ToastContextProvider
            duration={duration}
            exitDuration={exitDuration}
            tooltip={tooltip}
            position={position}
            toastText={toastText}
            toastNumberLimit={toastNumberLimit}
        >
            {children}
        </ToastContextProvider>
    );
}
