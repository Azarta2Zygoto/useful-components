"use client";

import React, { JSX, useRef } from 'react';
import Tooltip from '@/components/tooltip/tooltip';
import { useGlobal } from './globalProvider';

export default function Header():JSX.Element {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { openToolbar, setOpenToolbar, width } = useGlobal();

    return (
        <header>
            {width<600 &&(
                <Tooltip
                    title={openToolbar ? "close" : "open"}
                    targetRef={buttonRef}
                >
                    <button
                        ref={buttonRef}
                        className="background-click button-header"
                        type="button"
                        onClick={() => setOpenToolbar(!openToolbar)}
                        aria-label={openToolbar ? "close" : "open"}>
                        <i className="bi bi-justify button-header-icon"/>
                    </button>
                </Tooltip>
            )}
            <h1 style={{color:'white', margin:"10px 0"}}>Component Library</h1>
        </header>
    );
}