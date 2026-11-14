import { buildAssetPath } from "@/utils/path.utils";

export const ASSETS = {
    LOGO: {
        LIGHT: "/logo-light.png",
        DARK: "/logo-dark.png",
    },
} as const;

export const APP_CONFIG = {
    basePath: "/useful-components",
    baseUrl:
        process.env.NEXT_PUBLIC_BASE_URL ||
        "http://localhost:3000/useful-components",
    title: "Component Library",
    description:
        "A collection of reusable components for building user interfaces in react.",
    ogImage: {
        url: buildAssetPath(ASSETS.LOGO.DARK, "/"),
        width: 64,
        height: 64,
        type: "image/png",
        alt: "Component Library logo",
    },
} as const;
