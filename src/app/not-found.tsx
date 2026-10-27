"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFoundPage() {
    const pathname = usePathname();

    return (
        <main>
            <h1>404 - Page Not Found</h1>
            <section>
                <p>The page &quot;{pathname}&quot; does not exist.</p>
                <p>
                    Please check the URL or go back to the{" "}
                    <Link href="/">home page</Link>.
                </p>
            </section>
        </main>
    );
}
