import { JSX } from "react";
import "./switch.css";

interface SwitchProps {
    id: string;
    checked: boolean;
    tooltip?: boolean|{on: string, off: string};
    disabled?: boolean;
    label?: string;
    required?: boolean;
    style?: React.CSSProperties;
    colors?: string[]|"default"|"opposite";
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
    return (
        <label
            htmlFor={id}
            id={id+"-label"}
            className={`switch-container ${disabled ? "disabled" : ""}`}
            style={style}
        >
            <div
                className={`switch-wrapper ${tooltip ? "tooltip" : ""}`}
                {...(tooltip ? { "data-tooltip": label ? label :
                    (checked ? typeof tooltip !== "boolean" ? tooltip.on:"On" :
                        typeof tooltip !== "boolean" ? tooltip.off:"Off") } : {})}>
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
                    style={{
                        backgroundColor:
                        !disabled?
                            colors === "default"&&!required
                                ? checked
                                    ? "var(--border-color-special)"
                                    : "var(--border-color-special)"
                                : colors === "opposite"||required
                                    ? checked
                                        ? "var(--success-border-color)"
                                        : "var(--invalid-border-color)"
                                    : checked
                                        ? colors[0]
                                        : colors[1]:undefined
                    }}/>
            </div>
            {label && (
                <span className="switch-label">
                    {label}
                    {required && <span aria-hidden="true" style={{ color: "red", margin:"0 5px" }}>&nbsp;*</span>}
                </span>
            )}
        </label>
    );
}