"use client";

import type { ReactNode } from "react";

import Toolbar from "@ui/toolbar/Toolbar";

import { useGlobal } from "@/components/GlobalProvider";
import toolbarJSON from "@/data/toolbar.json";

export default function ToolbarWrapper(): ReactNode {
    const { openToolbar, setOpenToolbar } = useGlobal();

    return (
        <Toolbar
            toolbarData={toolbarJSON.toolbar}
            open={openToolbar}
            getActive={(active) => setOpenToolbar(active)}
        />
    );
}
