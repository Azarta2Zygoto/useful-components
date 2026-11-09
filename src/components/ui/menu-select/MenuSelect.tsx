"use client";

import {
    type CSSProperties,
    type FocusEvent,
    type KeyboardEvent,
    type ReactNode,
    type SyntheticEvent,
    useEffect,
    useId,
    useRef,
    useState,
} from "react";

import Button from "../button/Button";
import type { ButtonProps } from "../button/button.type";
import "./menu-select.css";

interface MenuSelectTextProps {
    placeholder?: string;
}
const defaultText: Required<MenuSelectTextProps> = {
    placeholder: "Select an option",
};

interface Option {
    value: string;
    label: string;
}

interface MenuSelectProps extends Omit<ButtonProps, "onSelect"> {
    options: Option[];
    label?: string;
    selected?: Option;
    side?: "top" | "left";
    text?: MenuSelectTextProps;
    onSelect?: (option: Option) => void;
}

const PAGE_SIZE = 10;
const TYPEAHEAD_TIMEOUT_MS = 500;

export default function MenuSelect({
    id,
    options,
    label,
    selected,
    side,
    text,
    onSelect,
    onKeyDown,
    style,
    ...props
}: Readonly<MenuSelectProps>): ReactNode {
    const generatedId = useId();
    const correctId = id || generatedId;
    const correctText = { ...defaultText, ...text };

    const menuRef = useRef<HTMLUListElement>(null);
    const typeaheadBuffer = useRef("");
    const typeaheadTimer = useRef<number | undefined>(undefined);

    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const optionId = (index: number) => `${correctId}-option-${index}`;
    const lastIndex = options.length - 1;

    useEffect(() => () => window.clearTimeout(typeaheadTimer.current), []);

    useEffect(() => {
        if (!open || activeIndex < 0) return;
        document
            .getElementById(optionId(activeIndex))
            ?.scrollIntoView({ block: "nearest" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, activeIndex]);

    const handleToggle = (event: SyntheticEvent<HTMLUListElement>) => {
        const { newState } = event.nativeEvent as ToggleEvent;
        const isOpen = newState === "open";
        setOpen(isOpen);

        if (isOpen) {
            const selectedIndex = options.findIndex(
                (o) => o.value === selected?.value,
            );
            setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
            menuRef.current?.focus();
        } else {
            typeaheadBuffer.current = "";
            setActiveIndex(-1);
        }
    };

    const selectOption = (option: Option) => {
        onSelect?.(option);
        menuRef.current?.hidePopover();
    };

    const typeahead = (char: string) => {
        window.clearTimeout(typeaheadTimer.current);
        typeaheadBuffer.current += char.toLowerCase();
        typeaheadTimer.current = window.setTimeout(() => {
            typeaheadBuffer.current = "";
        }, TYPEAHEAD_TIMEOUT_MS);

        const buffer = typeaheadBuffer.current;

        const isRepeat = [...buffer].every((c) => c === buffer[0]);
        const search = isRepeat ? buffer[0] : buffer;
        const start = isRepeat ? activeIndex + 1 : Math.max(activeIndex, 0);

        for (let i = 0; i < options.length; i++) {
            const index = (start + i) % options.length;
            if (options[index].label.toLowerCase().startsWith(search)) {
                setActiveIndex(index);
                return;
            }
        }
    };

    const handleButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;

        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const menu = menuRef.current;
            if (menu && !menu.matches(":popover-open")) menu.showPopover();
        }
    };

    const handleListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
        if (options.length === 0) return;

        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                setActiveIndex((i) => Math.min(i + 1, lastIndex));
                return;
            case "ArrowUp":
                event.preventDefault();
                setActiveIndex((i) => Math.max(i - 1, 0));
                return;
            case "Home":
                event.preventDefault();
                setActiveIndex(0);
                return;
            case "End":
                event.preventDefault();
                setActiveIndex(lastIndex);
                return;
            case "PageDown":
                event.preventDefault();
                setActiveIndex((i) => Math.min(i + PAGE_SIZE, lastIndex));
                return;
            case "PageUp":
                event.preventDefault();
                setActiveIndex((i) => Math.max(i - PAGE_SIZE, 0));
                return;
            case "Enter":
                event.preventDefault();
                if (activeIndex >= 0) selectOption(options[activeIndex]);
                return;
            case " ":
                event.preventDefault();
                if (typeaheadBuffer.current !== "") typeahead(" ");
                else if (activeIndex >= 0) selectOption(options[activeIndex]);
                return;
            case "Tab":
                menuRef.current?.hidePopover();
                return;
            case "Escape":
                return;
        }

        if (
            event.key.length === 1 &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey
        ) {
            event.preventDefault();
            typeahead(event.key);
        }
    };

    const handleListBlur = (event: FocusEvent<HTMLUListElement>) => {
        const next = event.relatedTarget as Node | null;
        if (next && !event.currentTarget.parentElement?.contains(next)) {
            menuRef.current?.hidePopover();
        }
    };

    return (
        <div
            data-uc-side={side}
            className="menu-select"
        >
            {label && (
                <label
                    htmlFor={`${correctId}-button`}
                    id={`${correctId}-label`}
                >
                    {label}
                </label>
            )}
            <Button
                {...props}
                id={`${correctId}-button`}
                popoverTarget={correctId}
                style={
                    {
                        ...style,
                        anchorName: `--a-${correctId}`,
                    } as CSSProperties
                }
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={correctId}
                aria-labelledby={label ? `${correctId}-label` : undefined}
                onKeyDown={handleButtonKeyDown}
            >
                {selected?.label ?? correctText.placeholder}
            </Button>
            <ul
                id={correctId}
                ref={menuRef}
                popover="auto"
                role="listbox"
                className="menu"
                tabIndex={-1}
                aria-activedescendant={
                    open && activeIndex >= 0 ? optionId(activeIndex) : undefined
                }
                style={
                    {
                        positionAnchor: `--a-${correctId}`,
                    } as CSSProperties
                }
                onToggle={handleToggle}
                onKeyDown={handleListKeyDown}
                onBlur={handleListBlur}
            >
                {options.map((option, index) => (
                    <li
                        key={option.value}
                        id={`${correctId}-${option.value}`}
                        role="option"
                        tabIndex={-1}
                        aria-selected={selected?.value === option.value}
                        data-active={index === activeIndex || undefined}
                        onPointerMove={() => {
                            if (index !== activeIndex) setActiveIndex(index);
                        }}
                        onClick={() => {
                            onSelect?.(option);
                            menuRef.current?.hidePopover();
                        }}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}
