import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import toastJson from "@/data/toast.json";
import { makeDescription } from "@/utils/description";

export const metadata: Metadata = {
    title: toastJson.name,
    description: makeDescription(toastJson.name),
    alternates: { canonical: "/toast" },
};

export default function ToastLayout({ children }: PropsWithChildren) {
    return children;
}
