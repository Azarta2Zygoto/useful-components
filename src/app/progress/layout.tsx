import type { PropsWithChildren } from "react";

import progressJson from "@/data/progress.json";
import { makeMetadata } from "@/utils/makeData";

export const metadata = makeMetadata(progressJson.name, ["progress", "status"]);

export default function ProgressLayout({ children }: PropsWithChildren) {
    return children;
}
