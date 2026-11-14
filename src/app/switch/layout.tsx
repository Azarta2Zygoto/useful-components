import type { PropsWithChildren } from "react";

import switchJson from "@/data/switch.json";
import { makeMetadata } from "@/utils/makeData";

export const metadata = makeMetadata(switchJson.name, [
    "toggle",
    "checkbox",
    "form",
]);

export default function SwitchLayout({ children }: PropsWithChildren) {
    return children;
}
