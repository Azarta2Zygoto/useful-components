import type { PropsWithChildren } from "react";

import tooltipJson from "@/data/tooltip.json";
import { makeMetadata } from "@/utils/makeData";

export const metadata = makeMetadata(tooltipJson.name, [
    "hint",
    "popover",
    "overlay",
]);

export default function TooltipLayout({ children }: PropsWithChildren) {
    return children;
}
