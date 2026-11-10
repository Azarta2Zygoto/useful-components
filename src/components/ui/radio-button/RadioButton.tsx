import type { ChangeEvent, MouseEvent, ReactNode } from "react";

import "../button/button.css";
import { useRipple } from "../ripple/useRipple.hook";
import "./radio-button.css";
import type { RadioButtonProps } from "./radio-button.type";

export default function RadioButton({
    name,
    value,
    label,
    checked,
    deselect,
    tooltip,
    ripple,
    variant = "secondary",
    disabled,
    style,
    isIcon = true,
    className,
    containerProps,
    onChange,
    ...props
}: RadioButtonProps): ReactNode {
    const hasRipple = !disabled && (ripple ?? variant !== "transparent");

    const { rippleProps, onPointerDown: handlePointerDown } =
        useRipple<HTMLLabelElement>({
            disabled: !hasRipple,
        });

    const handleDeselect = (event: MouseEvent<HTMLInputElement>) => {
        if (!deselect || !checked) return;

        if (onChange) {
            const syntheticEvent = {
                target: {
                    name,
                    value: null,
                    checked: false,
                },
                currentTarget: event.currentTarget,
                preventDefault: () => {},
                stopPropagation: () => {},
            } as unknown as ChangeEvent<HTMLInputElement>;

            onChange(syntheticEvent);
        }
    };

    return (
        <label
            {...containerProps}
            style={style}
            className={className}
            data-uc-variant={variant}
            data-uc-tooltip={tooltip === true ? value : tooltip}
            onPointerDown={handlePointerDown}
        >
            <input
                {...props}
                type="radio"
                name={name}
                value={value}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
                onClick={handleDeselect}
            />
            {isIcon && <span data-radio-indicator=""></span>}
            {hasRipple && <span {...rippleProps} />}
            {label || value}
        </label>
    );
}
