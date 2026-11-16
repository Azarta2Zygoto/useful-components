"use client";

import Link from "next/link";
import type { KeyboardEvent, MouseEvent, ReactNode } from "react";

import Button from "../button/Button";
import useTooltip from "../tooltip/useTooltip.hook";
import type { ToolbarPaths } from "./toolbar.type";

interface ToolbarLinkProps {
    item: ToolbarPaths;
    index: number;
    handleClickOpen: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
    currentPath?: string;
    currentSubPath?: string;
    type?: "expand" | "menu";
    displayDifferentName?: (name: string) => string;
    subPathOpen: (boolean | null)[];
    onClick: (open: boolean) => void;
}

export default function ToolbarLink({
    currentPath,
    currentSubPath,
    item,
    index,
    displayDifferentName,
    type,
    handleClickOpen,
    subPathOpen,
    onClick,
}: ToolbarLinkProps): ReactNode {
    const name = item.name;
    const key = name.toLowerCase().replace(/\s+/g, "-");
    const label = displayDifferentName ? displayDifferentName(name) : name;

    const isSelected =
        currentPath === key || (currentPath === "" && key === "accueil");
    const isExpandable =
        type === "expand" && item.subpath && item.subpath.length > 0;

    const tooltip = useTooltip({
        content: label,
        hideGrace: 0,
    });

    const handlePointerDown = () => {
        if (window.matchMedia("(max-width: 767px)").matches) {
            onClick(false);
        }
    };

    return (
        <>
            <Link
                data-uc-path={isSelected ? "true" : "false"}
                href={key === "accueil" ? "//" : `/${key}`}
                onPointerDown={handlePointerDown}
                {...tooltip}
            >
                <i className={item.icon + " i"} />
                <span data-uc-expandable={isExpandable ? "true" : "false"}>
                    {label}
                    {isExpandable && (
                        <Button
                            variant="transparent"
                            onClick={(e) => handleClickOpen(e, index)}
                            aria-label={`Expand ${label} subpath`}
                        >
                            <i
                                className={
                                    subPathOpen[index]
                                        ? "bi bi-chevron-contract"
                                        : "bi bi-chevron-expand"
                                }
                            />
                        </Button>
                    )}
                </span>
            </Link>
            {isExpandable && item.subpath && (
                <ul
                    id={"ul-" + key}
                    className={
                        currentPath === key || subPathOpen[index]
                            ? "subpath active"
                            : "subpath"
                    }
                    style={{
                        height:
                            currentPath === key || subPathOpen[index]
                                ? `${35 * item.subpath.length || 0}px`
                                : "0px",
                    }}
                >
                    {item.subpath &&
                        item.subpath.map((subItem, subIndex) => {
                            const subKey = subItem.name
                                .toLowerCase()
                                .replace(/\s+/g, "-");
                            return (
                                <li
                                    key={subIndex}
                                    style={{
                                        height:
                                            currentPath === key ||
                                            subPathOpen[index]
                                                ? `35px`
                                                : "0px",
                                    }}
                                >
                                    <Link
                                        data-uc-tooltip={
                                            displayDifferentName
                                                ? displayDifferentName(
                                                      subItem.name,
                                                  )
                                                : subItem.name
                                        }
                                        key={key + "-" + subKey}
                                        id={
                                            key +
                                            "-" +
                                            subKey +
                                            "-link-" +
                                            subIndex
                                        }
                                        className={
                                            "link mini" +
                                            (key === currentPath &&
                                            currentSubPath === subKey
                                                ? " selected"
                                                : "")
                                        }
                                        href={`/${key}/${subKey}`}
                                    >
                                        <i className={subItem.icon + " i"} />
                                        <span>
                                            {displayDifferentName
                                                ? displayDifferentName(
                                                      subItem.name,
                                                  )
                                                : subItem.name}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                </ul>
            )}
        </>
    );
}
