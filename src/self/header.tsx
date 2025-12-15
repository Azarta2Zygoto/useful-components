"use client";

import React, { JSX, useRef } from "react";

import { useGlobal } from "./globalProvider";

import Tooltip from "@/components/tooltip/tooltip";
import Image from "next/image";

export default function Header(): JSX.Element {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { openToolbar, setOpenToolbar, width } = useGlobal();

    return (
        <header>
            {width < 600 && (
                <Tooltip
                    title={openToolbar ? "close" : "open"}
                    targetRef={buttonRef}
                >
                    <button
                        ref={buttonRef}
                        className="background-click button-header"
                        type="button"
                        onClick={() => setOpenToolbar(!openToolbar)}
                        aria-label={openToolbar ? "close" : "open"}
                    >
                        <i className="bi bi-justify button-header-icon" />
                    </button>
                </Tooltip>
            )}
            <Image
                src="/useful-components/logo-components.png"
                alt="Useful Components Logo"
                width={40}
                height={40}
                style={{ borderRadius: 8 }}
            />
            <h1 style={{ color: "white", margin: "10px 0" }}>
                Component Library
            </h1>
            <span></span>
        </header>
    );
}
