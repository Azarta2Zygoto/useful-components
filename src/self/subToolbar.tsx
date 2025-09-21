"use client";
import React from "react";
import { useGlobal } from "@/self/globalProvider";
import Toolbar from "@/component/toolbar/toolbar";
import toolbarJSON from "@/data/toolbar.json";

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