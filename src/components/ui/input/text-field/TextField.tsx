"use client";

import { type ReactNode, useId } from "react";

import IconCadenas from "../../assets/icons/cadenas.svg";
import Icon from "../../icon/Svgr";
import { getIconElement } from "../../icon/utils";
import Required from "../../required/required";
import "../../utils/field.css";
import Input from "../Input";
import type { TextFieldProps } from "../input.type";

export default function TextField({
    id,
    variant = "outlined",
    error,
    errorProps,
    placeholder,
    label,
    labelPosition = "top",
    labelProps,
    floatingLabel = false,
    containerProps,
    iconRight,
    iconLeft,
    size,
    "aria-describedby": describedByProp,
    "aria-invalid": invalidProp,
    onChange,
    onValue,
    ...props
}: Readonly<TextFieldProps>): ReactNode {
    const generatedId = useId();
    const correctId = id ?? generatedId;
    const describedBy =
        [describedByProp, error ? `${correctId}-error` : undefined]
            .filter(Boolean)
            .join(" ") || undefined;

    const input = (
        <Input
            {...props}
            id={correctId}
            variant={variant}
            placeholder={placeholder || " "}
            aria-invalid={error ? true : invalidProp}
            aria-describedby={describedBy}
            onChange={(e) => {
                onChange?.(e);
                onValue?.(e.currentTarget.value);
            }}
        />
    );

    const iconRightElement = getIconElement(iconRight, "right");
    const iconLeftElement = getIconElement(iconLeft, "left");

    const lock = props.readOnly && !iconRightElement && (
        <Icon
            icon={IconCadenas}
            data-field-icon="right"
        />
    );

    const fieldPosition = floatingLabel
        ? undefined
        : labelPosition === "top"
          ? undefined
          : labelPosition;

    return (
        <div
            {...containerProps}
            data-size={size === "md" ? undefined : size}
            data-field={floatingLabel ? `floating-${variant}` : variant}
            data-field-position={fieldPosition}
        >
            {floatingLabel ? (
                <>
                    {input}
                    {iconRightElement}
                    {iconLeftElement}
                    {lock}
                </>
            ) : lock || iconRightElement || iconLeftElement ? (
                <span className="field-control">
                    {input}
                    {iconRightElement}
                    {iconLeftElement}
                    {lock}
                </span>
            ) : (
                input
            )}
            {variant === "outlined" && floatingLabel && (
                <fieldset aria-hidden="true">
                    <legend>
                        <span>
                            {label}
                            <Required required={props.required} />
                        </span>
                    </legend>
                </fieldset>
            )}
            <label
                {...labelProps}
                htmlFor={correctId}
            >
                {label}
                <Required required={props.required} />
            </label>
            <p
                aria-live="polite"
                {...errorProps}
                id={`${correctId}-error`}
                data-field-error
            >
                {error}
            </p>
        </div>
    );
}
