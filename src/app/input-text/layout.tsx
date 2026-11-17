import type { PropsWithChildren } from "react";

import inputTextJson from "@/documentation/input-text.json";
import { makeMetadata } from "@/utils/makeData";

export const metadata = makeMetadata(inputTextJson.name, [
    "input",
    "text",
    "form",
    "field",
]);

export default function InputTextLayout({ children }: PropsWithChildren) {
    return children;
}
