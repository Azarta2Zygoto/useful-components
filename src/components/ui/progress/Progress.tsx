"use client";

import type { CSSProperties, ReactNode } from "react";

import "./progress.css";
import type { ProgressProps } from "./progress.type";

export default function Progress({
    label,
    value,
    max = 100,
    height = "7px",
    hideLabel = false,
    labelProps,
    dots,
    labels,
    dotsProps,
    ...props
}: ProgressProps): ReactNode {
    return (
        <label
            {...labelProps}
            data-uc-progress
            aria-label={hideLabel ? label : undefined}
            style={
                {
                    ...labelProps?.style,
                    "--track-height": height,
                } as CSSProperties
            }
        >
            {!hideLabel && label}
            {(dots || labels) && (
                <div {...dotsProps}>
                    {dots &&
                        dots.map((element) => (
                            <span
                                {...element.props}
                                key={element.value}
                                style={
                                    {
                                        "--value": `${(element.value / max) * 100}%`,
                                    } as CSSProperties
                                }
                            >
                                {element.label}
                            </span>
                        ))}
                    {labels &&
                        labels.map((element, index) => (
                            <span
                                key={index}
                                style={
                                    {
                                        "--value": `${(index / (labels.length - 1)) * 100}%`,
                                    } as CSSProperties
                                }
                            >
                                {element}
                            </span>
                        ))}
                </div>
            )}
            <progress
                {...props}
                value={value}
                max={max}
                style={
                    {
                        "--percent": `${value / max}`,
                    } as CSSProperties
                }
            />
        </label>
    );
}
