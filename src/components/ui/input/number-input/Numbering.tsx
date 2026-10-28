"use client";

import {
    type ReactNode,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
} from "react";

import Icon from "../../icon/icon";
import Input from "../Input";
import type { NumberInputProps } from "../input.type";
import "./number.css";

interface StepButtonProps {
    direction: "up" | "down";
    startStep: (direction: "up" | "down") => void;
    stopStep: () => void;
}
function StepButton({
    direction,
    startStep,
    stopStep,
}: Readonly<StepButtonProps>): ReactNode {
    return (
        <span
            aria-hidden="true"
            className={`number-button ${direction}`}
            onPointerDown={(e) => {
                if (e.button !== 0) return;
                e.currentTarget.setPointerCapture(e.pointerId);
                startStep(direction);
            }}
            onPointerUp={stopStep}
            onPointerCancel={stopStep}
            onLostPointerCapture={stopStep}
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => e.preventDefault()}
        >
            <Icon
                name={`caret-${direction}-fill`}
                size={14}
            />
        </span>
    );
}

export default function Numbering({
    ref,
    value,
    defaultValue,
    onChange,
    onValue,
    ...props
}: Readonly<NumberInputProps>): ReactNode {
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

    return (
        <span
            ref={wrapperRef}
            className="number-input-wrapper"
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
            {!isLocked && props.step !== "any" && (
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
