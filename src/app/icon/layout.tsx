import type { PropsWithChildren } from "react";

import iconJson from "@/data/icon.json";
import { makeMetadata } from "@/utils/makeData";

export const metadata = makeMetadata(iconJson.name, ["icon", "svg", "image"]);

export default function IconLayout({ children }: PropsWithChildren) {
    return children;
}
