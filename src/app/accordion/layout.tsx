import type { PropsWithChildren } from "react";

import AccordionJson from "@/documentation/accordion.json";
import { makeMetadata } from "@/utils/makeData";

export const metadata = makeMetadata(AccordionJson.name, ["disclosure"]);

export default function AccordionLayout({ children }: PropsWithChildren) {
    return children;
}
