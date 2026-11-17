"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import JustifyIcon from "@ui/assets/icons/justify.svg";
import Button from "@ui/button/Button";

import { useGlobal } from "./GlobalProvider";
import Icon from "./ui/icon/Icon";

import { ASSETS } from "@/types/common.constant";
import { buildAssetPath } from "@/utils/path.utils";

export default function Header(): ReactNode {
    const { openToolbar, setOpenToolbar } = useGlobal();

    return (
        <header>
            <Button
                className="toolbar-external"
                variant="transparent"
                data-uc-tooltip={openToolbar ? "Close" : "Open"}
                onClick={() => setOpenToolbar(!openToolbar)}
                aria-label={openToolbar ? "Close" : "Open"}
                size="md"
            >
                <Icon icon={JustifyIcon} />
            </Button>
            <Image
                src={buildAssetPath(ASSETS.LOGO.DARK)}
                alt="Useful Components Logo"
                width={40}
                height={40}
            />
            <p
                style={{
                    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                    fontWeight: "bold",
                    color: "white",
                    margin: 0,
                    padding: 0,
                }}
            >
                Component Library
            </p>
            <span></span>
        </header>
    );
}
