"use client";

import {
    Fragment,
    type InputHTMLAttributes,
    type LabelHTMLAttributes,
    type MouseEvent,
    type ReactNode,
    useId,
    useRef,
} from "react";

import Button from "../../button/Button";
import Icon from "../../icon/icon";
import Required from "../../required/required";
import "../input.css";
import type { InputVariant } from "../input.type";
import "./number.css";

type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "defaultValue"
>;

interface NumberInputProps extends InputProps {
    value?: number;
    defaultValue?: number;
    side?: "left" | "top";
    label?: string;
    variant?: InputVariant;
    tooltip?: string;
    width?: number | string;
    state?: "default" | "invalid";
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

export default function NumberInput({
    id,
    value,
    defaultValue,
    required,
    side = "top",
    label,
    step = 1,
    variant = "outlined",
    state,
    width,
    tooltip,
    labelProps,
    style,
    onChange,
    ...props
}: Readonly<NumberInputProps>): ReactNode {
    const generatedId = useId();
    const inputRef = useRef<HTMLInputElement>(null);

    const correctId = id || generatedId;
    const correctWidth = typeof width === "number" ? `${width}px` : width;

    const isLocked = props.disabled || props.readOnly;

    const stepBy = (direction: "up" | "down") => {
        const input = inputRef.current;
        if (!input || isLocked) return;

        try {
            if (direction === "up") input.stepUp();
            else input.stepDown();
        } catch {
            return;
        }
        input.dispatchEvent(new Event("input", { bubbles: true }));
    };

    const keepFocus = (e: MouseEvent<HTMLButtonElement>) => e.preventDefault();

    return (
        <label
            {...labelProps}
            id={`${correctId}-label`}
            htmlFor={correctId}
            className={`text-input-label${labelProps?.className ? ` ${labelProps.className}` : ""}`}
            data-side={label ? side : undefined}
        >
            {label && (
                <span>
                    {label}
                    <Required required={required} />
                </span>
            )}
            <span className="number-input-wrapper">
                <input
                    {...props}
                    ref={inputRef}
                    id={correctId}
                    type="number"
                    value={value === undefined ? undefined : (value ?? "")}
                    defaultValue={defaultValue}
                    step={step}
                    data-tooltip={tooltip}
                    data-state={state}
                    data-input-variant={variant}
                    required={required}
                    onChange={onChange}
                    style={{
                        ...style,
                        ...(correctWidth !== undefined
                            ? { width: correctWidth }
                            : {}),
                    }}
                />
                {!isLocked && (
                    <Fragment>
                        <Button
                            type="button"
                            variant="transparent"
                            aria-hidden="true"
                            tabIndex={-1}
                            disabled={isLocked}
                            className="number-button-up"
                            onMouseDown={keepFocus}
                            onClick={() => stepBy("up")}
                        >
                            <Icon
                                name="caret-up-fill"
                                size={12}
                            />
                        </Button>
                        <Button
                            type="button"
                            variant="transparent"
                            aria-hidden="true"
                            tabIndex={-1}
                            disabled={isLocked}
                            className="number-button-down"
                            onMouseDown={keepFocus}
                            onClick={() => stepBy("down")}
                        >
                            <Icon
                                name="caret-down-fill"
                                size={12}
                            />
                        </Button>
                    </Fragment>
                )}
            </span>
        </label>
    );
}
