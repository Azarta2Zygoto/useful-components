"use client";

import { usePathname } from "next/navigation";
import { type MouseEvent, type ReactNode, useEffect, useState } from "react";

import JustifyIcon from "../assets/icons/justify.svg";
import Icon from "../icon/Icon";
import ToolbarLink from "./ToolbarLink";
import "./toolbar.css";
import type { ToolbarProps } from "./toolbar.type";

export default function Toolbar({
    toolbarData,
    open = false,
    openDefault,
    innerChange = true,
    type = "expand",
    text,
    children,
    underChildren,
    displayDifferentName,
    getPath,
    getActive,
}: ToolbarProps): ReactNode {
    const pathname = usePathname();

    const [path, setPath] = useState<string>("");
    const [subPath, setSubPath] = useState<string>("");
    const [internIsOpen, setInternIsOpen] = useState<boolean>(
        openDefault !== undefined ? openDefault : open,
    );
    const [subPathOpen, setSubPathOpen] = useState<(boolean | null)[]>([]);
    const internalOpen = open ?? internIsOpen;

    console.log("Toolbar render", {
        path,
        subPath,
        internalOpen,
        subPathOpen,
    });
    useEffect(() => {
        const newToolbarOpen: (boolean | null)[] = [];
        toolbarData.forEach((item) => {
            if (item.subpath && item.subpath.length > 0) {
                newToolbarOpen.push(false);
            } else {
                newToolbarOpen.push(null);
            }
        });
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSubPathOpen(newToolbarOpen);
    }, [toolbarData]);

    useEffect(() => {
        // Remove leading slash and split the path
        const [newPath, newSubPath] = (pathname || "")
            .replace(/^\//, "")
            .split("/");

        if (getPath) getPath(newPath || "accueil", newSubPath || "");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPath(newPath);
        if (newSubPath) setSubPath(newSubPath);
        else setSubPath("");
    }, [pathname, getPath]);

    function handleClickOpen(
        event: MouseEvent<HTMLButtonElement>,
        index: number,
    ) {
        event.stopPropagation();
        event.preventDefault();

        setSubPathOpen((prev) => prev.map((o, i) => (i === index ? !o : o)));
    }

    function handleToolbarActivation() {
        const newState = !internalOpen;
        getActive?.(newState);
        setInternIsOpen(newState);
    }

    const textOpenClose = internalOpen
        ? text?.fermer || "close"
        : text?.ouvrir || "open";

    return (
        <div className={internalOpen ? "toolbar active" : "toolbar"}>
            {innerChange && (
                <button
                    className="active-button"
                    type="button"
                    onClick={handleToolbarActivation}
                    data-uc-tooltip={textOpenClose}
                    aria-label={textOpenClose}
                >
                    <Icon icon={JustifyIcon} />
                </button>
            )}
            {children}
            <nav>
                {toolbarData.map((item, index) => (
                    <ToolbarLink
                        key={item.name}
                        item={item}
                        index={index}
                        currentPath={path}
                        currentSubPath={subPath}
                        displayDifferentName={displayDifferentName}
                        type={type}
                        handleClickOpen={handleClickOpen}
                        subPathOpen={subPathOpen}
                    />
                ))}
            </nav>
            {underChildren}
        </div>
    );
}
