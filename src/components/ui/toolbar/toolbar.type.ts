export interface ToolbarPaths {
    name: string;
    icon: string;
    subpath?: ToolbarPaths[];
    [key: string]: string | ToolbarPaths[] | undefined;
}

export interface ToolbarProps {
    toolbarData: ToolbarPaths[];
    isActive?: boolean;
    isActiveDefault?: boolean;
    innerChange?: boolean;
    tooltip?: boolean;
    type?: "expand" | "menu";
    text?: {
        fermer?: string;
        ouvrir?: string;
    };
    children?: React.ReactNode;
    underChildren?: React.ReactNode;
    displayDifferentName?: (name: string) => string;
    getPath?: (path: string, subPath: string) => void;
    getActive?: (active: boolean) => void;
}
