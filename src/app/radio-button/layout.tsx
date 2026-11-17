import type { PropsWithChildren } from "react";

import radioButtonJson from "@/documentation/radio-button.json";
import { makeMetadata } from "@/utils/makeData";

export const metadata = makeMetadata(radioButtonJson.name, [
    "radio",
    "input",
    "form",
]);

export default function RadioButtonLayout({ children }: PropsWithChildren) {
    return children;
}
