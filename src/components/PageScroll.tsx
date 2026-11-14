"use client";

import {
    type PropsWithChildren,
    type ReactNode,
    useEffect,
    useRef,
} from "react";

import Footer from "./Footer";
import TableOfContents from "./table/TableOfContent";

import { makeDescription } from "@/utils/description";

interface PageScrollProps extends PropsWithChildren {
    name?: string;
    link?: string;
}

export default function PageScroll({
    name,
    link,
    children,
}: PageScrollProps): ReactNode {
    const mainRef = useRef<HTMLElement>(null);
    useEffect(() => {
        const scrollToHash = () => {
            const id = window.location.hash.slice(1);
            if (!id) return;

            requestAnimationFrame(() => {
                document.getElementById(id)?.scrollIntoView({
                    behavior: "auto",
                    block: "start",
                });
            });
        };

        scrollToHash();
        window.addEventListener("hashchange", scrollToHash);

        return () => window.removeEventListener("hashchange", scrollToHash);
    }, []);

    return (
        <>
            <main ref={mainRef}>
                {name && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "TechArticle",
                                headline: name,
                                description: makeDescription(name),
                            }),
                        }}
                    />
                )}
                {children}
                <TableOfContents sharedRef={mainRef} />
            </main>
            <Footer
                link={link}
                name={name}
            />
        </>
    );
}
