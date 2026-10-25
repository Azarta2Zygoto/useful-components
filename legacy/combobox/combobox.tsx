"use client";

import React, {
    JSX,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

import BodyAccess from "../bodyAccess";
import FloatingLabelInput from "../input/input";
import Overlay from "../overlay/overlay";
import type { InputVariant } from "../types";
import "./combobox.css";
import { bestMatches } from "./levenshtein";

/**
 * @param param - The properties for the Combobox component.
 * @param param.id - The unique identifier for the combobox.
 * @param param.value - The current value of the combobox.
 * @param param.options - The list of options available in the combobox.
 * @param param.variant - Optional variant of the input ("standard", "outlined", or "filled", default is "outlined").
 * @param param.className - Optional additional class name for custom styling.
 * @param param.style - Optional inline styles for the combobox.
 * @param param.pattern - Optional regex pattern for input validation.
 * @param param.required - Optional required state of the input (default is false).
 * @param param.disabled - Optional disabled state of the input (default is false).
 * @param param.placeholder - Optional placeholder text for the input.
 * @param param.floatingLabel - Optional boolean to enable floating label (default is false).
 * @param param.perfectMatch - Optional boolean to enable perfect match filtering (default is false).
 * @param param.validOnly - Optional boolean to allow only valid options (default is false).
 * @param param.maximumOptions - Optional maximum number of options to display (default is 100).
 * @param param.onChange - The change event handler for the combobox.
 * @param param.onKeyDown - Optional key down event handler for the input.
 * @returns A JSX element representing the Combobox component.
 */

interface ComboboxProps {
    id: string;
    value: string;
    options: string[];
    variant?: InputVariant;
    className?: string;
    style?: React.CSSProperties;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
    size?: number;
    minLength?: number;
    maxLength?: number;
    placeholder?: string;
    floatingLabel?: boolean;
    perfectMatch?: boolean;
    autoComplete?: string;
    validOnly?: boolean;
    maximumOptions?: number;
    onChange: (value: string) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Combobox({
    id,
    value,
    options,
    variant = "outlined",
    className,
    style,
    pattern,
    required,
    disabled,
    size,
    minLength,
    maxLength,
    placeholder,
    floatingLabel,
    autoComplete = "off",
    perfectMatch,
    validOnly,
    maximumOptions = 100,
    onChange,
    onKeyDown,
}: ComboboxProps): JSX.Element {
    const inputRef = useRef<HTMLInputElement>(null);
    const maxHeight = 200;

    const [caseInsensitive, setCaseInsensitive] = useState<string[]>([]);
    const [viewableOptions, setViewableOptions] = useState<string[]>([]);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [valueVisible, setValueVisible] = useState<string>(value);
    const [isOpenAnimation, setIsOpenAnimation] = useState<boolean | null>(
        null,
    );
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [menuSelectPosition, setMenuSelectPosition] = useState<{
        top: number;
        left: number;
    }>({ top: 0, left: 0 });

    useEffect(() => setValueVisible(value), [value]);

    useEffect(() => {
        setViewableOptions(options.filter((_, idx) => idx < maximumOptions));
        setCaseInsensitive(
            options
                .map((opt) => opt.toLowerCase())
                .filter((_, idx) => idx < maximumOptions),
        );
    }, [options, maximumOptions]);

    useLayoutEffect(() => {
        if (!isOpen || !inputRef.current) return;

        const update = () => {
            const rect = inputRef.current!.getBoundingClientRect();
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

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        setValueVisible(inputValue);

        const exactIdx = caseInsensitive.indexOf(inputValue.toLowerCase());
        if (exactIdx >= 0) {
            const exact = options[exactIdx];
            onChange(exact);
            setValueVisible(exact);
            return;
        }

        const best = bestMatches(inputValue, options, {
            perfectMatch: !!perfectMatch,
            maxResults: maximumOptions,
        });
        setViewableOptions(best);
        setFocusedIndex(best.length > 0 ? 0 : null);
    }

    function handleOptionClick(option: string) {
        setValueVisible(option);
        onChange(option);
        setIsOpenAnimation(false);
        setTimeout(() => {
            setIsOpen(false);
            setIsOpenAnimation(null);
        }, 200);
    }

    function handleOverlayClose() {
        setIsOpenAnimation(false);
        setTimeout(() => {
            setIsOpen(false);
            setIsOpenAnimation(null);
        }, 200);
        setFocusedIndex(null);
        inputRef.current?.blur();
    }

    function handleOnFocus() {
        setIsOpen(true);
        setTimeout(() => {
            setIsOpenAnimation(true);
        }, 20);
    }

    function handleOnBlur() {
        if (!validOnly) return;

        if (!caseInsensitive.includes(valueVisible.trim().toLowerCase())) {
            setTimeout(() => {
                setValueVisible("");
                onChange("");
            }, 200);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (onKeyDown) onKeyDown(e);

        if (!isOpen) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (viewableOptions.length === 0) return;
            setFocusedIndex((prev) => {
                if (prev === null) return 0;
                return prev === viewableOptions.length - 1 ? 0 : prev + 1;
            });
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (viewableOptions.length === 0) return;
            setFocusedIndex((prev) => {
                if (prev === null) return 0;
                return prev === 0 ? viewableOptions.length - 1 : prev - 1;
            });
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (focusedIndex === null) return;
            const option = viewableOptions[focusedIndex];
            handleOptionClick(option);
        } else if (e.key === "Escape") {
            e.preventDefault();
            handleOverlayClose();
        }
    }

    return (
        <div className="combobox-wrapper">
            {isOpen && (
                <Overlay
                    id={`${id}-overlay`}
                    color="rgba(0, 0, 0, 0)"
                    style={{ zIndex: 999 }}
                    onClose={handleOverlayClose}
                />
            )}
            {floatingLabel ? (
                <FloatingLabelInput
                    id={id}
                    ref={inputRef}
                    type="text"
                    role="combobox"
                    variant={variant}
                    className={className}
                    style={style}
                    value={valueVisible}
                    pattern={pattern}
                    required={required}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    size={size}
                    minLength={minLength}
                    maxLength={maxLength}
                    placeholder={placeholder || ""}
                    getChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    aria={{
                        "aria-autocomplete": "list",
                        "aria-controls": `${id}-list`,
                        "aria-activedescendant":
                            focusedIndex !== null
                                ? `${id}-option-${focusedIndex}`
                                : undefined,
                        "aria-expanded": String(isOpen),
                    }}
                />
            ) : (
                <input
                    ref={inputRef}
                    id={id}
                    type="text"
                    role="combobox"
                    className={`input-${variant} ${className}`}
                    style={style}
                    value={valueVisible}
                    pattern={pattern}
                    required={required}
                    disabled={disabled}
                    size={size}
                    minLength={minLength}
                    maxLength={maxLength}
                    autoComplete={autoComplete}
                    placeholder={placeholder || ""}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    aria-autocomplete="list"
                    aria-controls={`${id}-list`}
                    aria-activedescendant={
                        focusedIndex !== null
                            ? `${id}-option-${focusedIndex}`
                            : undefined
                    }
                    aria-expanded={isOpen}
                />
            )}
            {isOpen && (
                <BodyAccess>
                    <ul
                        role="listbox"
                        className={`combobox-list ${isOpenAnimation ? "open" : ""} ${isOpenAnimation === false ? "closing" : ""}`}
                        tabIndex={-1}
                        aria-activedescendant={
                            focusedIndex !== null
                                ? `${id}-option-${focusedIndex}`
                                : undefined
                        }
                        style={{
                            top: menuSelectPosition.top,
                            left: menuSelectPosition.left,
                            minWidth: inputRef.current?.offsetWidth,
                            maxHeight: `min(${maxHeight}px, calc(100svh - 20px))`,
                        }}
                    >
                        {viewableOptions.length > 0 &&
                            viewableOptions.map((option, idx) => (
                                <li
                                    key={option}
                                    id={`${id}-option-${idx}`}
                                    role="option"
                                    className={`combobox-option ${focusedIndex === idx ? "focused" : ""} ${value === option ? "selected" : ""}`}
                                    aria-selected={focusedIndex === idx}
                                    tabIndex={focusedIndex === idx ? 0 : -1}
                                    onClick={() => handleOptionClick(option)}
                                    onMouseEnter={() => setFocusedIndex(idx)}
                                >
                                    {option}
                                </li>
                            ))}
                        {viewableOptions.length === 0 && (
                            <li
                                className="combobox-option empty"
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
