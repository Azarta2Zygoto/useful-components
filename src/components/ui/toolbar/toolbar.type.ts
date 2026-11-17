import type { ReactNode } from "react";

import type { IconType } from "../icon/icon.type";

export interface ToolbarPaths {
    name: string;
    icon: IconType;
    subpath?: ToolbarPaths[];
    [key: string]: IconType | string | ToolbarPaths[] | undefined;
}

export interface ToolbarProps {
    toolbarData: ToolbarPaths[];
    open?: boolean;
    openDefault?: boolean;
    innerChange?: boolean;
    tooltip?: boolean;
    type?: "expand" | "menu";
    text?: {
        fermer?: string;
        ouvrir?: string;
    };
    children?: ReactNode;
    underChildren?: ReactNode;
    displayDifferentName?: (name: string) => string;
    getPath?: (path: string, subPath: string) => void;
    getActive?: (active: boolean) => void;
}
