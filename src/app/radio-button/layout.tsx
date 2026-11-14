import type { PropsWithChildren } from "react";

import radioButtonJson from "@/data/radio-button.json";
import { makeMetadata } from "@/utils/makeData";

export const metadata = makeMetadata(radioButtonJson.name, [
    "radio",
    "input",
    "form",
]);

export default function RadioButtonLayout({ children }: PropsWithChildren) {
    return children;
}
