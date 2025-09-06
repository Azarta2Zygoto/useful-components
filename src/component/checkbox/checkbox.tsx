import React, { JSX } from "react";
import Tooltip from "../tooltip/tooltip";
import "./checkbox.css";

interface CheckboxProps {
    id: string;
    label: string;
    checked: boolean;
    side?: "left" | "right" ;
    name?: string;
    rightOffset?: number;
    hideLabel?: boolean;
    disabled?: boolean;
    required?: boolean;
    tooltip?: boolean;
    style?: React.CSSProperties;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
    id,
    label,
    checked,
    name,
    side = "right",
    rightOffset = 0,
    hideLabel,
    disabled,
    required,
    tooltip,
    style,
    onChange
}: CheckboxProps): JSX.Element {
    return (
        <Tooltip title={label} active={tooltip??false}>
            <label
                className={`checkbox-container ${disabled ? "disabled" : ""} ${side === "left" ? "reverse" : ""}`}
                id={id+"-label"}
                style={style}
                htmlFor={id}
            >
                {hideLabel?"":label}
                {required && <span aria-hidden="true" style={{ color: "red", margin:"0 5px" }}>&nbsp;*</span>}
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    name={name??id}

                    required={required}
                    aria-checked={checked}
                    aria-labelledby={id+"-label"}
                    aria-describedby={id+"-checkmark"}
                    aria-required={required}
                    onChange={onChange}
                    {...(hideLabel ? { "aria-label": label } : {})}
                />
                <span
                    id={id+"-checkmark"}
                    className="checkbox-checkmark"
                    style= {{
                        right: hideLabel?'50%':rightOffset+"px",
                        transform: hideLabel?'translateX(50%) translateY(-50%)':undefined
                    }}>
                </span>
            </label>
            </Tooltip>
    );
}