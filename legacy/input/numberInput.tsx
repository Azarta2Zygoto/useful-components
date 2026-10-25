"use client";

import { ChangeEvent, JSX, useState } from "react";

import Icon from "../../src/components/utils/icon";
import { InputVariant } from "../../src/components/utils/types";
import FloatingLabelInput from "./input";
import "./input.css";

interface NumberInputProps {
    id: string;
    value: number;
    placeholder: string;
    variant?: InputVariant;
    className?: string;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    floatingLabel?: boolean;
    icon?: boolean;
    min?: number;
    max?: number;
    step?: number;
    style?: React.CSSProperties;
    int?: boolean;
    getChange: (value: number) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function NumberInput({
    id,
    value,
    placeholder,
    variant = "outlined",
    className,
    required,
    disabled,
    autoComplete,
    floatingLabel,
    icon,
    min,
    max,
    step = 1,
    style,
    int,
    getChange,
    onKeyDown,
}: NumberInputProps): JSX.Element {
    const [numberSize, setNumberSize] = useState<boolean>(false);
    const [isMinus, setIsMinus] = useState<boolean>(false);
    const [oldValue, setOldValue] = useState<number>(value);

    function handleValueChange(e: ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.value;
        if (
            (newValue === "0-" || newValue === "-0") &&
            !isMinus &&
            (min === undefined || min < 0)
        ) {
            console.log("minus");
            getChange(0);
            setIsMinus(true);
            return;
        }

        setIsMinus(false);
        let correctedValue = int
            ? newValue.replace(",", "").replace(".", "")
            : newValue.replace(",", ".");
        correctedValue = correctedValue.replace(/[^0-9\.\-\+]/g, "");
        correctedValue = isMinus ? "-" + correctedValue : correctedValue;
        if (
            isNaN(Number(correctedValue)) &&
            correctedValue !== "" &&
            correctedValue !== "-" &&
            correctedValue !== "."
        ) {
            getChange(oldValue);
            return;
        }

        if (
            correctedValue[correctedValue.length - 1] === "." &&
            numberOccurence(correctedValue, ".") === 1 &&
            oldValue.toString().indexOf(".") === -1
        ) {
            setNumberSize(true);
        } else {
            setNumberSize(false);
        }
        if (numberSize) {
            const start = correctedValue.slice(0, correctedValue.length - 1);
            const end = correctedValue.slice(correctedValue.length - 1);
            correctedValue = start + "." + end;
        }

        const toNumber = parseFloat(correctedValue);
        if (isNaN(toNumber)) {
            getChange(0);
            return;
        }
        if (min !== undefined && toNumber < min) {
            getChange(min);
            setOldValue(min);
            return;
        }
        if (max !== undefined && toNumber > max) {
            getChange(max);
            setOldValue(max);
            return;
        }
        getChange(toNumber);
        setOldValue(toNumber);
    }

    function handleArrowClick(isIncrement: boolean) {
        let newValue = value;
        if (isIncrement) {
            newValue += Math.abs(step);
            if (max !== undefined && newValue > max) {
                newValue = max;
            }
        } else {
            newValue -= Math.abs(step);
            if (min !== undefined && newValue < min) {
                newValue = min;
            }
        }
        getChange(newValue);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (typeof onKeyDown === "function") {
            onKeyDown(e);
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            handleArrowClick(true);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            handleArrowClick(false);
        }
    }

    if (floatingLabel)
        return (
            <div className={`fake-number-input ${icon ? "activate" : ""}`}>
                <FloatingLabelInput
                    type="text"
                    id={id}
                    value={value}
                    variant={variant}
                    placeholder={placeholder}
                    className={
                        ((max && value > max) || (min && value < min)
                            ? "invalid "
                            : "") + (className ?? "")
                    }
                    required={required}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    style={style}
                    getChange={handleValueChange}
                    onKeyDown={handleKeyDown}
                />
                {icon && (
                    <div className="fake-arrow">
                        <button
                            type="button"
                            className="background-click"
                            aria-label="Increment"
                            onClick={() => handleArrowClick(true)}
                        >
                            <Icon name="caret-up-fill" />
                        </button>
                        <button
                            type="button"
                            className="background-click"
                            aria-label="Decrement"
                            onClick={() => handleArrowClick(false)}
                        >
                            <Icon name="caret-down-fill" />
                        </button>
                    </div>
                )}
            </div>
        );
    else
        return (
            <div className={`fake-number-input ${icon ? "activate" : ""}`}>
                <input
                    type="text"
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    className={`input-${variant} ${className}`}
                    required={required}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    style={style}
                    inputMode={int ? "numeric" : "decimal"}
                    onChange={handleValueChange}
                    onKeyDown={handleKeyDown}
                />
                {icon && (
                    <div className="fake-arrow">
                        <button
                            type="button"
                            className="background-click"
                            aria-label="Increment"
                            onClick={() => handleArrowClick(true)}
                        >
                            <Icon name="caret-up-fill" />
                        </button>
                        <button
                            type="button"
                            className="background-click"
                            aria-label="Decrement"
                            onClick={() => handleArrowClick(false)}
                        >
                            <Icon name="caret-down-fill" />
                        </button>
                    </div>
                )}
            </div>
        );
}

function numberOccurence(value: string, char: string): number {
    let compteur = 0;
    for (let i = 0; i < value.length; i++) {
        if (value[i] === char) compteur++;
    }
    return compteur;
}
