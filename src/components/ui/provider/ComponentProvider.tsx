import type { PropsWithChildren, ReactNode } from "react";

import ToastContextProvider, {
    type ToastProviderProps,
} from "../toast/Toast.context";
import TooltipLayer from "../tooltip/TooltipLayer";

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
        <ToastContextProvider
            duration={duration}
            exitDuration={exitDuration}
            tooltip={tooltip}
            position={position}
            toastNumberLimit={toastNumberLimit}
            toastText={toastText}
        >
            {children}
            <TooltipLayer />
        </ToastContextProvider>
    );
}
