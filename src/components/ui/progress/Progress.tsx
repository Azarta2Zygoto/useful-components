import { type CSSProperties, type ReactNode, useId } from "react";

import "../field/field-position.css";
import "./progress.css";
import type { PreciseDotsProps, ProgressProps } from "./progress.type";
import {
    correctProgressValue,
    correctprogressMax,
    preciseDotPosition,
    regularDotPosition,
} from "./progress.utils";

function ProgressPreciseDots({
    value,
    label,
    max,
    index,
    props,
}: PreciseDotsProps): ReactNode {
    const preciseValue = preciseDotPosition(value, max);
    if (preciseValue === null) {
        return null;
    }

    return (
        <span
            {...props}
            key={index}
            style={
                {
                    ...props?.style,
                    "--value": `${(preciseValue / max) * 100}%`,
                } as CSSProperties
            }
        >
            {label}
        </span>
    );
}

export default function Progress({
    id,
    label,
    value,
    max = 100,
    trackHeight,
    size,
    preciseDots,
    regularDots,
    labelPosition = "top",
    labelProps,
    containerProps,
    dotsProps,
    ...props
}: ProgressProps): ReactNode {
    const generatedId = useId();
    const correctId = id ?? generatedId;

    const correctMax = correctprogressMax(max);
    const correctValue = correctProgressValue(value, correctMax);

    const isDots =
        correctValue !== undefined &&
        ((preciseDots?.length ?? 0) > 0 || (regularDots?.length ?? 0) > 0);

    return (
        <div
            {...containerProps}
            data-uc-progress=""
            data-uc-size={size}
            data-uc-field-position={labelPosition}
            style={
                {
                    ...containerProps?.style,
                    "--track-height": trackHeight,
                } as CSSProperties
            }
        >
            {label && (
                <label
                    {...labelProps}
                    htmlFor={correctId}
                >
                    {label}
                </label>
            )}
            <progress
                {...props}
                id={correctId}
                value={correctValue}
                max={correctMax}
                style={
                    {
                        ...props.style,
                        "--percent": correctValue
                            ? `${correctValue / correctMax}`
                            : 0,
                    } as CSSProperties
                }
            />
            {isDots && (
                <div
                    {...dotsProps}
                    data-uc-progress-dots=""
                >
                    {preciseDots &&
                        preciseDots.map((element, index) => (
                            <ProgressPreciseDots
                                key={index}
                                index={index}
                                value={element.value}
                                label={element.label}
                                max={correctMax}
                                props={element.props}
                            />
                        ))}
                    {regularDots &&
                        regularDots.map((element, index) => (
                            <span
                                key={index}
                                style={
                                    {
                                        "--value": `${regularDotPosition(index, regularDots.length)}%`,
                                    } as CSSProperties
                                }
                            >
                                {element}
                            </span>
                        ))}
                </div>
            )}
        </div>
    );
}
