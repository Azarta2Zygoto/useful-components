import {
    type CSSProperties,
    type InputHTMLAttributes,
    type ReactNode,
    useId,
} from "react";

import Required from "../required/required";
import "./checkbox.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    checked: boolean;
    side?: "left" | "right";
    sideOffset?: number;
    hideLabel?: boolean;
    tooltip?: string;
    checkmark?: ReactNode | ((checked: boolean) => ReactNode);
}

export default function Checkbox({
    id,
    label,
    checked,
    side = "left",
    sideOffset = 35,
    hideLabel,
    disabled,
    required,
    tooltip,
    checkmark,
    className,
    style,
    ...props
}: Readonly<Props>): ReactNode {
    const generatedId = useId();

    const correctId = id ?? generatedId;
    const renderedCheckmark =
        typeof checkmark === "function"
            ? (checkmark as (c: boolean) => ReactNode)(checked)
            : checkmark;

    return (
        <label
            id={`${correctId}-label`}
            htmlFor={correctId}
            data-side={hideLabel ? undefined : side}
            data-tooltip={tooltip}
            data-label={!hideLabel}
            aria-disabled={disabled}
            className={`checkbox-label${className ? ` ${className}` : ""}`}
            style={
                {
                    ...style,
                    "--offset": `${sideOffset}px`,
                } as CSSProperties
            }
        >
            {hideLabel ? null : label}
            <Required required={required} />
            <input
                {...props}
                id={correctId}
                type="checkbox"
                checked={checked}
                disabled={disabled}
                required={required}
                {...(hideLabel ? { "aria-label": label } : {})}
            />
            <span
                id={`${correctId}-checkmark`}
                aria-hidden="true"
                className={
                    renderedCheckmark ? "checkbox-custom" : "checkbox-checkmark"
                }
            >
                {renderedCheckmark ?? null}
            </span>
        </label>
    );
}
