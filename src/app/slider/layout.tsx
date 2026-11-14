import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import sliderJson from "@/data/slider.json";
import { makeDescription } from "@/utils/description";

export const metadata: Metadata = {
    title: sliderJson.name,
    description: makeDescription(sliderJson.name),
    alternates: { canonical: "/slider" },
};

export default function SliderLayout({ children }: PropsWithChildren) {
    return children;
}
