import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import iconJson from "@/data/icon.json";
import { makeDescription } from "@/utils/description";

export const metadata: Metadata = {
    title: iconJson.name,
    description: makeDescription(iconJson.name),
    alternates: { canonical: "/icon" },
};

export default function IconLayout({ children }: PropsWithChildren) {
    return children;
}
