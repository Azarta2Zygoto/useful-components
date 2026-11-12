import {
    Fragment,
    type InputHTMLAttributes,
    type ReactNode,
    useId,
} from "react";

import Required from "../required/Required";
import "./switch.css";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    checked: boolean;
    label: string;
    values?: { on: string; off: string };
    side?: "left" | "right" | "top" | "bottom";
    hideLabel?: boolean;
    tooltip?: string | { on: string; off: string };
    colors?: [string, string] | "default" | "danger";
}

export default function Switch({
    id,
    checked,
    label,
    values,
    side = "left",
    tooltip,
    disabled,
    required,
    hideLabel,
    colors = "default",
    className,
    style,
    ...props
}: Readonly<Props>): ReactNode {
    const generatedId = useId();

    const idToUse = id ?? generatedId;

    const tooltipText = tooltip
        ? typeof tooltip === "string"
            ? tooltip
            : checked
              ? tooltip.on
              : tooltip.off
        : undefined;

    let thumbColor: string | undefined;
    if (!disabled) {
        if (Array.isArray(colors)) {
            thumbColor = checked ? colors[0] : colors[1];
        } else if (colors === "danger" || required) {
            thumbColor = checked
                ? "var(--borderE-success)"
                : "var(--borderE-danger)";
        } else {
            thumbColor = "var(--add-total-color)";
        }
    }

    return (
        <Fragment>
            <label
                id={`${idToUse}-label`}
                htmlFor={idToUse}
                data-uc-side={side}
                data-uc-tooltip={tooltipText}
                aria-disabled={disabled}
                className={`switch-container${className ? ` ${className}` : ""}`}
                style={style}
            >
                {!hideLabel && (
                    <span>
                        {label}
                        <Required required={required} />
                    </span>
                )}
                <div className="switch-wrapper">
                    <input
                        {...props}
                        id={idToUse}
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        required={required}
                        aria-label={hideLabel ? label : undefined}
                    />
                    <span
                        aria-hidden="true"
                        style={{ backgroundColor: thumbColor }}
                    />
                </div>
            </label>
            {values && <span>{checked ? values.on : values.off}</span>}
        </Fragment>
    );
}
