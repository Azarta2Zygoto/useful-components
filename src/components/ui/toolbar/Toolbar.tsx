"use client";

import { usePathname } from "next/navigation";
import {
    type MouseEvent,
    type ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";

import JustifyIcon from "../assets/icons/justify.svg";
import Icon from "../icon/Icon";
import useTooltip from "../tooltip/useTooltip.hook";
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

    const [path, setPath] = useState<string | null>(null);
    const [subPath, setSubPath] = useState<string | null>(null);
    const [internIsOpen, setInternIsOpen] = useState<boolean>(
        openDefault !== undefined ? openDefault : open,
    );
    const [subPathOpen, setSubPathOpen] = useState<(boolean | null)[]>([]);
    const toolbarRef = useRef<HTMLDivElement>(null);
    const internalOpen = open ?? internIsOpen;

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

    const handleToolbarActivation = (isOpen: boolean) => {
        getActive?.(isOpen);
        setInternIsOpen(isOpen);
    };

    useEffect(() => {
        if (!internalOpen) return;

        function handleDocumentClick(event: globalThis.MouseEvent) {
            if (
                !window.matchMedia("(max-width: 767px)").matches ||
                !(event.target instanceof Node) ||
                toolbarRef.current?.contains(event.target)
            ) {
                return;
            }

            handleToolbarActivation(false);
        }

        function handleDocumentKeyDown(event: globalThis.KeyboardEvent) {
            if (
                !window.matchMedia("(max-width: 767px)").matches ||
                event.key !== "Escape"
            ) {
                return;
            }

            handleToolbarActivation(false);
        }

        document.addEventListener("click", handleDocumentClick);
        document.addEventListener("keydown", handleDocumentKeyDown);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
            document.removeEventListener("keydown", handleDocumentKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [internalOpen, getActive]);

    function handleClickOpen(
        event: MouseEvent<HTMLButtonElement>,
        index: number,
    ) {
        event.stopPropagation();
        event.preventDefault();

        setSubPathOpen((prev) => prev.map((o, i) => (i === index ? !o : o)));
    }

    const textOpenClose = internalOpen
        ? text?.fermer || "Close"
        : text?.ouvrir || "Open";

    const tooltip = useTooltip({
        content: textOpenClose,
        hideGrace: 0,
    });
    return (
        <div
            ref={toolbarRef}
            className={internalOpen ? "toolbar active" : "toolbar"}
        >
            {innerChange && (
                <button
                    className="active-button"
                    type="button"
                    onClick={() => handleToolbarActivation(!internalOpen)}
                    aria-label={textOpenClose}
                    {...tooltip}
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
                        onClick={handleToolbarActivation}
                    />
                ))}
            </nav>
            {underChildren}
        </div>
    );
}
