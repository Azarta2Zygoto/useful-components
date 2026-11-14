import type { ReactNode } from "react";

import type { TooltipState } from "./tooltip.type";

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
let hideTimer: ReturnType<typeof setTimeout> | undefined;
const HIDE_GRACE = 100;

function clearHideTimer() {
    if (hideTimer !== undefined) {
        clearTimeout(hideTimer);
        hideTimer = undefined;
    }
}

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
        clearHideTimer();

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
    hide(ownerId: string, immediate = false) {
        if (pendingOwnerId === ownerId) clearPending();
        if (state.ownerId !== ownerId || !state.visible) return;
        clearHideTimer();
        const apply = () => {
            hideTimer = undefined;
            if (state.ownerId !== ownerId || !state.visible) return;
            setState({ ...state, visible: false });
        };
        if (immediate) apply();
        else hideTimer = setTimeout(apply, state.hideGrace ?? HIDE_GRACE);
    },
    hideCurrent() {
        if (state.ownerId === null) return;
        if (state.anchor?.matches(":focus-visible")) return;
        tooltipStore.hide(state.ownerId);
    },
    hideAll() {
        clearPending();
        clearHideTimer();
        if (!state.visible) return;
        setState({ ...state, visible: false });
    },

    cancelHide: clearHideTimer,

    release(ownerId: string) {
        if (pendingOwnerId === ownerId) clearPending();
        if (state.ownerId !== ownerId) return;
        clearHideTimer();
        setState(initialState);
    },

    update(ownerId: string, content: ReactNode) {
        if (state.ownerId !== ownerId || !state.visible) return;
        if (state.content === content) return;
        setState({ ...state, content });
    },
};
