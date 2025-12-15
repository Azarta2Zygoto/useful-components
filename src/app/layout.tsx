import type { Metadata, Viewport } from "next";

import "./globals.css";

import { GlobalProvider } from "@/self/globalProvider";
import Header from "@/self/header";
import ToolbarWrapper from "@/self/subToolbar";


const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(BASE),
    title: "Component Library",
    description:
        "A collection of reusable components for building user interfaces in react.",
    icons: {
        icon: "/useful-components/logo-components.png",
        shortcut: "/useful-components/logo-components.png",
        apple: "/useful-components/logo-components.png",
    },
    openGraph: {
        title: "Component Library",
        description:
            "A collection of reusable components for building user interfaces in react.",
        url: "/",
        images: "/logo-components.png",
        type: "website",
        siteName: "Useful Components",
        locale: "fr_FR",
    },
    twitter: {
        card: "summary_large_image",
        title: "Component Library",
        description:
            "A collection of reusable components for building user interfaces in react.",
        images: "/logo-components.png",
    },
    authors: [
        {
            name: "Quentin Potiron",
            url: "useful-components/humans.txt",
        },
    ],
    keywords: [
        "react",
        "components",
        "library",
        "ui",
        "user interface",
        "dev",
    ],
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: "#F3EDE6",
    colorScheme: "dark light",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body>
                <GlobalProvider>
                    <ToolbarWrapper />
                    <div className="sub-body">
                        <Header />
                        {children}
                    </div>
                </GlobalProvider>
            </body>
        </html>
    );
}
