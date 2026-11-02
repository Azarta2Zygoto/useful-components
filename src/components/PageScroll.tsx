"use client";

import { type PropsWithChildren, type ReactNode, useEffect } from "react";

export default function PageScroll({
    children,
}: Readonly<PropsWithChildren>): ReactNode {
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

    return <main>{children}</main>;
}
