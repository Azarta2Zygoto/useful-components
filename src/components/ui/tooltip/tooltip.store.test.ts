import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { tooltipStore } from "./tooltip.store";

const tip = (ownerId: string) => ({
    ownerId,
    content: ownerId,
    placement: "bottom" as const,
    anchor: null,
});

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
    tooltipStore.release("A");
    tooltipStore.release("B");
    vi.useRealTimers();
});

describe("tooltipStore", () => {
    it("n'éteint pas l'infobulle suivante", () => {
        tooltipStore.show(tip("A"), 0);
        tooltipStore.hide("A");
        vi.advanceTimersByTime(50);
        tooltipStore.show(tip("B"), 0);
        vi.advanceTimersByTime(200);
        expect(tooltipStore.getSnapshot()).toMatchObject({
            ownerId: "B",
            visible: true,
        });
    });

    it("masque après le délai de grâce", () => {
        tooltipStore.show(tip("A"), 0);
        tooltipStore.hide("A");
        vi.advanceTimersByTime(99);
        expect(tooltipStore.getSnapshot().visible).toBe(true);
        vi.advanceTimersByTime(1);
        expect(tooltipStore.getSnapshot().visible).toBe(false);
    });

    it("cancelHide garde l'infobulle ouverte", () => {
        tooltipStore.show(tip("A"), 0);
        tooltipStore.hide("A");
        tooltipStore.cancelHide();
        vi.advanceTimersByTime(200);
        expect(tooltipStore.getSnapshot().visible).toBe(true);
    });

    it("release annule une ouverture différée", () => {
        tooltipStore.show(tip("A"), 500);
        tooltipStore.release("A");
        vi.advanceTimersByTime(1000);
        expect(tooltipStore.getSnapshot().visible).toBe(false);
    });
});
