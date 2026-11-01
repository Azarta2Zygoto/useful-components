import {
    type CSSProperties,
    type ComponentProps,
    type LabelHTMLAttributes,
    type ReactNode,
    useId,
} from "react";

import "./progress.css";

interface ProgressDot {
    value: number;
    label?: ReactNode;
}

interface ProgressProps extends ComponentProps<"progress"> {
    label: string;
    value: number;
    max: number;
    dots?: ProgressDot[];
    labels?: ReactNode[];
    dotsHeight?: number | string;
    width?: number | string;
    hideLabel?: boolean;
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

export default function Progress({
    id,
    label,
    hideLabel = false,
    labelProps,
    dots,
    labels,
    dotsHeight,
    value,
    width,
    max = 100,
    ...props
}: Readonly<ProgressProps>): ReactNode {
    const generatedId = useId();
    const correctId = id || generatedId;
    const correctWidth = typeof width === "number" ? `${width}px` : width;
    const correctHeight =
        typeof dotsHeight === "number" ? `${dotsHeight}px` : dotsHeight;

    return (
        <label
            {...labelProps}
            htmlFor={correctId}
            id={`${correctId}-label`}
            className={`progress-label${labelProps?.className ? ` ${labelProps.className}` : ""}`}
            aria-label={hideLabel ? label : undefined}
            style={{
                ...labelProps?.style,
                width: correctWidth,
            }}
        >
            {!hideLabel && label}
            {dots && (
                <div
                    className="progress-dots"
                    style={{
                        height: correctHeight,
                    }}
                >
                    {dots.map((element) => (
                        <span
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
                </div>
            )}
            {labels && (
                <div
                    className="progress-dots"
                    style={{
                        height: correctHeight,
                    }}
                >
                    {labels.map((element, index) => (
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
                id={correctId}
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
