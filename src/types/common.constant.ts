export const APP_CONFIG = {
    basePath: "/useful-components",
    baseUrl:
        process.env.NEXT_PUBLIC_BASE_URL ||
        "http://localhost:3000/useful-components",
} as const;

export const ASSETS = {
    LOGO: {
        LIGHT: "/logo-light.png",
        DARK: "/logo-dark.png",
    },
} as const;
