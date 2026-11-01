"use client";

import {
    type InputEvent,
    type InputHTMLAttributes,
    type LabelHTMLAttributes,
    type ReactNode,
    useId,
    useLayoutEffect,
    useRef,
} from "react";

import "./slider.css";

type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

interface Props extends SliderProps {
    label: string;
    hideLabel?: boolean;
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
    width?: number | string;
    side?: "top" | "left";
    tick?: boolean;
    unit?: string;
    tooltipThumb?: "hover" | "always" | "never";
}

export default function Slider({
    id,
    min = 0,
    max = 100,
    value,
    defaultValue = 0,
    label,
    hideLabel = false,
    side,
    width,
    tick = false,
    unit,
    labelProps,
    tooltipThumb = "hover",
    onInput,
    ...props
}: Readonly<Props>): ReactNode {
    const generatedId = useId();
    const correctId = id || generatedId;

    const correctWidth = typeof width === "number" ? `${width}px` : width;

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const sync = () => {
        const input = inputRef.current;
        const container = containerRef.current;
        if (!input || !container) return;

        const lo = Number(input.min || 0);
        const hi = Number(input.max || 100);
        const numberValue = Number(input.valueAsNumber || 0);
        const ratio = hi === lo ? 0 : (numberValue - lo) / (hi - lo);
        if (unit) {
            input.ariaValueText = `${String(numberValue)}${unit}`;
        }
        container.style.setProperty("--percent", String(ratio));
        container.style.setProperty(
            "--content",
            `"${String(numberValue)}${unit ?? ""}"`,
        );
    };

    useLayoutEffect(sync, [value, min, max, unit]);

    const handleInput = (e: InputEvent<HTMLInputElement>) => {
        sync();
        onInput?.(e);
    };

    const ariaValueText = unit
        ? value === undefined
            ? `${defaultValue}${unit}`
            : `${value}${unit}`
        : undefined;
    const correctDefaultValue = value === undefined ? defaultValue : undefined;

    return (
        <label
            {...labelProps}
            htmlFor={correctId}
            id={`${correctId}-label`}
            data-side={side}
            className={`slider-label${labelProps?.className ? ` ${labelProps.className}` : ""}`}
            style={{ ...labelProps?.style, width: correctWidth }}
        >
            {!hideLabel && label}
            <span
                ref={containerRef}
                className="slider-container"
            >
                <input
                    {...props}
                    id={correctId}
                    ref={inputRef}
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    defaultValue={correctDefaultValue}
                    aria-valuetext={ariaValueText}
                    onInput={handleInput}
                    className="slider"
                    aria-label={hideLabel ? label : undefined}
                />
                <span
                    data-tick={tick ?? undefined}
                    className="slider-track"
                    aria-hidden="true"
                />
                <span
                    data-thumb={tooltipThumb}
                    aria-hidden="true"
                />
            </span>
        </label>
    );
}
