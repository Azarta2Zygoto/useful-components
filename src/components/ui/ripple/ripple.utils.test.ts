import { afterEach, describe, expect, it, vi } from "vitest";

import { prefersReducedMotion } from "./ripple.utils";

describe("prefersReducedMotion", () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("retourne false côté serveur lorsque window est indisponible", () => {
        vi.stubGlobal("window", undefined);

        expect(prefersReducedMotion()).toBe(false);
    });

    it("retourne false lorsque matchMedia est indisponible", () => {
        vi.stubGlobal("window", {});

        expect(prefersReducedMotion()).toBe(false);
    });

    it("interroge la préférence de réduction des animations", () => {
        const matchMedia = vi.fn().mockReturnValue({ matches: true });
        vi.stubGlobal("window", { matchMedia });

        expect(prefersReducedMotion()).toBe(true);
        expect(matchMedia).toHaveBeenCalledWith(
            "(prefers-reduced-motion: reduce)",
        );
    });

    it("retourne false lorsque la réduction des animations n'est pas préférée", () => {
        vi.stubGlobal("window", {
            matchMedia: vi.fn().mockReturnValue({ matches: false }),
        });

        expect(prefersReducedMotion()).toBe(false);
    });
});
