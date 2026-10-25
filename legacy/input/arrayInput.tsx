"use client";

import { Fragment, JSX, useEffect, useState } from "react";

import Combobox from "../../src/components/combobox/combobox";
import Icon from "../../src/components/utils/icon";
import type { InputVariant } from "../../src/components/utils/types";
import Box from "../box/box";
import FloatingLabelInput from "./input";
import "./input.css";
import NumberInput from "./numberInput";

interface ArrayInputProps {
    id: string;
    values: string[];
    placeholder: string;
    variant?: InputVariant;
    type?: "text" | "email" | "tel" | "url" | "number" | "combobox";
    maxElements?: number;
    className?: string;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    floatingLabel?: boolean;
    options?: string[];
    icon?: boolean;
    pattern?: string;
    size?: number;
    minLength?: number;
    maxLength?: number;
    reset?: boolean;
    min?: number;
    max?: number;
    step?: number;
    int?: boolean;
    boxStyle?: React.CSSProperties;
    boxClassName?: string;
    style?: React.CSSProperties;
    getValues: (values: string[]) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function ArrayInput({
    id,
    values,
    placeholder,
    type = "text",
    variant = "outlined",
    className,
    required,
    disabled,
    autoComplete,
    floatingLabel,
    icon,
    pattern,
    minLength,
    maxLength,
    options,
    size,
    min,
    max,
    step,
    int,
    reset = true,
    boxStyle,
    boxClassName,
    style,
    maxElements,
    getValues,
    onKeyDown,
}: ArrayInputProps): JSX.Element {
    const [currentValue, setCurrentValue] = useState<string>("");
    const [currentValues, setCurrentValues] = useState<string[]>(values);
    const [valueChange, setValueChange] = useState<string>("");

    useEffect(() => {
        setCurrentValues(values);
    }, [values]);

    const handleInputChange = (newValue: string) => {
        setCurrentValue(newValue);
    };
    const handleAddInput = () => {
        if (currentValue.trim() === "") return;
        if (currentValues.includes(currentValue.trim())) return;
        if (maxElements && currentValues.length >= maxElements) return;
        const newValues = [...currentValues, currentValue.trim()];
        setCurrentValues(newValues);
        setCurrentValue("");
        getValues(newValues);
    };
    const handleRemoveInput = (e: React.MouseEvent, value: string) => {
        e.stopPropagation();
        const newValues = currentValues.filter((val) => val !== value);
        getValues(newValues);
    };
    const handleModifyInput = (value: string) => {
        setCurrentValue(value);
        setValueChange(value);
    };

    const handleValidateChange = () => {
        if (currentValue.trim() === "") return;
        if (
            currentValues.includes(currentValue.trim()) &&
            currentValue.trim() !== valueChange
        )
            return;
        const newValues = currentValues.map((val) =>
            val === valueChange ? currentValue.trim() : val,
        );
        setCurrentValues(newValues);
        setCurrentValue("");
        setValueChange("");
        getValues(newValues);
    };

    const handleStopChange = () => {
        setValueChange("");
    };

    const handleReset = () => {
        setCurrentValue("");
        setValueChange("");
        getValues([]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(e);
        if (e.key === "Enter") {
            e.preventDefault();
            if (valueChange === "") {
                handleAddInput();
            } else {
                handleValidateChange();
            }
        }
        if (e.key === "Escape" && valueChange !== "") {
            e.preventDefault();
            handleStopChange();
        }
    };

    return (
        <div
            className={`array-input-container ${className ?? ""}`}
            style={style}
        >
            <div className="array-input-label">
                {(type === "tel" ||
                    type === "text" ||
                    type === "email" ||
                    type === "url") &&
                    floatingLabel && (
                        <FloatingLabelInput
                            id={id}
                            type={type}
                            value={currentValue}
                            variant={variant}
                            placeholder={placeholder + (required ? " *" : "")}
                            className={`${required && currentValues.length === 0 ? " invalid " : ""} ${className || ""}`}
                            disabled={disabled}
                            autoComplete={autoComplete}
                            size={size}
                            pattern={pattern}
                            minLength={minLength}
                            maxLength={maxLength}
                            getChange={(e) => handleInputChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    )}
                {type !== "number" && !floatingLabel && (
                    <input
                        id={id}
                        type={type}
                        value={currentValue}
                        placeholder={placeholder + (required ? " *" : "")}
                        className={`input-${variant}${required && currentValues.length === 0 ? " invalid " : ""} ${className || ""}`}
                        disabled={disabled}
                        autoComplete={autoComplete}
                        size={size}
                        required={required}
                        pattern={pattern}
                        minLength={minLength}
                        maxLength={maxLength}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                )}
                {type === "number" && (
                    <NumberInput
                        id={id}
                        value={
                            currentValue === "" ? 0 : parseFloat(currentValue)
                        }
                        placeholder={placeholder + (required ? " *" : "")}
                        variant={variant}
                        className={
                            "array-input " +
                            (required && currentValues.length === 0
                                ? "invalid "
                                : "") +
                            (className || "")
                        }
                        disabled={disabled}
                        autoComplete={autoComplete}
                        icon={icon}
                        floatingLabel={floatingLabel}
                        min={min}
                        max={max}
                        step={step}
                        getChange={(v) => setCurrentValue(v.toString())}
                        onKeyDown={handleKeyDown}
                        int={int}
                    />
                )}
                {type === "combobox" && options && (
                    <Combobox
                        id={id}
                        value={currentValue}
                        placeholder={placeholder}
                        variant={variant}
                        options={options}
                        className={`array-input ${required && currentValues.length === 0 ? " invalid " : ""} ${className || ""}`}
                        disabled={disabled}
                        autoComplete={autoComplete}
                        pattern={pattern}
                        size={size}
                        minLength={minLength}
                        maxLength={maxLength}
                        style={{ position: "relative" }}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                )}
                {valueChange === "" &&
                    currentValue.trim() !== "" &&
                    !currentValues.includes(currentValue.trim()) &&
                    (maxElements
                        ? maxElements > currentValues.length
                        : true) && (
                        <Fragment>
                            <button
                                type="button"
                                className="background-click validate-array-button-add"
                                onClick={handleAddInput}
                                aria-label="Add input"
                            >
                                <Icon name="plus-circle-fill" />
                            </button>
                            {reset && (
                                <button
                                    type="button"
                                    className="background-click validate-array-button-reset"
                                    onClick={handleReset}
                                    aria-label="Reset input"
                                >
                                    <Icon name="arrow-anti-clockwise" />
                                </button>
                            )}
                        </Fragment>
                    )}
                {valueChange === "" &&
                    currentValues.includes(currentValue.trim()) &&
                    (maxElements
                        ? maxElements > currentValues.length
                        : true) && (
                        <Icon
                            name="plus-circle-fill"
                            color="var(--invalid-border-color)"
                            className="array-input-duplicate-icon"
                            title={"Already in the list"}
                            desc={"This value is already in the list"}
                        />
                    )}
                {valueChange === "" &&
                    maxElements &&
                    maxElements <= currentValues.length && (
                        <Icon
                            name="full"
                            color={
                                maxElements === currentValues.length
                                    ? "var(--warning-border-color)"
                                    : "var(--invalid-border-color)"
                            }
                            className="array-input-maximum-icon"
                            title={"Maximum reached"}
                            desc={"Maximum number of elements reached"}
                        />
                    )}
                {valueChange !== "" && currentValue.trim() !== "" && (
                    <Fragment>
                        <button
                            type="button"
                            className="background-click validate-array-button-modify"
                            onClick={handleValidateChange}
                            aria-label="Validate change"
                        >
                            <Icon name="edit-square-fill" />
                        </button>
                        <button
                            type="button"
                            className="background-click validate-array-button-cancel"
                            onClick={handleStopChange}
                            aria-label="Cancel change"
                        >
                            <Icon name="x-circle-fill" />
                        </button>
                    </Fragment>
                )}
            </div>
            <div
                className={`array-input-boxes-container ${currentValues.length === maxElements ? "full" : ""} ${maxElements && currentValues.length > maxElements ? "too-full" : ""}`}
            >
                {values.map((value, index) => (
                    <Box
                        key={index}
                        className={`${boxClassName ?? ""} array-input-box${valueChange === value ? " selected" : ""}`}
                        onClick={() => handleModifyInput(value)}
                        style={{
                            width: "fit-content",
                            cursor: disabled ? "not-allowed" : "pointer",
                            opacity: disabled ? 0.6 : 1,
                            flexDirection: "row",
                            alignItems: "center",
                            ...boxStyle,
                        }}
                        disabled={disabled}
                    >
                        {value}
                        {!disabled && valueChange !== value && (
                            <button
                                type="button"
                                className="background-click"
                                onClick={(e) => handleRemoveInput(e, value)}
                                disabled={disabled || valueChange === value}
                                aria-disabled={
                                    disabled || valueChange === value
                                }
                                aria-label={`Remove input ${value}`}
                                style={{ marginLeft: "8px" }}
                            >
                                <Icon name="trash-fill" />
                            </button>
                        )}
                    </Box>
                ))}
            </div>
        </div>
    );
}
