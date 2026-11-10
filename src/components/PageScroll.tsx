"use client";

import {
    type PropsWithChildren,
    type ReactNode,
    useEffect,
    useRef,
} from "react";

import TableOfContents from "./table/TableOfContent";

export default function PageScroll({
    children,
}: Readonly<PropsWithChildren>): ReactNode {
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
        <main ref={mainRef}>
            {children}
            <TableOfContents sharedRef={mainRef} />
        </main>
    );
}
