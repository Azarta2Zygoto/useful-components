import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import checkboxJson from "@/data/checkbox.json";
import { makeDescription } from "@/utils/description";

export const metadata: Metadata = {
    title: checkboxJson.name,
    description: makeDescription(checkboxJson.name),
    alternates: { canonical: "/checkbox" },
};

export default function CheckboxLayout({ children }: PropsWithChildren) {
    return children;
}
