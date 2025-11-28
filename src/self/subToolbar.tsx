"use client";
import React from "react";

import Toolbar from "@/components/toolbar/toolbar";
import toolbarJSON from "@/data/toolbar.json";
import { useGlobal } from "@/self/globalProvider";

export default function ToolbarWrapper() {
    const { openToolbar, setOpenToolbar } = useGlobal();
    return (
        <Toolbar
            toolbarData={toolbarJSON.toolbar}
            isActive={openToolbar}
            getActive={(active) => setOpenToolbar(active)}
        />
    );
}
