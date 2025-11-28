"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NotFound() {
    const pathname = usePathname();

    return (
        <main>
            <h1>404 - Page Not Found</h1>
            <p>The page &quot;{pathname}&quot; does not exist.</p>
            <p>
                Please check the URL or go back to the{" "}
                <Link href="/">home page</Link>.
            </p>
        </main>
    );
}
