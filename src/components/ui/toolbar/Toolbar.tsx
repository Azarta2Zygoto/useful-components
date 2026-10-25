"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Fragment,
    type MouseEvent,
    type ReactNode,
    useEffect,
    useState,
} from "react";

import "./toolbar.css";

interface ToolbarPaths {
    name: string;
    icon: string;
    subpath?: ToolbarPaths[];
    [key: string]: string | ToolbarPaths[] | undefined;
}

interface ToolbarProps {
    toolbarData: ToolbarPaths[];
    isActive?: boolean;
    isActiveDefault?: boolean;
    innerChange?: boolean;
    tooltip?: boolean;
    type?: "expand" | "menu";
    text?: {
        fermer?: string;
        ouvrir?: string;
    };
    children?: React.ReactNode;
    underChildren?: React.ReactNode;
    displayDifferentName?: (name: string) => string;
    getPath?: (path: string, subPath: string) => void;
    getActive?: (active: boolean) => void;
}

export default function Toolbar({
    toolbarData,
    isActive = false,
    isActiveDefault,
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
    const [internIsActive, setInternaIsActive] = useState<boolean>(
        isActiveDefault !== undefined ? isActiveDefault : isActive,
    );
    const [subPathOpen, setSubPathOpen] = useState<(boolean | null)[]>([]);

    useEffect(() => {
        if (isActiveDefault !== undefined) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setInternaIsActive(isActiveDefault);
            return;
        }
        setInternaIsActive(isActive);
    }, [isActive, isActiveDefault]);

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

        setSubPathOpen((prev) =>
            prev.map((open, i) => (i === index ? !open : open)),
        );
    }

    function handleToolbarActivation() {
        const newState = !internIsActive;
        if (getActive) getActive(newState);
        setInternaIsActive(newState);
    }

    return (
        <div className={internIsActive ? "toolbar active" : "toolbar"}>
            {innerChange && (
                <button
                    className="active-button"
                    type="button"
                    onClick={handleToolbarActivation}
                    data-tooltip={
                        internIsActive
                            ? text?.fermer || "close"
                            : text?.ouvrir || "open"
                    }
                    aria-label={
                        internIsActive
                            ? text?.fermer || "close"
                            : text?.ouvrir || "open"
                    }
                >
                    <i className="bi bi-justify" />
                </button>
            )}
            {children}
            <nav>
                {toolbarData.map((item, index) => {
                    const name = item.name;
                    const key = name.toLowerCase().replace(/\s+/g, "-");
                    return (
                        <Fragment key={index}>
                            <Link
                                data-tooltip={
                                    displayDifferentName
                                        ? displayDifferentName(name)
                                        : name
                                }
                                key={index}
                                id={`${key}-link-${index}`}
                                className={
                                    "link " +
                                    (path === key ||
                                    (path === "" && key === "accueil")
                                        ? "selected"
                                        : "")
                                }
                                href={key === "accueil" ? "//" : `/${key}`}
                            >
                                <i className={item.icon + " i"} />
                                <span
                                    style={{
                                        width:
                                            type === "expand" &&
                                            item.subpath &&
                                            item.subpath.length !== 0 &&
                                            path !== key
                                                ? "calc(100% - 50px)"
                                                : undefined,
                                        marginRight:
                                            type === "expand" &&
                                            item.subpath &&
                                            item.subpath.length !== 0 &&
                                            path !== key
                                                ? "25px"
                                                : undefined,
                                    }}
                                >
                                    {displayDifferentName
                                        ? displayDifferentName(name)
                                        : name}
                                    {type === "expand" &&
                                        item.subpath &&
                                        item.subpath.length !== 0 &&
                                        path !== key && (
                                            <button
                                                type="button"
                                                className="expand background-click"
                                                onClick={(e) =>
                                                    handleClickOpen(e, index)
                                                }
                                                aria-label={
                                                    internIsActive
                                                        ? text?.fermer ||
                                                          "close"
                                                        : text?.ouvrir || "open"
                                                }
                                                style={{
                                                    display: internIsActive
                                                        ? "block"
                                                        : "none",
                                                    width: "16px",
                                                    height: "16px",
                                                    position: "absolute",
                                                    right: "0px",
                                                    top: "0px",
                                                    margin: "7px",
                                                }}
                                            >
                                                <i
                                                    className={
                                                        subPathOpen[index]
                                                            ? "bi bi-chevron-contract"
                                                            : "bi bi-chevron-expand"
                                                    }
                                                />
                                            </button>
                                        )}
                                </span>
                            </Link>
                            {type === "expand" &&
                                item.subpath &&
                                item.subpath.length !== 0 && (
                                    <ul
                                        id={"ul-" + key}
                                        className={
                                            path === key || subPathOpen[index]
                                                ? "subpath active"
                                                : "subpath"
                                        }
                                        style={{
                                            height:
                                                path === key ||
                                                subPathOpen[index]
                                                    ? `${35 * item.subpath.length}px`
                                                    : "0px",
                                        }}
                                    >
                                        {item.subpath &&
                                            item.subpath.map(
                                                (subItem, subIndex) => {
                                                    const subKey = subItem.name
                                                        .toLowerCase()
                                                        .replace(/\s+/g, "-");
                                                    return (
                                                        <li
                                                            key={subIndex}
                                                            style={{
                                                                height:
                                                                    path ===
                                                                        key ||
                                                                    subPathOpen[
                                                                        index
                                                                    ]
                                                                        ? `35px`
                                                                        : "0px",
                                                            }}
                                                        >
                                                            <Link
                                                                data-tooltip={
                                                                    displayDifferentName
                                                                        ? displayDifferentName(
                                                                              subItem.name,
                                                                          )
                                                                        : subItem.name
                                                                }
                                                                key={
                                                                    key +
                                                                    "-" +
                                                                    subKey
                                                                }
                                                                id={
                                                                    key +
                                                                    "-" +
                                                                    subKey +
                                                                    "-link-" +
                                                                    subIndex
                                                                }
                                                                className={
                                                                    "link mini" +
                                                                    (key ===
                                                                        path &&
                                                                    subPath ===
                                                                        subKey
                                                                        ? " selected"
                                                                        : "")
                                                                }
                                                                href={`/${key}/${subKey}`}
                                                            >
                                                                <i
                                                                    className={
                                                                        subItem.icon +
                                                                        " i"
                                                                    }
                                                                />
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
                                                },
                                            )}
                                    </ul>
                                )}
                        </Fragment>
                    );
                })}
            </nav>
            {underChildren}
        </div>
    );
}
