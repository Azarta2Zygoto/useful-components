"use client";

import {
    type ReactNode,
    useEffect,
    useId,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
} from "react";

import CadenasIcon from "../../assets/icons/cadenas.svg";
import "../../field.css";
import Icon from "../../icon/Icon";
import { getIconElement } from "../../icon/utils";
import Required from "../../required/Required";
import StepButton from "../../utils/step/StepButton";
import "../input.css";
import type { NumberFieldProps } from "../input.type";
import "./number.css";

export default function NumberField({
    id,
    ref,
    variant = "outlined",
    value,
    defaultValue,
    hasStep = true,
    error,
    errorProps,
    placeholder,
    label,
    labelPosition = "top",
    labelProps,
    floatingLabel = false,
    iconRight,
    iconLeft,
    size,
    containerProps,
    "aria-describedby": describedByProp,
    "aria-invalid": invalidProp,
    onChange,
    onValue,
    ...props
}: NumberFieldProps): ReactNode {
    const generatedId = useId();
    const correctId = id ?? generatedId;
    const describedBy =
        [describedByProp, error ? `${correctId}-error` : undefined]
            .filter(Boolean)
            .join(" ") || undefined;

    const iconRightElement = getIconElement(iconRight, "right");
    const iconLeftElement = getIconElement(iconLeft, "left");

    const fieldPosition = floatingLabel
        ? undefined
        : labelPosition === "top"
          ? undefined
          : labelPosition;
    const isFieldSet = variant === "outlined" && floatingLabel;

    const labelElement = (
        <label
            {...labelProps}
            htmlFor={correctId}
        >
            {label}
            <Required required={props.required} />
        </label>
    );

    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const repeatTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const repeatInterval = useRef<ReturnType<typeof setInterval> | null>(null);
    const isLocked = props.disabled || props.readOnly;

    useImperativeHandle(ref, () => inputRef.current!, []);

    const syncBounds = () => {
        const input = inputRef.current;
        const wrapper = wrapperRef.current;
        if (!input || !wrapper) return;

        const v = input.valueAsNumber;
        const step = Number(input.step) || 1;
        const hasValue = Number.isFinite(v);

        wrapper.toggleAttribute(
            "data-uc-min",
            hasValue && input.min !== "" && v - step < Number(input.min),
        );
        wrapper.toggleAttribute(
            "data-uc-max",
            hasValue && input.max !== "" && v + step > Number(input.max),
        );
    };

    const stopRepeating = () => {
        if (repeatTimer.current) {
            clearTimeout(repeatTimer.current);
            repeatTimer.current = null;
        }

        if (repeatInterval.current) {
            clearInterval(repeatInterval.current);
            repeatInterval.current = null;
        }
    };

    const stepBy = (direction: "up" | "down") => {
        const input = inputRef.current;
        if (!input || isLocked) return;

        const before = input.value;
        if (direction === "up") {
            input.stepUp();
        } else {
            input.stepDown();
        }

        if (input.value === before) {
            stopRepeating();
            return;
        }
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
        syncBounds();
    };

    const startRepeating = (direction: "up" | "down") => {
        if (isLocked) return;
        const input = inputRef.current;
        if (input && document.activeElement !== input) {
            input.focus({ preventScroll: true });
        }
        stepBy(direction);

        stopRepeating();

        repeatTimer.current = setTimeout(() => {
            repeatInterval.current = setInterval(() => {
                stepBy(direction);
            }, 100);
        }, 400);
    };

    useLayoutEffect(syncBounds);

    useEffect(() => {
        if (isLocked || props.step === "any") stopRepeating();
    }, [isLocked, props.step]);

    useEffect(() => {
        return () => stopRepeating();
    }, []);

    useEffect(() => {
        const form = inputRef.current?.form;
        if (!form) return;
        const onReset = () => setTimeout(syncBounds, 0);
        form.addEventListener("reset", onReset);
        return () => form.removeEventListener("reset", onReset);
    }, []);

    const isStepButton = !isLocked && props.step !== "any" && hasStep;

    return (
        <div
            {...containerProps}
            data-uc-size={size}
            data-uc-field={floatingLabel ? `floating-${variant}` : variant}
            data-uc-field-position={fieldPosition}
        >
            {!floatingLabel && labelElement}
            <div
                ref={wrapperRef}
                data-uc-input-wrapper={variant}
            >
                {iconLeftElement}
                <input
                    {...props}
                    ref={inputRef}
                    id={correctId}
                    placeholder={placeholder || " "}
                    type="number"
                    value={value === undefined ? undefined : (value ?? "")}
                    defaultValue={defaultValue}
                    aria-invalid={error ? true : invalidProp}
                    aria-describedby={describedBy}
                    onChange={(e) => {
                        onChange?.(e);
                        const raw = e.currentTarget.value;
                        onValue?.(raw === "" ? null : Number(raw));
                        syncBounds();
                    }}
                />
                {isStepButton && (
                    <span data-uc-steps="">
                        <StepButton
                            direction="up"
                            startStep={startRepeating}
                            stopStep={stopRepeating}
                        />
                        <StepButton
                            direction="down"
                            startStep={startRepeating}
                            stopStep={stopRepeating}
                        />
                    </span>
                )}
                {floatingLabel && labelElement}
                {isFieldSet && (
                    <fieldset aria-hidden="true">
                        <legend>
                            <span>
                                {label}
                                <Required required={props.required} />
                            </span>
                        </legend>
                    </fieldset>
                )}
                {props.readOnly && (
                    <Icon
                        icon={CadenasIcon}
                        data-uc-adornment="right"
                    />
                )}
                {iconRightElement}
            </div>
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
