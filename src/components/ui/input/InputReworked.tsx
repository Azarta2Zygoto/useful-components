import { type ReactNode, useId } from "react";

import CadenasIcon from "../assets/icons/cadenas.svg";
import Icon from "../icon/Icon";
import { getIconElement } from "../icon/utils";
import Required from "../required/required";
import "./field.css";
import "./input2.css";
import type { TextFieldProps } from "./input.type";

export default function Input({
    id,
    variant = "outlined",
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
}: Readonly<TextFieldProps>): ReactNode {
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

    return (
        <div
            {...containerProps}
            data-uc-size={size === "md" ? undefined : size}
            data-uc-field={floatingLabel ? `floating-${variant}` : variant}
            data-uc-field-position={fieldPosition}
        >
            {!floatingLabel && labelElement}
            <div data-uc-input-wrapper={variant}>
                {iconLeftElement}
                <input
                    id={correctId}
                    placeholder={placeholder || " "}
                    aria-invalid={error ? true : invalidProp}
                    aria-describedby={describedBy}
                    onChange={(e) => {
                        onChange?.(e);
                        onValue?.(e.currentTarget.value);
                    }}
                    {...props}
                />
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
