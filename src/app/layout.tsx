import type { Metadata, Viewport } from "next";
import Link from "next/link";
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
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/checkbox">Checkbox</Link></li>
                <li><Link href="/menuselect">Menu Select</Link></li>
                <li><Link href="/alertBox">Alert Box</Link></li>
                <li><Link href="/radioButton">Radio Button</Link></li>
                <li><Link href="/input">Input</Link></li>
                <li><Link href="/multipleMenuSelect">Multiple Menu Select</Link></li>
                <li><Link href="/switch">Switch</Link></li>
                <li><Link href="/table">Table</Link></li>
                <li><Link href="/form">Form Info</Link></li>
            </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
