import type { Metadata, Viewport } from "next";
import Toolbar from "@/component/toolbar/toolbar";
import toolbarJSON from "@/data/toolbar.json";
import "./globals.css";

export const metadata: Metadata = {
    title: "Component Library",
    description: "A collection of reusable components for building user interfaces in react.",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Toolbar
            toolbarData={toolbarJSON.toolbar}/>
        {children}
      </body>
    </html>
  );
}
