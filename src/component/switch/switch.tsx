import { JSX } from "react";
import Tooltip from "../tooltip/tooltip";
import "./switch.css";

interface SwitchProps {
    id: string;
    checked: boolean;
    tooltip?: boolean|{on: string, off: string};
    disabled?: boolean;
    label?: string;
    required?: boolean;
    style?: React.CSSProperties;
    colors?: [string, string]|"default"|"opposite";
    onChange: (checked: boolean) => void;
}

export default function Switch({
    id,
    checked,
    style,
    label,
    tooltip,
    disabled,
    required,
    colors = "default",
    onChange,
}: SwitchProps): JSX.Element {
    const tooltipText = label
        ? label
        : checked
            ? typeof tooltip === "object"
                ? tooltip.on
                : "On"
            : typeof tooltip === "object"
                ? tooltip.off
                : "Off";
    
    let sliderBg: string | undefined;
        if (!disabled) {
            if (colors === "default" && !required) {
                sliderBg = "var(--border-color-special)";
            } else if (colors === "opposite" || required) {
                sliderBg = checked
                    ? "var(--valid-border-color)"
                    : "var(--invalid-border-color)";
            } else if (Array.isArray(colors)) {
                sliderBg = checked ? colors[0] : colors[1];
            }
        }
    return (
        <label
            htmlFor={id}
            id={id+"-label"}
            className={`switch-container ${disabled ? "disabled" : ""}`}
            style={style}
        >
            <Tooltip title={tooltipText} active={tooltip?true:false}>
                <div
                    className={`switch-wrapper`}
                >
                    <input
                        id={id}
                        type="checkbox"
                        className="switch-checkbox"
                        checked={checked}
                        disabled={disabled}
                        aria-checked={checked}
                        aria-labelledby={id+"-label"}
                        aria-required={required}
                        {...(label ? { "aria-label": label } : {})}
                        onChange={(e) => onChange(e.target.checked)}
                    />
                    <span
                        aria-hidden="true"
                        className="switch-bg"/>
                    <span
                        aria-hidden="true"
                        className="switch-slider"
                        style={{ backgroundColor: sliderBg }}
                        />
                </div>
            </Tooltip>
            {label && (
                <span className="switch-label">
                    {label}
                    {required && <span aria-hidden="true" style={{ color: "red", margin:"0 5px" }}>&nbsp;*</span>}
                </span>
            )}
        </label>
    );
}