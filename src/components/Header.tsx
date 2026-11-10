"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import Button from "@ui/button/Button";

import { useGlobal } from "./GlobalProvider";

import { ASSETS } from "@/types/common.constant";
import { buildAssetPath } from "@/utils/path.utils";

export default function Header(): ReactNode {
    const { openToolbar, setOpenToolbar, width } = useGlobal();

    return (
        <header>
            {width < 600 && (
                <Button
                    className="button-header"
                    variant="transparent"
                    data-uc-tooltip={openToolbar ? "Close" : "Open"}
                    onClick={() => setOpenToolbar(!openToolbar)}
                    aria-label={openToolbar ? "Close" : "Open"}
                >
                    <i className="bi bi-justify" />
                </Button>
            )}
            <Image
                src={buildAssetPath(ASSETS.LOGO.DARK)}
                alt="Useful Components Logo"
                width={40}
                height={40}
            />
            <p
                style={{
                    fontSize: "clamp(2rem, 4vw, 2.5rem)",
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
