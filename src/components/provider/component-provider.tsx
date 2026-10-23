import type { PropsWithChildren, ReactNode } from "react";

import ToastContextProvider, {
    type ToastProviderProps,
} from "../toast/toast-context";
import { TooltipContextProvider } from "../tooltip/tooltip-context";
import { TooltipLayer } from "../tooltip/tooltip-layer";

type ComponentProviderProps = ToastProviderProps;

export default function ComponentProvider({
    duration,
    exitDuration,
    tooltip,
    position,
    toastNumberLimit,
    toastText,
    children,
}: Readonly<PropsWithChildren<ComponentProviderProps>>): ReactNode {
    return (
        <TooltipContextProvider>
            <ToastContextProvider
                duration={duration}
                exitDuration={exitDuration}
                tooltip={tooltip}
                position={position}
                toastNumberLimit={toastNumberLimit}
                toastText={toastText}
            >
                {children}
            </ToastContextProvider>
            <TooltipLayer />
        </TooltipContextProvider>
    );
}
