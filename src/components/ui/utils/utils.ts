import type { IconType } from "../icon/icon.type";
import type { AdornmentType } from "../types";

export function isIconType(icon: AdornmentType): icon is IconType {
    return typeof icon === "function";
}
