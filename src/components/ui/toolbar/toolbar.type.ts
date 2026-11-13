import type { ReactNode } from "react";

export interface ToolbarPaths {
    name: string;
    icon: string;
    subpath?: ToolbarPaths[];
    [key: string]: string | ToolbarPaths[] | undefined;
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
