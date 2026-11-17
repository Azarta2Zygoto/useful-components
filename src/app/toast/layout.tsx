import type { PropsWithChildren } from "react";

import toastJson from "@/documentation/toast.json";
import { makeMetadata } from "@/utils/makeData";

export const metadata = makeMetadata(toastJson.name, ["notification", "alert"]);

export default function ToastLayout({ children }: PropsWithChildren) {
    return children;
}
