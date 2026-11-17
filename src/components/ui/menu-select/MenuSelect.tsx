"use client";

import {
    type CSSProperties,
    type FocusEvent,
    type KeyboardEvent,
    type MouseEvent,
    type ReactNode,
    type SyntheticEvent,
    useEffect,
    useId,
    useRef,
    useState,
} from "react";

import { CadenasIcon, CaretUpIcon } from "@ui/assets/icons";
import Button from "../button/Button";
import "../field.css";
import Icon from "../icon/Icon";
import "../input/input.css";
import RequiredComponent from "../required/Required";
import { getAdornment } from "../utils/Adornment";
import "./menu-select.css";
import type {
    MenuSelectOption,
    MenuSelectProps,
    MenuSelectTextProps,
} from "./menu-select.type";

const defaultText: Required<MenuSelectTextProps> = {
    placeholder: "Select an option",
    noOptions: "No element to select",
};

const PAGE_SIZE = 10;
const TYPEAHEAD_TIMEOUT_MS = 500;

export default function MenuSelect({
    id,
    value,
    defaultValue,
    variant = "outlined",
    floatingLabel = false,
    options,
    error,
    errorProps,
    label,
    labelPosition = "top",
    labelProps,
    text,
    iconRight,
    iconLeft,
    required,
    readOnly,
    size,
    width,
    containerProps,
    name,
    form,
    "aria-describedby": describedByProp,
    "aria-invalid": invalidProp,
    onValue,
    onClick,
    onKeyDown,
    style,
    ...props
}: MenuSelectProps): ReactNode {
    const generatedId = useId();
    const correctId = (id || generatedId).replace(/[^a-zA-Z0-9_-]/g, "");
    const labelId = labelProps?.id ?? `${correctId}-label`;
    const buttonId = `${correctId}-button`;
    const correctText = { ...defaultText, ...text };
    const describedBy =
        [describedByProp, error ? `${correctId}-error` : undefined]
            .filter(Boolean)
            .join(" ") || undefined;

    const iconRightElement = getAdornment(iconRight, "right");
    const iconLeftElement = getAdornment(iconLeft, "left");

    const fieldPosition = floatingLabel
        ? undefined
        : labelPosition === "top"
          ? undefined
          : labelPosition;
    const isFieldSet = variant === "outlined" && floatingLabel;

    const [innerValue, setInnerValue] = useState(defaultValue);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : innerValue;

    const menuRef = useRef<HTMLUListElement>(null);
    const typeaheadBuffer = useRef("");
    const typeaheadTimer = useRef<number | undefined>(undefined);

    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const safeIndex = activeIndex < options.length ? activeIndex : -1;

    const optionId = (index: number) => `${correctId}-option-${index}`;
    const lastIndex = options.length - 1;

    useEffect(() => () => window.clearTimeout(typeaheadTimer.current), []);

    useEffect(() => {
        if (!open || safeIndex < 0) return;
        document
            .getElementById(optionId(safeIndex))
            ?.scrollIntoView({ block: "nearest" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, safeIndex]);

    const handleToggle = (event: SyntheticEvent<HTMLUListElement>) => {
        const { newState } = event.nativeEvent as ToggleEvent;
        const isOpen = newState === "open";

        setOpen(isOpen);

        if (isOpen) {
            const selectedIndex = options.findIndex(
                (o) => o.value === currentValue?.value,
            );
            setActiveIndex(
                selectedIndex >= 0
                    ? selectedIndex
                    : options.length > 0
                      ? 0
                      : -1,
            );
            menuRef.current?.focus();
        } else {
            typeaheadBuffer.current = "";
            setActiveIndex(-1);
        }
    };

    const selectOption = (option: MenuSelectOption) => {
        if (readOnly) return;

        if (!isControlled) {
            setInnerValue(option);
        }
        onValue?.(option);
        menuRef.current?.hidePopover();
    };

    const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (readOnly) event.preventDefault();
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
        const start = isRepeat ? safeIndex + 1 : Math.max(safeIndex, 0);

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
        if (event.defaultPrevented || readOnly) return;

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
                setActiveIndex(Math.min(safeIndex + 1, lastIndex));
                return;
            case "ArrowUp":
                event.preventDefault();
                setActiveIndex(Math.max(safeIndex - 1, 0));
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
                setActiveIndex(Math.min(safeIndex + PAGE_SIZE, lastIndex));
                return;
            case "PageUp":
                event.preventDefault();
                setActiveIndex(Math.max(safeIndex - PAGE_SIZE, 0));
                return;
            case "Enter":
                event.preventDefault();
                if (safeIndex >= 0) selectOption(options[safeIndex]);
                return;
            case " ":
                event.preventDefault();
                if (typeaheadBuffer.current !== "") typeahead(" ");
                else if (safeIndex >= 0) selectOption(options[safeIndex]);
                return;
            case "Tab":
                menuRef.current?.hidePopover();
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

    const labelElement = (
        <label
            {...labelProps}
            htmlFor={`${correctId}-button`}
            id={labelId}
        >
            {label}
            <RequiredComponent required={required} />
        </label>
    );

    return (
        <div
            {...containerProps}
            data-uc-size={size}
            data-uc-field={floatingLabel ? `floating-${variant}` : variant}
            data-uc-field-position={fieldPosition}
            className="uc-menu-select"
        >
            {name && (
                <input
                    type="hidden"
                    name={name}
                    form={form}
                    value={currentValue?.value ?? ""}
                    disabled={props.disabled}
                />
            )}
            {!floatingLabel && labelElement}
            <div
                data-uc-input-wrapper={variant}
                style={{ width }}
            >
                <Button
                    {...props}
                    id={buttonId}
                    popoverTarget={correctId}
                    style={
                        {
                            ...style,
                            anchorName: `--uc-anchor-${correctId}`,
                        } as CSSProperties
                    }
                    variant="transparent"
                    data-uc-select-value={currentValue?.value}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-disabled={readOnly || undefined}
                    aria-invalid={error ? true : invalidProp}
                    aria-controls={correctId}
                    aria-describedby={describedBy}
                    aria-labelledby={
                        label ? `${labelId} ${buttonId}` : undefined
                    }
                    onClick={handleButtonClick}
                    onKeyDown={handleButtonKeyDown}
                >
                    {iconLeftElement}
                    {currentValue?.label ??
                        (floatingLabel && !open
                            ? "\u00A0"
                            : correctText.placeholder)}
                    <Icon
                        icon={readOnly ? CadenasIcon : CaretUpIcon}
                        data-uc-adornment="right"
                    />
                    {iconRightElement}
                </Button>
                {floatingLabel && labelElement}
                {isFieldSet && (
                    <fieldset aria-hidden="true">
                        <legend>
                            <span>
                                {label}
                                <RequiredComponent required={required} />
                            </span>
                        </legend>
                    </fieldset>
                )}
            </div>
            <ul
                id={correctId}
                ref={menuRef}
                popover="auto"
                role="listbox"
                className="uc-menu"
                tabIndex={-1}
                aria-activedescendant={
                    open && safeIndex >= 0 ? optionId(safeIndex) : undefined
                }
                aria-labelledby={label ? labelId : undefined}
                style={
                    {
                        positionAnchor: `--uc-anchor-${correctId}`,
                    } as CSSProperties
                }
                onToggle={handleToggle}
                onKeyDown={handleListKeyDown}
                onBlur={handleListBlur}
            >
                {options.length === 0 ? (
                    <li
                        role="presentation"
                        data-uc-empty=""
                    >
                        {correctText.noOptions}
                    </li>
                ) : (
                    options.map((option, index) => (
                        <li
                            key={option.value}
                            id={optionId(index)}
                            role="option"
                            aria-selected={currentValue?.value === option.value}
                            data-active={index === safeIndex || undefined}
                            onPointerMove={() => {
                                if (index !== safeIndex) setActiveIndex(index);
                            }}
                            onClick={() => selectOption(option)}
                        >
                            {option.label}
                        </li>
                    ))
                )}
            </ul>
            <p
                aria-live="polite"
                {...errorProps}
                id={`${correctId}-error`}
                data-uc-field-error
            >
                {error}
            </p>
        </div>
    );
}
