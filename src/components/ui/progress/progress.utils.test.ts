import { describe, expect, it } from "vitest";

import {
    correctprogressMax,
    correctProgressValue,
} from "./progress.utils";

describe("correctprogressMax", () => {
    it.each([
        ["undefined", undefined],
        ["zéro", 0],
        ["une valeur négative", -10],
        ["NaN", Number.NaN],
    ])("retourne 1 pour %s", (_description, max) => {
        expect(correctprogressMax(max)).toBe(1);
    });

    it("conserve une valeur strictement positive", () => {
        expect(correctprogressMax(100)).toBe(100);
    });
});

describe("correctProgressValue", () => {
    const max = 100;

    it("retourne undefined lorsqu'aucune valeur n'est fournie", () => {
        expect(correctProgressValue(undefined, max)).toBeUndefined();
    });

    it("corrige une valeur négative à zéro", () => {
        expect(correctProgressValue(-10, max)).toBe(0);
    });

    it("conserve zéro", () => {
        expect(correctProgressValue(0, max)).toBe(0);
    });

    it("conserve une valeur comprise entre zéro et max", () => {
        expect(correctProgressValue(42, max)).toBe(42);
    });

    it("conserve la valeur maximale", () => {
        expect(correctProgressValue(max, max)).toBe(max);
    });

    it("limite une valeur supérieure à max", () => {
        expect(correctProgressValue(150, max)).toBe(max);
    });

    it("corrige NaN à zéro", () => {
        expect(correctProgressValue(Number.NaN, max)).toBe(0);
    });
});
