"use client";

import {
    type PropsWithChildren,
    type ReactNode,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
} from "react";

import StepButton from "../../utils/step/StepButton";
import Input from "../Input";
import type { NumberProps } from "../input.type";
import "./number.css";

export default function Numbering({
    ref,
    value,
    hasStep = true,
    defaultValue,
    size,
    onChange,
    onValue,
    children,
    ...props
}: Readonly<PropsWithChildren<NumberProps>>): ReactNode {
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLSpanElement>(null);
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
            "data-at-min",
            hasValue && input.min !== "" && v - step < Number(input.min),
        );
        wrapper.toggleAttribute(
            "data-at-max",
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
        <span
            ref={wrapperRef}
            className="number-input-wrapper"
            data-size={size === "md" ? undefined : size}
            data-has-steps={isStepButton || undefined}
        >
            <Input
                {...props}
                ref={inputRef}
                type="number"
                value={value === undefined ? undefined : (value ?? "")}
                defaultValue={defaultValue}
                onChange={(e) => {
                    onChange?.(e);
                    const raw = e.currentTarget.value;
                    onValue?.(raw === "" ? null : Number(raw));
                    syncBounds();
                }}
            />
            {children}
            {isStepButton && (
                <>
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
                </>
            )}
        </span>
    );
}
