import type { ReactNode } from "react";

export type Placement =
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "left-top"
    | "left-bottom"
    | "right-top"
    | "right-bottom";

export interface TooltipState {
    visible: boolean;
    ownerId: string | null;
    content: ReactNode;
    placement: Placement;
    anchor: HTMLElement | null;
}

const initialState: TooltipState = {
    visible: false,
    ownerId: null,
    content: null,
    placement: "bottom",
    anchor: null,
};

let state: TooltipState = initialState;
const listeners = new Set<() => void>();

let showTimer: ReturnType<typeof setTimeout> | undefined;
let pendingOwnerId: string | null = null;

function clearPending() {
    if (showTimer !== undefined) {
        clearTimeout(showTimer);
        showTimer = undefined;
    }
    pendingOwnerId = null;
}

function setState(next: TooltipState) {
    state = next; // nouvelle référence : obligatoire pour useSyncExternalStore
    listeners.forEach((listener) => listener());
}

export const tooltipStore = {
    subscribe(listener: () => void) {
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    },

    getSnapshot: () => state,

    getServerSnapshot: () => initialState,

    show(next: Omit<TooltipState, "visible">, delay: number) {
        clearPending();

        if (delay <= 0 || state.visible) {
            setState({ ...next, visible: true });
            return;
        }

        pendingOwnerId = next.ownerId;
        showTimer = setTimeout(() => {
            showTimer = undefined;
            pendingOwnerId = null;
            setState({ ...next, visible: true });
        }, delay);
    },

    hide(ownerId: string) {
        if (pendingOwnerId === ownerId) {
            clearPending();
        }

        if (state.ownerId !== ownerId || !state.visible) return;
        setState({ ...state, visible: false });
    },

    hideAll() {
        clearPending();

        if (!state.visible) return;
        setState({ ...state, visible: false });
    },
};
