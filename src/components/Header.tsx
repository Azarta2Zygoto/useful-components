"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { useGlobal } from "./GlobalProvider";

import Button from "@/components/ui/button/Button";

export default function Header(): ReactNode {
    const { openToolbar, setOpenToolbar, width } = useGlobal();

    return (
        <header>
            {width < 600 && (
                <Button
                    className="button-header"
                    variant="transparent"
                    tooltip={openToolbar ? "Close" : "Open"}
                    onClick={() => setOpenToolbar(!openToolbar)}
                    aria-label={openToolbar ? "Close" : "Open"}
                >
                    <i className="bi bi-justify" />
                </Button>
            )}
            <Image
                src="/useful-components/logo-components-sombre.png"
                alt="Useful Components Logo"
                width={40}
                height={40}
            />
            <h1 style={{ color: "white", margin: "10px 0" }}>
                Component Library
            </h1>
            <span></span>
        </header>
    );
}
