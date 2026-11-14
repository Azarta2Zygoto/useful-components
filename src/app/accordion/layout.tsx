import type { PropsWithChildren } from "react";

import AccordionJson from "@/data/accordion.json";
import { makeDescription } from "@/utils/description";

export const metadata = {
    title: AccordionJson.name,
    description: makeDescription(AccordionJson.name),
    keywords: ["accordion", "react", "component", "disclosure"],
    alternates: {
        canonical: "/accordion",
    },
    openGraph: {
        title: AccordionJson.name,
        description: makeDescription(AccordionJson.name),
        type: "article",
    },
    twitter: {
        card: "summary",
        title: AccordionJson.name,
        description: makeDescription(AccordionJson.name),
    },
};

export default function AccordionLayout({ children }: PropsWithChildren) {
    return children;
}
