import type { Metadata } from "next";

import { APP_CONFIG } from "@/types/common.constant";

export function makeDescription(component: string): string {
    return `The page provides an overview of the ${component} component of the useful components library, its properties, and accessibility considerations.`;
}

export function makeMetadata(name: string, keywords: string[] = []): Metadata {
    const lower = name.toLowerCase();
    const desc = makeDescription(name);

    return {
        title: name,
        description: desc,
        keywords: [...keywords, lower, "react", "component"],
        alternates: {
            canonical: `/${lower}`,
        },
        openGraph: {
            title: name,
            description: desc,
            url: `/${lower}`,
            type: "article",
            siteName: APP_CONFIG.title,
            images: APP_CONFIG.ogImage,
            locale: "en_US",
        },
        twitter: {
            card: "summary",
            title: name,
            description: desc,
            images: APP_CONFIG.ogImage,
        },
    };
}
