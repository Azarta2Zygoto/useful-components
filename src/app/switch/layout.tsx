import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import switchJson from "@/data/switch.json";
import { makeDescription } from "@/utils/description";

export const metadata: Metadata = {
    title: switchJson.name,
    description: makeDescription(switchJson.name),
    alternates: { canonical: "/switch" },
};

export default function SwitchLayout({ children }: PropsWithChildren) {
    return children;
}
