"use client";

import { type ReactNode, useId } from "react";

import IconCadenas from "../../assets/icons/cadenas.svg";
import Icon from "../../icon/Svgr";
import { getIconElement } from "../../icon/utils";
import Required from "../../required/required";
import "../../utils/field.css";
import type { NumberFieldProps } from "../input.type";
import Numbering from "./Numbering";

export default function NumberField({
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
    ...props
}: Readonly<NumberFieldProps>): ReactNode {
    const generatedId = useId();
    const correctId = id || generatedId;
    const describedBy =
        [describedByProp, error ? `${correctId}-error` : undefined]
            .filter(Boolean)
            .join(" ") || undefined;

    const labelElement = (
        <label
            {...labelProps}
            htmlFor={correctId}
        >
            {label}
            <Required required={props.required} />
        </label>
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
            <Numbering
                {...props}
                id={correctId}
                variant={variant}
                placeholder={placeholder || " "}
                aria-invalid={error ? true : invalidProp}
                aria-describedby={describedBy}
            >
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
                {iconRightElement}
                {iconLeftElement}
                {lock}
                {floatingLabel && labelElement}
            </Numbering>
            {!floatingLabel && labelElement}
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
