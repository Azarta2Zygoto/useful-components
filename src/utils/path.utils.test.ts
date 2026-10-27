import { describe, expect, it } from "vitest";

import { buildAssetPath } from "./path.utils";

describe("buildAssetPath", () => {
    it("construit un chemin avec un basePath", () => {
        expect(buildAssetPath("logo.svg", "/profile/")).toBe(
            "/profile/logo.svg",
        );
    });

    it("fonctionne avec un basePath racine", () => {
        expect(buildAssetPath("photo.jpg", "/")).toBe("/photo.jpg");
    });

    it("fonctionne avec un basePath vide", () => {
        expect(buildAssetPath("logo.svg", "")).toBe("logo.svg");
    });

    it("concatène les chemins sans ajouter de slash", () => {
        expect(buildAssetPath("logo.svg", "/profile")).toBe("/profilelogo.svg");
    });

    it("fonctionne avec un asset dans un sous-dossier", () => {
        expect(buildAssetPath("images/photo.jpg", "/assets/")).toBe(
            "/assets/images/photo.jpg",
        );
    });
});
