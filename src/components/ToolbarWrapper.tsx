"use client";

import { useTheme } from "next-themes";
import type { ReactNode } from "react";

import Button from "@ui/button/Button";
import Toolbar from "@ui/toolbar/Toolbar";

import useTooltip from "./ui/tooltip/useTooltip.hook";

import { useGlobal } from "@/components/GlobalProvider";
import toolbarJSON from "@/data/toolbar.json";

export default function ToolbarWrapper(): ReactNode {
    const { openToolbar, setOpenToolbar } = useGlobal();
    const { resolvedTheme, setTheme } = useTheme();

    const themeAction = resolvedTheme === "dark" ? "light" : "dark";
    const themeLabel = "Change theme";

    const tooltip = useTooltip({
        content: themeLabel,
        hideGrace: 0,
    });
    return (
        <Toolbar
            toolbarData={toolbarJSON.toolbar}
            open={openToolbar}
            getActive={(active) => setOpenToolbar(active)}
        >
            <Button
                variant="transparent"
                onClick={() => setTheme(themeAction)}
                className="theme"
                {...tooltip}
            >
                <i
                    className="bi bi-moon-fill theme-icon-dark"
                    aria-hidden="true"
                />
                <i
                    className="bi bi-sun-fill theme-icon-light"
                    aria-hidden="true"
                />
            </Button>
        </Toolbar>
    );
}
