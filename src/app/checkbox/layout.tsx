import type { PropsWithChildren } from "react";

import checkboxJson from "@/documentation/checkbox.json";
import { makeMetadata } from "@/utils/makeData";

export const metadata = makeMetadata(checkboxJson.name, [
    "checkbox",
    "input",
    "form",
    "field",
]);

export default function CheckboxLayout({ children }: PropsWithChildren) {
    return children;
}
