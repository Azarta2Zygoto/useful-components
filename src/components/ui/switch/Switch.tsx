"use client";

import {
    type CSSProperties,
    type ChangeEvent,
    Fragment,
    type ReactNode,
    useState,
} from "react";

import Required from "../required/Required";
import "./switch.css";
import type { SwitchProps } from "./switch.type";

export default function Switch({
    label,
    checked,
    defaultChecked,
    values,
    position = "left",
    size,
    hideLabel,
    tooltip,
    disabled,
    required,
    containerProps,
    colors,
    onChange,
    onValue,
    ...props
}: SwitchProps): ReactNode {
    const [innerChecked, setInnerChecked] = useState(defaultChecked ?? false);
    const isControlled = checked !== undefined;
    const currentChecked = checked ?? innerChecked;

    const tooltipText = tooltip
        ? typeof tooltip === "string"
            ? tooltip
            : currentChecked
              ? tooltip.on
              : tooltip.off
        : undefined;

    let thumbColor: string | undefined;
    if (!disabled) {
        if (Array.isArray(colors)) {
            thumbColor = currentChecked ? colors[0] : colors[1];
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
            setInnerChecked(e.target.checked);
        }

        onChange?.(e);
        onValue?.(e.target.checked);
    };

    return (
        <Fragment>
            <label
                {...containerProps}
                data-uc-size={size}
                data-uc-tooltip={tooltipText}
                data-uc-switch={position}
            >
                {!hideLabel && (
                    <span>
                        {label}
                        <Required required={required} />
                    </span>
                )}
                <span
                    data-uc-switch-wrapper=""
                    style={
                        {
                            "--uc-color": thumbColor,
                        } as CSSProperties
                    }
                >
                    <input
                        {...props}
                        type="checkbox"
                        role="switch"
                        checked={checked}
                        defaultChecked={defaultChecked}
                        disabled={disabled}
                        required={required}
                        aria-label={hideLabel ? label : undefined}
                        onChange={handleChange}
                    />
                    <span aria-hidden="true" />
                </span>
            </label>
            {values && <span>{currentChecked ? values.on : values.off}</span>}
        </Fragment>
    );
}
