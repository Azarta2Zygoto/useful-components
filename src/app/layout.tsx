import type { Metadata, Viewport } from "next";

import "./globals.css";

import { GlobalProvider } from "@/self/globalProvider";
import Header from "@/self/header";
import ToolbarWrapper from "@/self/subToolbar";

export const metadata: Metadata = {
    title: "Component Library",
    description:
        "A collection of reusable components for building user interfaces in react.",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
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
