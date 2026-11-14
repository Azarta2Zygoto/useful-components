import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import menuSelectJson from "@/data/menu-select.json";
import { makeDescription } from "@/utils/description";

export const metadata: Metadata = {
    title: menuSelectJson.name,
    description: makeDescription(menuSelectJson.name),
    alternates: { canonical: "/menu-select" },
};

export default function MenuSelectLayout({ children }: PropsWithChildren) {
    return children;
}
