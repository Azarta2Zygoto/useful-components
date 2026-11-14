import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import radioButtonJson from "@/data/radio-button.json";
import { makeDescription } from "@/utils/description";

export const metadata: Metadata = {
    title: radioButtonJson.name,
    description: makeDescription(radioButtonJson.name),
    alternates: { canonical: "/radio-button" },
};

export default function RadioButtonLayout({ children }: PropsWithChildren) {
    return children;
}
