import type { PropsWithChildren } from "react";

import menuSelectJson from "@/data/menu-select.json";
import { makeMetadata } from "@/utils/makeData";

export const metadata = makeMetadata(menuSelectJson.name, [
    "select",
    "listbox",
    "form",
]);

export default function MenuSelectLayout({ children }: PropsWithChildren) {
    return children;
}
