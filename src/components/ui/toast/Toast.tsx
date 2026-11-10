import {
    type CSSProperties,
    type KeyboardEvent,
    type ReactNode,
    memo,
    useRef,
} from "react";

import ErrorIcon from "../assets/icons/error.svg";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import type { ToastItem } from "./Toast.context";

interface ToastProps {
    toast: ToastItem;
    exitDuration: number;
    closeLabel: string;
    tooltip: boolean;
    onDismiss: (id: number) => void;
    onPause: (id: number) => void;
    onResume: (id: number) => void;
}

const Toast = memo(function ToastView({
    toast,
    exitDuration,
    closeLabel,
    tooltip,
    onDismiss,
    onPause,
    onResume,
}: Readonly<ToastProps>): ReactNode {
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
                data-uc-tooltip={hasTooltip ? label : undefined}
                variant="transparent"
                aria-label={label}
                onClick={() => onDismiss(toast.id)}
            >
                <Icon icon={ErrorIcon} />
            </Button>
        </div>
    );
});

export default Toast;
