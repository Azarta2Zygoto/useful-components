import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import progressJson from "@/data/progress.json";
import { makeDescription } from "@/utils/description";

export const metadata: Metadata = {
    title: progressJson.name,
    description: makeDescription(progressJson.name),
    alternates: { canonical: "/progress" },
};

export default function ProgressLayout({ children }: PropsWithChildren) {
    return children;
}
