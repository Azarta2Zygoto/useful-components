import type { ReactNode } from "react";

import ToastProvider from "../toast/Toast.context";
import type { ToastProviderProps } from "../toast/toast.type";
import TooltipLayer from "../tooltip/TooltipLayer";

type ComponentProviderProps = ToastProviderProps;

export default function ComponentProvider({
    duration,
    exitDuration,
    tooltip,
    position,
    toastNumberLimit,
    toastText,
    size,
    children,
}: ComponentProviderProps): ReactNode {
    return (
        <ToastProvider
            duration={duration}
            exitDuration={exitDuration}
            tooltip={tooltip}
            position={position}
            toastNumberLimit={toastNumberLimit}
            toastText={toastText}
            size={size}
        >
            {children}
            <TooltipLayer />
        </ToastProvider>
    );
}
