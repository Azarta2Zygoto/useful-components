import type { PropsWithChildren } from "react";

import inputNumberJson from "@/documentation/input-number.json";
import { makeMetadata } from "@/utils/makeData";

export const metadata = makeMetadata(inputNumberJson.name, [
    "number",
    "input",
    "form",
    "field",
]);

export default function InputNumberLayout({ children }: PropsWithChildren) {
    return children;
}
