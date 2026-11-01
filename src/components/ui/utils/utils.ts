import type { AdornmentType, IconType } from "./types";

export function isIconType(icon: AdornmentType): icon is IconType {
    return typeof icon === "function";
}
