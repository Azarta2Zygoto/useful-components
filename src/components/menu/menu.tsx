"use client";

import React, {
    JSX,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

import Overlay from "../overlay/overlay";
import BodyAccess from "../utils/bodyAccess";
import Icon from "../utils/icon";
import type { MenuVariant } from "../utils/types";
import "./menu.css";

interface MenuItem {
    icon?: string;
    svgIcon?: React.ReactNode;
    name: string;
    shortcut?: string;
    subItems?: MenuItem[];
}

interface MenuProps {
    data: MenuItem[];
    isOpen: boolean;
    parentRef: React.RefObject<HTMLElement | null>;
    openType?: "onHover" | "onClick" | "none";
    placement?: "top" | "bottom" | "left" | "right";
    variant?: MenuVariant;
    className?: string;
    style?: React.CSSProperties;
    depth?: number;
    separatorValue?: string;
    focusOnOpen?: boolean;
    onSelect: (item: string, index?: [number, number]) => void;
    onMouseLeave?: () => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
}

export default function Menu({
    data,
    isOpen,
    parentRef,
    openType = "onClick",
    placement = "right",
    variant = "standard",
    className,
    depth = 0,
    separatorValue = "---",
    style,
    focusOnOpen = true,
    onSelect,
    onKeyDown,
}: MenuProps): JSX.Element {
    const menuRef = useRef<HTMLUListElement>(null);
    const liRefs = useRef<Array<HTMLLIElement | null>>([]);

    const [open, setOpen] = useState<boolean>(isOpen);
    const [subOpen, setSubOpen] = useState<boolean[]>(
        Array(data.length).fill(false),
    );
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [position, setPosition] = useState<{ top: number; left: number }>({
        top: 0,
        left: 0,
    });

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const setMenuRef = useCallback(
        (el: HTMLUListElement | null) => {
            menuRef.current = el;
            if (el) {
                if (focusOnOpen && isOpen) {
                    // focus safely after mount
                    requestAnimationFrame(() => el.focus());
                }
            }
        },
        [focusOnOpen, isOpen],
    );

    useLayoutEffect(() => {
        const resize = () => {
            const parentEl = parentRef?.current ?? null;
            if (!parentEl) return;

            const rect = parentEl.getBoundingClientRect();
            if (!rect) return;
            let top = 0;
            let left = 0;
            if (placement === "bottom") {
                top = rect.bottom;
                left = rect.left;
            } else if (placement === "top") {
                top = rect.top - (menuRef.current?.offsetHeight || 0);
                left = rect.left;
            } else if (placement === "left") {
                top = rect.top;
                left = rect.left - (menuRef.current?.offsetWidth || 0);
            } else if (placement === "right") {
                top = rect.top;
                left = rect.right;
            }
            setPosition({ top, left });
        };
        resize();

        window.addEventListener("resize", resize);
        window.addEventListener("scroll", resize, true);
        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("scroll", resize, true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [placement, parentRef, parentRef.current]);

    const handleItemClick = (
        item: string,
        index: [number, number],
        e?: React.MouseEvent,
    ) => {
        if (e) e.stopPropagation();

        if (
            openType === "onClick" &&
            index[0] >= 0 &&
            data[index[0]].subItems &&
            data[index[0]].subItems!.length > 0
        ) {
            const newSubOpen = subOpen.map((bool, i) =>
                i === index[0] ? !bool : bool,
            );
            setSubOpen(newSubOpen);
            setFocusedIndex(-1);
            return;
        }

        closeMenu();
        onSelect(item, index);
    };

    function handleKeyDown(e: React.KeyboardEvent) {
        onKeyDown?.(e);

        const key = e.key.toLowerCase();
        if (key.length === 1) {
            // If it's a character key
            const matchingIndex = data
                .map((c) => c.name)
                .findIndex((opt) => opt.toLowerCase().startsWith(key));
            if (matchingIndex >= 0) {
                setFocusedIndex(matchingIndex);
            }
        }

        if (menuRef.current && document.activeElement !== menuRef.current)
            return;
        if (e.key === "ArrowDown") {
            const newFocusedIndex =
                focusedIndex === null
                    ? 0
                    : Math.min(focusedIndex + 1, data.length - 1);
            if (data[newFocusedIndex].name === separatorValue) {
                setFocusedIndex(Math.min(newFocusedIndex + 1, data.length - 1));
                e.preventDefault();
                return;
            }
            setFocusedIndex(newFocusedIndex);
            e.preventDefault();
        } else if (e.key === "ArrowUp") {
            const newFocusedIndex =
                focusedIndex === null
                    ? data.length - 1
                    : Math.max(focusedIndex - 1, 0);
            if (data[newFocusedIndex].name === separatorValue) {
                setFocusedIndex(Math.max(newFocusedIndex - 1, 0));
                e.preventDefault();
                return;
            }
            setFocusedIndex(newFocusedIndex);
            e.preventDefault();
        } else if (e.key === "Escape") {
            if (depth === 0) {
                handleItemClick("", [-1, -1]);
            } else {
                closeMenu();
                setOpen(false);
                handleItemClick("---ChildIsClosing---", [-1, -1]);
            }
            e.preventDefault();
        } else if (e.key === "Enter" || e.key === " ") {
            if (focusedIndex !== null) {
                handleItemClick(data[focusedIndex].name, [focusedIndex, depth]);
            }
            e.preventDefault();
        }
    }

    function handleKeyDownSubMenu(
        e: React.KeyboardEvent,
        itemName: string,
        index: number,
        depth: number,
    ) {
        onKeyDown?.(e);

        if (e.key === "Enter" || e.key === " ") {
            handleItemClick(itemName, [index, depth]);
        }
    }

    function handleMouseLeave(e: React.MouseEvent) {
        const target = e.relatedTarget as HTMLElement | null;
        const related = e.nativeEvent.relatedTarget as Node | null;

        if (target && menuRef.current?.contains(related)) return;
        if (openType === "onHover") {
            handleItemClick("---ChildIsClosing---", [-1, -1]);
        }
    }
    function handleMouseEnter() {
        if (openType === "onHover") {
            setOpen(true);
            setFocusedIndex(-1);
        }
    }
    function handleOnMouseEnterSubMenu(index: number) {
        setFocusedIndex(index);

        if (
            openType === "onHover" &&
            data[index].subItems &&
            data[index].subItems.length > 0
        ) {
            const newSubOpen = subOpen.map((bool, i) =>
                i === index ? !bool : bool,
            );
            setSubOpen(newSubOpen);
        }
    }
    function handleOnMouseLeaveSubMenu(index: number) {
        if (
            openType === "onHover" &&
            data[index].subItems &&
            data[index].subItems.length > 0
        ) {
            const newSubOpen = subOpen.map((bool, i) =>
                i === index ? false : bool,
            );
            setSubOpen(newSubOpen);
        }
    }

    function closeMenu() {
        setSubOpen(Array(data.length).fill(false));
        setFocusedIndex(-1);
        if (depth === 0) setOpen(false);
    }

    function childOnSelect(item: string, index?: [number, number]) {
        if (item === "---ChildIsClosing---") {
            menuRef.current?.focus();
            return;
        }
        closeMenu();
        onSelect(item, index);
    }

    if (!open) return <></>;
    return (
        <BodyAccess>
            <ul
                ref={setMenuRef}
                className={`menu-list ${variant} ${open ? "open" : "close"} ${className ?? ""}`}
                role="menu"
                aria-orientation="vertical"
                style={{
                    top: position.top,
                    left: position.left,
                    ...style,
                }}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onPointerLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
            >
                {openType === "onClick" && (
                    <Overlay
                        open={open}
                        tobody={true}
                        color="transparent"
                        onClose={() => handleItemClick("", [-1, -1])}
                    />
                )}
                {data.map((item, index) => {
                    const itemName = item.name;
                    const itemIcon = item.icon;
                    const itemShortcut = item.shortcut;
                    const hasSubItems =
                        item.subItems && item.subItems.length > 0;
                    if (itemName !== separatorValue)
                        return (
                            <li
                                key={index}
                                ref={(el) => {
                                    liRefs.current[index] = el;
                                }}
                                className={`menu-item ${variant} ${focusedIndex === index ? "focused" : ""}`}
                                role="menuitem"
                                aria-haspopup={hasSubItems ? "true" : undefined}
                                aria-expanded={
                                    hasSubItems
                                        ? subOpen[index]
                                            ? "true"
                                            : "false"
                                        : undefined
                                }
                                tabIndex={-1}
                                onClick={(e) =>
                                    handleItemClick(itemName, [index, depth], e)
                                }
                                onKeyDown={(e) =>
                                    handleKeyDownSubMenu(
                                        e,
                                        itemName,
                                        index,
                                        depth,
                                    )
                                }
                                onMouseEnter={() =>
                                    handleOnMouseEnterSubMenu(index)
                                }
                                onMouseLeave={() => {
                                    handleOnMouseLeaveSubMenu(index);
                                }}
                            >
                                <div>
                                    {itemIcon && (
                                        <span aria-hidden="true">
                                            {itemIcon}
                                        </span>
                                    )}
                                    {item.svgIcon && (
                                        <span
                                            className="svg-icon"
                                            aria-hidden="true"
                                        >
                                            {item.svgIcon}
                                        </span>
                                    )}
                                    <span className="menu-item-name">
                                        {itemName}
                                    </span>
                                </div>
                                {itemShortcut && (
                                    <span className="menu-item-shortcut">
                                        {itemShortcut}
                                    </span>
                                )}
                                {hasSubItems && (
                                    <Icon
                                        name="caret-down-fill"
                                        className={`submenu-icon ${subOpen[index] ? "open" : ""}`}
                                        title="Submenu"
                                    />
                                )}
                                {hasSubItems && subOpen[index] && (
                                    <Menu
                                        data={item.subItems || []}
                                        isOpen={subOpen[index]}
                                        openType={openType}
                                        parentRef={{
                                            current: liRefs.current[index],
                                        }}
                                        placement={
                                            placement === "left"
                                                ? "left"
                                                : "right"
                                        }
                                        variant={variant}
                                        className={className}
                                        style={style}
                                        depth={depth + 1}
                                        separatorValue={separatorValue}
                                        focusOnOpen={focusOnOpen}
                                        onSelect={childOnSelect}
                                        onKeyDown={onKeyDown}
                                    />
                                )}
                            </li>
                        );
                    else
                        return (
                            <li
                                key={index}
                                className={`menu-separator ${variant}`}
                                role="separator"
                            />
                        );
                })}
            </ul>
        </BodyAccess>
    );
}
