"use client";

import type { ReactNode } from "react";

import { useGlobal } from "@/components/GlobalProvider";
import Toolbar from "@/components/ui/toolbar/Toolbar";
import toolbarJSON from "@/data/toolbar.json";

export default function ToolbarWrapper(): ReactNode {
    const { openToolbar, setOpenToolbar } = useGlobal();
    return (
        <Toolbar
            toolbarData={toolbarJSON.toolbar}
            isActive={openToolbar}
            getActive={(active) => setOpenToolbar(active)}
        />
    );
}
