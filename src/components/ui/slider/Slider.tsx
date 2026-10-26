"use client";

import {
    type InputEvent,
    type InputHTMLAttributes,
    LabelHTMLAttributes,
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
        const value = Number(input.valueAsNumber || 0);
        const ratio = hi === lo ? 0 : (value - lo) / (hi - lo);
        container.style.setProperty("--percent", String(ratio));
        container.style.setProperty("--content", `"${String(value)}"`);
    };

    useLayoutEffect(sync, [value, min, max]);

    const handleInput = (e: InputEvent<HTMLInputElement>) => {
        sync();
        onInput?.(e);
    };

    return (
        <div
            data-side={side}
            className="slider-wrapper"
            style={{ width: correctWidth }}
        >
            {!hideLabel && (
                <label
                    {...labelProps}
                    htmlFor={correctId}
                    id={`${correctId}-label`}
                >
                    {label}
                </label>
            )}
            <div
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
                    defaultValue={
                        value === undefined ? defaultValue : undefined
                    }
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
            </div>
        </div>
    );
}
