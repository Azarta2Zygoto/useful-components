import React, { JSX, useState, useRef, useEffect } from "react";
import Overlay from "../overlay/overlay";
import "./menuSelect.css";

interface MenuSelectProps {
    id: string;
    options: string[];
    selectedOption: string;
    label?: string;
    floatingLabel?: boolean;
    disabled?: boolean;
    hideIcon?: boolean;
    required?: boolean;
    tooltip?: boolean;
    style?: React.CSSProperties;
    onSelect: (value: string) => void;
}

export default function MenuSelect({
    id,
    options,
    selectedOption,
    style,
    label,
    floatingLabel,
    disabled,
    required,
    tooltip,
    hideIcon,
    onSelect,
}: MenuSelectProps): JSX.Element {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const hasOpened = useRef<boolean>(false);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [showBg, setShowBg] = useState<boolean>(true);


    useEffect(() => {
        if (options.length === 0) return;

        const initialIndex = options.indexOf(selectedOption);
        if (initialIndex !== -1) {
            setFocusedIndex(initialIndex);
        }
        else {
            setFocusedIndex(0);
        }
    }, [options, selectedOption, isOpen]);

    useEffect(() => {
        if (isOpen && selectedOption ==="") {
            const timeout = setTimeout(() => setShowBg(true), 140); // 500ms delay
            return () => clearTimeout(timeout);
        } else {
            if (selectedOption ==="") {
                setShowBg(false);
            } else {
                setShowBg(true);
            }
        }
    }, [isOpen, selectedOption]);

    function handleOptionClick(option: string) {
        onSelect(option);
        setIsOpen(false);
        hasOpened.current = true;
        buttonRef.current?.focus();
    };

    function handleKeyDown(e: React.KeyboardEvent) {
        if (!isOpen) {
            if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                setIsOpen(true);
                setFocusedIndex(0);
                e.preventDefault();
            }
            return;
        }

        const key = e.key.toLowerCase();
        if (key.length === 1) { // If it's a character key
            const matchingIndex = options.findIndex(opt => 
                opt.toLowerCase().startsWith(key)
            );
            if (matchingIndex >= 0) {
                setFocusedIndex(matchingIndex);
            }
        }

        if (e.key === "ArrowDown") {
            setFocusedIndex((i) => (i === null ? 0 : Math.min(i + 1, options.length - 1)));
            e.preventDefault();
        } else if (e.key === "ArrowUp") {
            setFocusedIndex((i) => (i === null ? 0 : Math.max(i - 1, 0)));
            e.preventDefault();
        } else if (e.key === "Escape") {
            setIsOpen(false);
            buttonRef.current?.focus();
            e.preventDefault();
        } else if (e.key === "Enter" || e.key === " ") {
            if (focusedIndex !== null) {
                handleOptionClick(options[focusedIndex]);
            }
            e.preventDefault();
        }
    };

    function handleOpen() {
        setIsOpen(true);
        hasOpened.current = true;
    }

    function renderIcon() {
        if (hideIcon) return null;
        
        return (
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className={`menu-select-icon ${isOpen ? "open" : ""}`}
            >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
        );
    }

    return (
        <div className={`menu-select-container`}>
            {isOpen&&(
                <Overlay
                    id={`${id}-overlay`}
                    color="rgba(0, 0, 0, 0)"
                    onClose={()=>setIsOpen(false)}
                />
            )}
            <button
                ref={buttonRef}
                type="button"
                role="button"
                className={`menu-select-button ${required&&selectedOption===""?"invalid":""} ${tooltip ? "tooltip" : ""}`}
                style={{...style,
                    ...(hideIcon ? { paddingRight: "10px" } : {}),
                }}
                id={id}
                disabled={disabled}
                aria-disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                data-tooltip={label}
                aria-labelledby={id+'-label'}
                onClick={handleOpen}
                onKeyDown={handleKeyDown}
            >
                    <span>{selectedOption}</span>
                    {renderIcon()}
            </button>
            {label&&(
                <label
                    id={id+'-label'}
                    className={`menu-select-label ${floatingLabel ? "floating" : ""} ${selectedOption===""&&!isOpen ? "void" : ""}`}
                    htmlFor={id}
                    style={{
                        backgroundImage: showBg ? "linear-gradient(to bottom, var(--bg) 0% 55%, transparent 55%)" : "none",
                    }}>
                    {label}
                    {required && <span aria-hidden="true" style={{ color: "red", margin:"0 5px" }}>&nbsp;*</span>}
                </label>
            )}
            <ul
                ref={listRef}
                role="listbox"
                className={`menu-select-list ${isOpen ? "open" : ""} ${!isOpen&&hasOpened.current ? "closing" : ""}`}
                aria-labelledby={id + '-label'}
                tabIndex={-1}
                aria-activedescendant={focusedIndex !== null ? `${id}-option-${focusedIndex}` : undefined}
            >
                {options.length>0 && options.map((option, idx) => (
                    <li
                        key={option}
                        id={`${id}-option-${idx}`}
                        role="option"
                        className={`menu-select-option ${focusedIndex === idx ? "focused" : ""} ${selectedOption === option ? "selected" : ""}`}
                        aria-selected={focusedIndex === idx}
                        tabIndex={focusedIndex === idx ? 0 : -1}
                        onClick={() => handleOptionClick(option)}
                        onMouseEnter={() => setFocusedIndex(idx)}
                        >
                        {option}
                    </li>
                ))}
                {options.length === 0 && (
                    <li
                        className="menu-select-option empty"
                        role="option"
                        aria-selected="false"
                        aria-disabled="true"
                        tabIndex={-1}
                        style={{ cursor: "not-allowed" }}>
                        No options available    
                    </li>
                )}
            </ul>
        </div>
    );
}