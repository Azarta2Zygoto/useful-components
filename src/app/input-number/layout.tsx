import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import inputNumberJson from "@/data/input-number.json";
import { makeDescription } from "@/utils/description";

export const metadata: Metadata = {
    title: inputNumberJson.name,
    description: makeDescription(inputNumberJson.name),
    alternates: { canonical: "/input-number" },
};

export default function InputNumberLayout({ children }: PropsWithChildren) {
    return children;
}
