import type { PropsWithChildren } from "react";

import buttonJson from "@/documentation/button.json";
import { makeMetadata } from "@/utils/makeData";

export const metadata = makeMetadata(buttonJson.name, ["button", "link"]);

export default function ButtonLayout({ children }: PropsWithChildren) {
    return children;
}
