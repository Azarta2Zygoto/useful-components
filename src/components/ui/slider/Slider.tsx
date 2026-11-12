"use client";

import {
    type CSSProperties,
    type InputEvent,
    type ReactNode,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
} from "react";

import type { SliderProps } from "./slide.type";
import "./slider.css";

export default function Slider({
    ref,
    min = 0,
    max = 100,
    value,
    defaultValue = 0,
    label,
    hideLabel = false,
    size,
    position = "top",
    height = "7px",
    tick = false,
    unit,
    labelProps,
    tooltipThumb = "hover",
    "aria-valuetext": ariaValueText,
    onInput,
    onValue,
    ...props
}: SliderProps): ReactNode {
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!, []);

    const sync = () => {
        const input = inputRef.current;
        const container = containerRef.current;
        if (!input || !container) return;

        const lo = Number(input.min);
        const hi = Number(input.max || 100);
        const numberValue = Number(input.valueAsNumber);
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

    useEffect(() => {
        const form = inputRef.current?.form;
        if (!form) return;
        const onReset = () => setTimeout(sync, 0);
        form.addEventListener("reset", onReset);
        return () => form.removeEventListener("reset", onReset);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInput = (e: InputEvent<HTMLInputElement>) => {
        sync();
        onInput?.(e);
        onValue?.(e.currentTarget.valueAsNumber);
    };

    const ariaText =
        ariaValueText ??
        (unit
            ? value === undefined
                ? `${defaultValue}${unit}`
                : `${value}${unit}`
            : undefined);
    const isControlled = value !== undefined;
    const current = isControlled ? Number(value) : Number(defaultValue);

    const lo = Number(min);
    const hi = Number(max);
    const step = Number(props.step ?? 1);
    const ratio =
        hi === lo ? 0 : Math.min(1, Math.max(0, (current - lo) / (hi - lo)));
    const steps = Math.max(1, Math.round((hi - lo) / step));
    const text = `${current}${unit ?? ""}`;

    return (
        <label
            {...labelProps}
            data-uc-slider={position}
            data-uc-size={size}
        >
            {!hideLabel && label}
            <span
                ref={containerRef}
                className="uc-slider-container"
                style={
                    {
                        "--percent": ratio,
                        "--content": `"${text}"`,
                        "--steps": steps,
                        "--track-height": height,
                    } as CSSProperties
                }
            >
                <input
                    {...props}
                    ref={inputRef}
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    defaultValue={defaultValue}
                    aria-valuetext={ariaText}
                    aria-label={hideLabel ? label : props["aria-label"]}
                    onInput={handleInput}
                />
                <span
                    data-uc-track={tick}
                    aria-hidden="true"
                />
                <span
                    data-uc-thumb={tooltipThumb}
                    aria-hidden="true"
                />
            </span>
        </label>
    );
}
