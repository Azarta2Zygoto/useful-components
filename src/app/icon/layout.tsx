import type { PropsWithChildren } from "react";

import iconJson from "@/documentation/icon.json";
import { makeMetadata } from "@/utils/makeData";

export const metadata = makeMetadata(iconJson.name, ["icon", "svg", "image"]);

export default function IconLayout({ children }: PropsWithChildren) {
    return children;
}
