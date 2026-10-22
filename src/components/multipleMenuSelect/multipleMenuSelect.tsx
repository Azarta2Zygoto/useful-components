"use client";

import React, {
    Fragment,
    JSX,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

import Box from "../box/box";
import Checkbox from "../checkbox/checkbox";
import "../menuSelect/menuSelect.css";
import Overlay from "../overlay/overlay";
import Tooltip from "../tooltip/tooltip";
import BodyAccess from "../utils/bodyAccess";
import Icon from "../utils/icon";
import type { InputVariant } from "../utils/types";

interface MultipleMenuSelectProps {
    id: string;
    options: string[];
    selectedOptions: string[];
    variant?: InputVariant;
    label?: string;
    floatingLabel?: boolean;
    disabled?: boolean;
    hideIcon?: boolean;
    required?: boolean;
    tooltip?: boolean | string;
    checkbox?: boolean | "left" | "right";
    className?: string;
    style?: React.CSSProperties;
    backgroundColor?: string;
    children?: React.ReactNode;
    onSelect: (value: string[]) => void;
}

export default function MultipleMenuSelect({
    id,
    options,
    selectedOptions,
    variant = "outlined",
    style,
    label,
    floatingLabel,
    disabled,
    required,
    checkbox = false,
    tooltip,
    hideIcon,
    className,
    backgroundColor = "var(--bg)",
    children,
    onSelect,
}: MultipleMenuSelectProps): JSX.Element {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const maxHeight = 200;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenAnimation, setIsOpenAnimation] = useState<boolean | null>(
        null,
    );
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [showBg, setShowBg] = useState<boolean>(true);
    const [menuSelectPosition, setMenuSelectPosition] = useState<{
        top: number;
        left: number;
    }>({ top: 0, left: 0 });

    useLayoutEffect(() => {
        if (!isOpen || !buttonRef.current) return;
        const update = () => {
            const rect = buttonRef.current!.getBoundingClientRect();
            const exactHeight = Math.min(maxHeight, 6 + options.length * 32);
            const elementTop = Math.min(
                rect.bottom + window.scrollY,
                window.innerHeight - exactHeight + window.scrollY,
            );
            setMenuSelectPosition({
                top: elementTop,
                left: rect.left + window.scrollX,
            });
        };
        update();
        window.addEventListener("resize", update);
        window.addEventListener("scroll", update, true);
        return () => {
            window.removeEventListener("resize", update);
            window.removeEventListener("scroll", update, true);
        };
    }, [isOpen, options.length]);

    useEffect(() => {
        if (isOpen && selectedOptions.length === 0) {
            const timeout = setTimeout(() => setShowBg(true), 140); // 500ms delay
            return () => clearTimeout(timeout);
        } else {
            if (selectedOptions.length === 0) {
                setShowBg(false);
            } else {
                setShowBg(true);
            }
        }
    }, [isOpen, selectedOptions]);

    function handleOptionClick(option: string) {
        if (selectedOptions.includes(option)) {
            onSelect(selectedOptions.filter((opt) => opt !== option));
        } else {
            onSelect([...selectedOptions, option]);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (!isOpen) {
            if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                setIsOpen(true);
                setTimeout(() => {
                    setIsOpenAnimation(true);
                }, 20);
                setFocusedIndex(0);
                e.preventDefault();
            }
            return;
        }

        const key = e.key.toLowerCase();
        if (key.length === 1) {
            // If it's a character key
            const matchingIndex = options.findIndex((opt) =>
                opt.toLowerCase().startsWith(key),
            );
            if (matchingIndex >= 0) {
                setFocusedIndex(matchingIndex);
            }
        }

        if (e.key === "ArrowDown") {
            setFocusedIndex((i) =>
                i === null ? 0 : Math.min(i + 1, options.length - 1),
            );
            e.preventDefault();
        } else if (e.key === "ArrowUp") {
            setFocusedIndex((i) => (i === null ? 0 : Math.max(i - 1, 0)));
            e.preventDefault();
        } else if (e.key === "Escape") {
            setIsOpenAnimation(false);
            setTimeout(() => {
                setIsOpen(false);
                setIsOpenAnimation(null);
            }, 200);
            e.preventDefault();
        } else if (e.key === "Enter" || e.key === " ") {
            if (focusedIndex !== null) {
                handleOptionClick(options[focusedIndex]);
            }
            e.preventDefault();
        }
    }

    function handleOpen() {
        setIsOpen(true);
        setTimeout(() => {
            setIsOpenAnimation(true);
        }, 20);
    }

    function handleOverlayClose() {
        setIsOpenAnimation(false);
        setTimeout(() => {
            setIsOpen(false);
            setIsOpenAnimation(null);
        }, 200);
    }

    return (
        <div className="menu-select-container">
            {isOpen && (
                <Overlay
                    id={`${id}-overlay`}
                    color="rgba(0, 0, 0, 0)"
                    onClose={handleOverlayClose}
                />
            )}
            <Tooltip
                title={label || tooltip?.toString() || "multiple select menu"}
                active={tooltip ? true : false}
            >
                {className}
                <button
                    ref={buttonRef}
                    type="button"
                    role="button"
                    className={`menu-select-button-${variant}${required && selectedOptions.length === 0 ? " invalid " : ""}${className ? className : ""}`}
                    style={{
                        ...style,
                        ...(hideIcon ? { paddingRight: "10px" } : {}),
                    }}
                    id={id}
                    disabled={disabled}
                    aria-disabled={disabled}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-labelledby={id + "-label"}
                    onClick={handleOpen}
                    onKeyDown={handleKeyDown}
                >
                    {children ?? (
                        <Fragment>
                            {selectedOptions.map((opt, idx) => (
                                <Box
                                    key={idx + opt}
                                    style={{
                                        maxWidth: style?.width
                                            ? `calc(${style.width} - 90px)`
                                            : undefined,
                                    }}
                                >
                                    {opt}
                                </Box>
                            ))}
                            {!hideIcon && (
                                <Icon
                                    name="caret-down-fill"
                                    className={`menu-select-icon ${isOpenAnimation ? "open" : ""}`}
                                />
                            )}
                        </Fragment>
                    )}
                </button>
            </Tooltip>
            {label && (
                <label
                    id={id + "-label"}
                    className={`menu-select-label ${floatingLabel ? "floating" : ""} ${selectedOptions.length === 0 && !isOpen ? "void" : ""}`}
                    htmlFor={id}
                    style={{
                        backgroundImage: showBg
                            ? `linear-gradient(to bottom, ${backgroundColor} 0% 80%, transparent 80%)`
                            : "none",
                    }}
                >
                    {label}
                    {required && (
                        <span
                            aria-hidden="true"
                            style={{ color: "red", margin: "0 5px" }}
                        >
                            &nbsp;*
                        </span>
                    )}
                </label>
            )}
            {isOpen && (
                <BodyAccess>
                    <ul
                        ref={listRef}
                        role="listbox"
                        className={`menu-select-list ${isOpenAnimation ? "open" : ""} ${isOpenAnimation === false ? "closing" : ""}`}
                        aria-labelledby={id + "-label"}
                        tabIndex={-1}
                        aria-activedescendant={
                            focusedIndex !== null
                                ? `${id}-option-${focusedIndex}`
                                : undefined
                        }
                        style={{
                            top: menuSelectPosition.top,
                            left: menuSelectPosition.left,
                            minWidth: buttonRef.current?.offsetWidth,
                            maxHeight: `min(${maxHeight}px, calc(100svh - 20px))`,
                        }}
                    >
                        {options.length > 0 &&
                            options.map((option, idx) => (
                                <li
                                    key={option}
                                    id={`${id}-option-${idx}`}
                                    role="option"
                                    className={`menu-select-option ${focusedIndex === idx ? "focused" : ""} ${selectedOptions.includes(option) ? "selected" : ""}`}
                                    aria-selected={focusedIndex === idx}
                                    tabIndex={focusedIndex === idx ? 0 : -1}
                                    onClick={() => handleOptionClick(option)}
                                    onMouseEnter={() => setFocusedIndex(idx)}
                                >
                                    {checkbox !== false ? (
                                        <Checkbox
                                            id={`${id}-checkbox-${idx}`}
                                            label={option}
                                            checked={selectedOptions.includes(
                                                option,
                                            )}
                                            side={
                                                checkbox === true
                                                    ? "right"
                                                    : checkbox
                                            }
                                            onChange={() => {}}
                                            disabled={disabled}
                                        />
                                    ) : (
                                        option
                                    )}
                                </li>
                            ))}
                        {options.length === 0 && (
                            <li
                                className="menu-select-option empty"
                                role="option"
                                aria-selected="false"
                                aria-disabled="true"
                                tabIndex={-1}
                                style={{ cursor: "not-allowed" }}
                            >
                                No options available
                            </li>
                        )}
                    </ul>
                </BodyAccess>
            )}
        </div>
    );
}
