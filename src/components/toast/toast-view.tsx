import {
    CSSProperties,
    type KeyboardEvent,
    type ReactNode,
    memo,
    useRef,
} from "react";

import Button from "../button/button";
import Icon from "../utils/icon";
import { ToastItem } from "./toast-context";

interface ToastViewProps {
    toast: ToastItem;
    exitDuration: number;
    closeLabel: string;
    tooltip: boolean;
    onDismiss: (id: number) => void;
    onPause: (id: number) => void;
    onResume: (id: number) => void;
}

export const ToastView = memo(function ToastView({
    toast,
    exitDuration,
    closeLabel,
    tooltip,
    onDismiss,
    onPause,
    onResume,
}: Readonly<ToastViewProps>): ReactNode {
    const interaction = useRef({ hovered: false, focused: false });

    const label = toast.options?.toastText?.close ?? closeLabel;
    const hasTooltip = toast.options?.tooltip ?? tooltip;

    const sync = () => {
        const { hovered, focused } = interaction.current;

        if (hovered || focused) {
            onPause(toast.id);
        } else {
            onResume(toast.id);
        }
    };

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") {
            onDismiss(toast.id);
        }
    };

    return (
        <div
            data-toast={toast.type}
            data-toast-state={toast.state}
            style={
                {
                    "--toast-exit-duration": `${toast.options?.exitDuration ?? exitDuration}ms`,
                } as CSSProperties
            }
            onPointerEnter={(event) => {
                if (event.pointerType !== "mouse") return;
                interaction.current.hovered = true;
                sync();
            }}
            onPointerLeave={(event) => {
                if (event.pointerType !== "mouse") return;
                interaction.current.hovered = false;
                sync();
            }}
            onFocus={() => {
                interaction.current.focused = true;
                sync();
            }}
            onBlur={(event) => {
                if (event.currentTarget.contains(event.relatedTarget)) return;
                interaction.current.focused = false;
                sync();
            }}
            onKeyDown={onKeyDown}
        >
            {toast.message}
            <Button
                tooltip={hasTooltip ? label : undefined}
                variant="transparent"
                aria-label={label}
                onClick={() => onDismiss(toast.id)}
            >
                <Icon name="x-circle-fill" />
            </Button>
        </div>
    );
});
