import type { PropsWithChildren } from "react";

import sliderJson from "@/documentation/slider.json";
import { makeMetadata } from "@/utils/makeData";

export const metadata = makeMetadata(sliderJson.name, [
    "range",
    "input",
    "form",
]);

export default function SliderLayout({ children }: PropsWithChildren) {
    return children;
}
