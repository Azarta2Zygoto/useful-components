import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import dateJson from "@/data/date-tooltip.json";
import { makeDescription } from "@/utils/description";

export const metadata: Metadata = {
    title: dateJson.name,
    description: makeDescription(dateJson.name),
    alternates: { canonical: "/date-info" },
};

export default function DateInfoLayout({ children }: PropsWithChildren) {
    return children;
}
