"use client";

import type { ReactNode } from "react";

import MoonIcon from "@ui/assets/moon.svg";
import SunIcon from "@ui/assets/sun.svg";
import Button from "@ui/button/Button";
import Toolbar from "@ui/toolbar/Toolbar";
import { useTheme } from "next-themes";

import Icon from "./ui/icon/Icon";
import useTooltip from "./ui/tooltip/useTooltip.hook";

import { useGlobal } from "@/components/GlobalProvider";
import { toolbarData } from "@/data/toolbar";

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
            toolbarData={toolbarData}
            open={openToolbar}
            getActive={(active) => setOpenToolbar(active)}
        >
            <Button
                variant="transparent"
                onClick={() => setTheme(themeAction)}
                className="theme"
                {...tooltip}
            >
                <Icon
                    icon={SunIcon}
                    className="theme-icon-light"
                />
                <Icon
                    icon={MoonIcon}
                    className="theme-icon-dark"
                />
            </Button>
        </Toolbar>
    );
}
