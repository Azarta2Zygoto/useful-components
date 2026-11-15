import { describe, expect, it } from "vitest";

import { getFormatter, toValidDate } from "./date-info.utils";

describe("getFormatter", () => {
    it("crée un formateur pour la locale et les options demandées", () => {
        const formatter = getFormatter("fr-FR", {
            year: "numeric",
            month: "2-digit",
        });

        expect(formatter).toBeInstanceOf(Intl.DateTimeFormat);
        expect(formatter.resolvedOptions()).toMatchObject({
            locale: "fr-FR",
            year: "numeric",
            month: "2-digit",
        });
    });

    it("réutilise le formateur mis en cache pour la même locale et les mêmes options", () => {
        const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        } as const;

        expect(getFormatter("en-GB", options)).toBe(
            getFormatter("en-GB", { ...options }),
        );
    });

    it("ne partage pas le formateur entre des clés différentes", () => {
        expect(getFormatter("en-US", { year: "numeric" })).not.toBe(
            getFormatter("en-US", { month: "numeric" }),
        );
        expect(getFormatter("en-US", { year: "numeric" })).not.toBe(
            getFormatter("fr-FR", { year: "numeric" }),
        );
    });
});

describe("toValidDate", () => {
    it.each([
        ["une instance Date", new Date("2024-01-15T12:30:00.000Z")],
        ["une chaîne ISO", "2024-01-15T12:30:00.000Z"],
        ["un timestamp", Date.parse("2024-01-15T12:30:00.000Z")],
    ])("convertit %s en date valide", (_description, value) => {
        const result = toValidDate(value);

        expect(result).toBeInstanceOf(Date);
        expect(result?.toISOString()).toBe("2024-01-15T12:30:00.000Z");
    });

    it("retourne la même instance lorsqu'une Date valide est fournie", () => {
        const value = new Date("2024-01-15T12:30:00.000Z");

        expect(toValidDate(value)).toBe(value);
    });

    it.each([
        ["une chaîne invalide", "not-a-date"],
        ["un timestamp invalide", Number.NaN],
        ["une Date invalide", new Date(Number.NaN)],
    ])("retourne null pour %s", (_description, value) => {
        expect(toValidDate(value)).toBeNull();
    });
});
