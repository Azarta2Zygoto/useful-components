"use client";

import {
    type PropsWithChildren,
    type ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import Toast from "./Toast";
import "./toast.css";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastTextProps {
    close?: string;
}

const defaultText: Required<ToastTextProps> = {
    close: "Close",
};

export interface ToastOptions {
    duration?: number;
    exitDuration?: number;
    tooltip?: boolean;
    toastText?: ToastTextProps;
    onClose?: () => void;
}

type ToastState = "visible" | "exiting";

export interface ToastItem {
    id: number;
    type: ToastType;
    message: ReactNode;
    options: ToastOptions | undefined;
    state: ToastState;
}

interface ToastRuntime {
    exitDuration: number;
    remaining: number;
    startedAt: number;
    timer?: number;
    exitTimer?: number;
    onClose?: () => void;
}

interface ToastContextValue {
    success: (message: ReactNode, options?: ToastOptions) => number;
    error: (message: ReactNode, options?: ToastOptions) => number;
    info: (message: ReactNode, options?: ToastOptions) => number;
    warning: (message: ReactNode, options?: ToastOptions) => number;
    dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
    duration?: number;
    exitDuration?: number;
    tooltip?: boolean;
    position?: "tl" | "tr" | "bl" | "br";
    toastNumberLimit?: number;
    toastText?: ToastTextProps;
}

export default function ToastContextProvider({
    children,
    duration = 3000,
    exitDuration = 300,
    tooltip = true,
    position = "tr",
    toastNumberLimit = 5,
    toastText,
}: Readonly<PropsWithChildren<ToastProviderProps>>): ReactNode {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const nextId = useRef(0);
    const runtimes = useRef(new Map<number, ToastRuntime>());

    const finishDismiss = useCallback((id: number) => {
        const runtime = runtimes.current.get(id);

        if (runtime) {
            window.clearTimeout(runtime.timer);
            window.clearTimeout(runtime.exitTimer);
            runtimes.current.delete(id);
        }

        setToasts((current) => current.filter((toast) => toast.id !== id));
    }, []);

    const dismiss = useCallback(
        (id: number) => {
            const runtime = runtimes.current.get(id);

            // On retire éventuellement le toast
            if (!runtime) {
                finishDismiss(id);
                return;
            }

            // toast en cours de suppression : on ne fait rien
            if (runtime.exitTimer !== undefined) {
                return;
            }

            window.clearTimeout(runtime.timer);
            runtime.timer = undefined;

            setToasts((current) =>
                current.map((toast) =>
                    toast.id === id ? { ...toast, state: "exiting" } : toast,
                ),
            );

            runtime.exitTimer = window.setTimeout(() => {
                finishDismiss(id);
            }, runtime.exitDuration);

            runtime.onClose?.();
        },
        [finishDismiss],
    );

    const startTimer = useCallback(
        (id: number) => {
            const runtime = runtimes.current.get(id);

            if (!runtime || !Number.isFinite(runtime.remaining)) {
                return;
            }

            runtime.startedAt = performance.now();
            runtime.timer = window.setTimeout(
                () => dismiss(id),
                Math.max(runtime.remaining, 0),
            );
        },
        [dismiss],
    );

    const pause = useCallback((id: number) => {
        const runtime = runtimes.current.get(id);

        if (!runtime || runtime.timer === undefined) {
            return;
        }

        window.clearTimeout(runtime.timer);
        runtime.timer = undefined;
        runtime.remaining -= performance.now() - runtime.startedAt;
    }, []);

    const resume = useCallback(
        (id: number) => {
            const runtime = runtimes.current.get(id);

            if (
                !runtime ||
                runtime.timer !== undefined ||
                runtime.exitTimer !== undefined
            ) {
                return;
            }

            startTimer(id);
        },
        [startTimer],
    );

    const show = useCallback(
        (
            type: ToastType,
            message: ReactNode,
            options?: ToastOptions,
        ): number => {
            const id = ++nextId.current;
            const timeout = options?.duration ?? duration;

            runtimes.current.set(id, {
                exitDuration: options?.exitDuration ?? exitDuration,
                remaining:
                    timeout > 0 && Number.isFinite(timeout)
                        ? timeout
                        : Infinity,
                startedAt: 0,
                onClose: options?.onClose,
            });

            setToasts((current) => [
                ...current,
                { id, type, message, options, state: "visible" },
            ]);

            startTimer(id);

            // Respect de la limite : on ferme les plus anciens toasts actifs
            if (Number.isFinite(toastNumberLimit) && toastNumberLimit > 0) {
                const active = Array.from(runtimes.current).filter(
                    ([, runtime]) => runtime.exitTimer === undefined,
                );
                const excess = active.length - toastNumberLimit;

                if (excess > 0) {
                    active.slice(0, excess).forEach(([oldId]) => {
                        dismiss(oldId);
                    });
                }
            }

            return id;
        },
        [dismiss, startTimer, duration, exitDuration, toastNumberLimit],
    );

    useEffect(() => {
        const map = runtimes.current;

        return () => {
            map.forEach((runtime) => {
                window.clearTimeout(runtime.timer);
                window.clearTimeout(runtime.exitTimer);
            });

            map.clear();
        };
    }, []);

    const value = useMemo<ToastContextValue>(
        () => ({
            success: (message, options) => show("success", message, options),
            error: (message, options) => show("error", message, options),
            info: (message, options) => show("info", message, options),
            warning: (message, options) => show("warning", message, options),
            dismiss,
        }),
        [show, dismiss],
    );

    const closeLabel = toastText?.close ?? defaultText.close;
    return (
        <ToastContext.Provider value={value}>
            {children}
            <div
                className="toast-viewport"
                data-position={position}
                aria-live="polite"
                aria-relevant="additions"
            >
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        toast={toast}
                        exitDuration={exitDuration}
                        closeLabel={closeLabel}
                        tooltip={tooltip}
                        onDismiss={dismiss}
                        onPause={pause}
                        onResume={resume}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast(): ToastContextValue {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast has to be used within a ToastProvider");
    }

    return context;
}
