import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import tooltipJson from "@/data/tooltip.json";
import { makeDescription } from "@/utils/description";

export const metadata: Metadata = {
    title: tooltipJson.name,
    description: makeDescription(tooltipJson.name),
    alternates: { canonical: "/tooltip" },
};

export default function TooltipLayout({ children }: PropsWithChildren) {
    return children;
}
