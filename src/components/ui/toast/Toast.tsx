import {
    type CSSProperties,
    type KeyboardEvent,
    type ReactNode,
    memo,
    useRef,
} from "react";

import ErrorIcon from "../assets/icons/error.svg";
import InfoIcon from "../assets/icons/info.svg";
import SuccessIcon from "../assets/icons/success.svg";
import WarningIcon from "../assets/icons/warning.svg";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import type { ToastProps } from "./toast.type";

const Toast = memo(function ToastView({
    toast,
    size,
    exitDuration,
    toastText,
    tooltip,
    onDismiss,
    onPause,
    onResume,
}: ToastProps): ReactNode {
    const interaction = useRef({ hovered: false, focused: false });

    const innerToastText = {
        ...toast.options?.toastText,
        ...toastText,
    };
    const hasTooltip = toast.options?.tooltip ?? tooltip;
    const correctedSize = toast.options?.size ?? size;

    const toastElement = {
        success: { icon: SuccessIcon, aria: innerToastText.success },
        error: { icon: ErrorIcon, aria: innerToastText.error },
        info: { icon: InfoIcon, aria: innerToastText.info },
        warning: { icon: WarningIcon, aria: innerToastText.warning },
    };

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
            data-uc-toast={`${toast.type}-${toast.state}`}
            data-uc-size={correctedSize}
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
            <Icon
                icon={toastElement[toast.type].icon}
                aria-label={toastElement[toast.type].aria}
            />
            {toast.message}
            <Button
                data-uc-tooltip={hasTooltip ? innerToastText.close : undefined}
                variant="transparent"
                aria-label={innerToastText.close}
                onClick={() => onDismiss(toast.id)}
            >
                <Icon icon={ErrorIcon} />
            </Button>
        </div>
    );
});

export default Toast;
