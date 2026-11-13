import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { PropsWithChildren } from "react";

import "./globals.css";
import "./layers.css";

import { GlobalProvider } from "@/components/GlobalProvider";
import Header from "@/components/Header";
import ToolbarWrapper from "@/components/ToolbarWrapper";
import ComponentProvider from "@/components/ui/provider/Component.provider";
import { APP_CONFIG, ASSETS } from "@/types/common.constant";
import { buildAssetPath } from "@/utils/path.utils";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000";

const title = "Component Library";
const description =
    "A collection of reusable components for building user interfaces in react.";
const ogImage = {
    url: buildAssetPath(ASSETS.LOGO.DARK, "/"),
    width: 64,
    height: 64,
    type: "image/png",
    alt: `${title} logo`,
};

export const metadata: Metadata = {
    metadataBase: new URL(BASE),
    title: {
        default: title,
        template: `%s - ${title}`,
    },
    description: description,
    icons: {
        icon: buildAssetPath(ASSETS.LOGO.DARK),
        shortcut: buildAssetPath(ASSETS.LOGO.DARK),
        apple: buildAssetPath(ASSETS.LOGO.DARK),
    },
    authors: [
        {
            name: "Quentin Potiron",
            url: "https://azarta2zygoto.github.io/profile",
        },
    ],
    creator: "Quentin Potiron",
    publisher: "Quentin Potiron",
    category: "IT & Software",
    generator: "Next.js",
    openGraph: {
        title: title,
        description: description,
        url: "/",
        type: "website",
        siteName: title,
        images: ogImage,
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: ogImage,
    },
    keywords: ["react", "components", "library", "ui", "user interface", "dev"],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: "#1e1f20",
    colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <html lang="fr">
            <body>
                {process.env.NODE_ENV === "development" && (
                    <Script
                        strategy="afterInteractive"
                        src="https://unpkg.com/react-scan@latest/dist/auto.global.js"
                    />
                )}
                <Script
                    strategy="afterInteractive"
                    src={`${APP_CONFIG.basePath}/js/prism.min.js`}
                />
                <GlobalProvider>
                    <ComponentProvider>
                        <ToolbarWrapper />
                        <div className="sub-body">
                            <Header />
                            <div className="content">{children}</div>
                        </div>
                    </ComponentProvider>
                </GlobalProvider>
            </body>
        </html>
    );
}
