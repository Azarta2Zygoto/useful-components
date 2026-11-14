import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import inputTextJson from "@/data/input-text.json";
import { makeDescription } from "@/utils/description";

export const metadata: Metadata = {
    title: inputTextJson.name,
    description: makeDescription(inputTextJson.name),
    alternates: { canonical: "/input-text" },
};

export default function InputTextLayout({ children }: PropsWithChildren) {
    return children;
}
