import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import buttonJson from "@/data/button.json";
import { makeDescription } from "@/utils/description";

export const metadata: Metadata = {
    title: buttonJson.name,
    description: makeDescription(buttonJson.name),
    alternates: { canonical: "/button" },
};

export default function ButtonLayout({ children }: PropsWithChildren) {
    return children;
}
