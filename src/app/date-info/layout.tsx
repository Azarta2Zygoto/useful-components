import type { PropsWithChildren } from "react";

import dateJson from "@/data/date-tooltip.json";
import { makeMetadata } from "@/utils/makeData";

export const metadata = makeMetadata(dateJson.name, ["date"]);

export default function DateInfoLayout({ children }: PropsWithChildren) {
    return children;
}
