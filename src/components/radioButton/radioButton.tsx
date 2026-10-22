import {
    type ChangeEvent,
    type InputHTMLAttributes,
    type MouseEvent,
    type PointerEvent,
    type ReactNode,
    useId,
} from "react";

import "../button/button.css";
import { applyRippleEffect } from "../utils/ripple";
import "./radioButton.css";

export interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    value: string;
    label?: ReactNode;
    deselect?: boolean;
    tooltip?: boolean | string;
    ripple?: boolean;
    variant?: "primary" | "secondary" | "basic";
    width?: number | string;
}

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
    width,
    className,
    style,
    onChange,
    ...props
}: Readonly<RadioButtonProps>): ReactNode {
    const generatedId = useId();

    const shouldRipple = ripple ?? variant !== "basic";
    const correctWidth = typeof width === "number" ? `${width}px` : width;

    function handleDeselect(event: MouseEvent<HTMLInputElement>) {
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
    }

    const handlePointerDown = (event: PointerEvent<HTMLLabelElement>): void => {
        if (!disabled && shouldRipple) {
            applyRippleEffect(event);
        }
    };

    return (
        <label
            id={`${generatedId}-label`}
            htmlFor={generatedId}
            data-variant={variant}
            data-tooltip={tooltip === true ? value : tooltip}
            data-checked={checked}
            aria-disabled={disabled}
            className={className}
            onPointerDown={handlePointerDown}
            style={{
                ...style,
                ...(correctWidth !== undefined ? { width: correctWidth } : {}),
            }}
        >
            <input
                {...props}
                type="radio"
                id={generatedId}
                name={name}
                value={value}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
                onClick={handleDeselect}
            />
            {shouldRipple && <span className="ripple" />}
            {label || value}
        </label>
    );
}
