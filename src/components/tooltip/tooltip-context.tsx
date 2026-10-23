"use client";

import {
    type PropsWithChildren,
    type ReactNode,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

export type TooltipPlacement =
    "t" | "b" | "l" | "r" | "tl" | "tr" | "bl" | "br";

export interface TooltipState {
    anchor: HTMLElement;
    content: ReactNode;
    open: boolean;
    placement?: TooltipPlacement;
    offset?: number;
}

interface ShowTooltipOptions {
    anchor: HTMLElement;
    content: ReactNode;
    placement?: TooltipPlacement;
    offset?: number;
    time?: number;
}

interface TooltipContextValue {
    active: TooltipState | null;
    show: (element: ShowTooltipOptions) => void;
    hide: (anchor: HTMLElement) => void;
}

const DEFAULT_WAITING_TIME = 500;
const EXIT_DURATION = 150;

const TooltipContext = createContext<TooltipContextValue | null>(null);

export function TooltipContextProvider({
    children,
}: Readonly<PropsWithChildren>): ReactNode {
    const [active, setActive] = useState<TooltipState | null>(null);
    const timeoutRef = useRef<{
        id: ReturnType<typeof setTimeout>;
        anchor: HTMLElement;
    } | null>(null);

    useEffect(() => {
        if (!active || active.open) return;

        const id = setTimeout(() => {
            setActive((current) => (current && !current.open ? null : current));
        }, EXIT_DURATION);

        return () => clearTimeout(id);
    }, [active]);

    const clearPending = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current.id);
            timeoutRef.current = null;
        }
    };

    const show = ({
        anchor,
        content,
        placement,
        offset,
        time = DEFAULT_WAITING_TIME,
    }: ShowTooltipOptions) => {
        clearPending(); // évite d'empiler plusieurs timers

        const id = setTimeout(() => {
            timeoutRef.current = null;
            setActive({ anchor, content, placement, offset, open: true });
        }, time);

        timeoutRef.current = { id, anchor };
    };

    const hide = (anchor: HTMLElement) => {
        if (timeoutRef.current?.anchor === anchor) {
            clearPending();
        }
        setActive((current) =>
            current?.anchor === anchor && current.open
                ? { ...current, open: false }
                : current,
        );
    };

    return (
        <TooltipContext.Provider value={{ active, show, hide }}>
            {children}
        </TooltipContext.Provider>
    );
}

export function useTooltipContext() {
    const context = useContext(TooltipContext);

    if (!context) {
        throw new Error(
            "useTooltip need to be used within a TooltipContextProvider",
        );
    }

    return context;
}
