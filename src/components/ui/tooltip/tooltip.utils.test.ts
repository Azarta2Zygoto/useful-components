import { describe, expect, it } from "vitest";

import type { Placement } from "./tooltip.type";
import { tooltipPlacement } from "./tooltip.utils";

const element = {
    top: 100,
    bottom: 140,
    left: 200,
    right: 260,
    width: 60,
    height: 40,
} as DOMRect;

const width = 80;
const height = 20;
const gap = 10;

describe("tooltipPlacement", () => {
    it.each([
        ["top", { top: 70, left: 190 }],
        ["bottom", { top: 150, left: 190 }],
        ["left", { top: 110, left: 110 }],
        ["right", { top: 110, left: 270 }],
        ["top-left", { top: 70, left: 110 }],
        ["left-top", { top: 70, left: 110 }],
        ["top-right", { top: 70, left: 270 }],
        ["right-top", { top: 70, left: 270 }],
        ["bottom-left", { top: 150, left: 110 }],
        ["left-bottom", { top: 150, left: 110 }],
        ["bottom-right", { top: 150, left: 270 }],
        ["right-bottom", { top: 150, left: 270 }],
    ] as const)("calcule la position pour %s", (placement, expected) => {
        expect(
            tooltipPlacement(element, placement, width, height, gap),
        ).toEqual(expected);
    });

    it("lève une erreur pour un placement invalide", () => {
        expect(() =>
            tooltipPlacement(
                element,
                "invalid" as Placement,
                width,
                height,
                gap,
            ),
        ).toThrow("Unknown tooltip placement: invalid");
    });
});
