import { JSX } from "react";

import { InputVariant } from "../types";
import "./input.css";

interface FloatingLabelInputProps {
    id: string;
    type: string;
    value: string | number;
    placeholder: string;
    role?: string;
    variant?: InputVariant;
    className?: string;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    pattern?: string;
    min?: number;
    max?: number;
    step?: number;
    size?: number;
    minLength?: number;
    maxLength?: number;
    style?: React.CSSProperties;
    ref?: React.Ref<HTMLInputElement>;
    aria?: { [key: string]: string | undefined };
    backgroundColor?: string;
    getChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function FloatingLabelInput({
    id,
    type,
    value,
    role,
    variant = "outlined",
    placeholder,
    className,
    required,
    disabled,
    autoComplete = "on",
    pattern,
    min,
    max,
    step,
    size,
    minLength,
    maxLength,
    style,
    ref,
    aria,
    backgroundColor = "var(--bg)",
    getChange,
    onKeyDown,
    onBlur,
    onFocus,
}: FloatingLabelInputProps): JSX.Element {
    return (
        <div className="floating-label-container">
            {type === "textarea" ? (
                <textarea
                    ref={ref as React.Ref<HTMLTextAreaElement>}
                    id={id}
                    role={role}
                    value={value}
                    placeholder=" " // Empty placeholder to enable CSS selector
                    className={`floating-label input-${variant} ${className ?? ""}`}
                    required={required}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    minLength={minLength}
                    maxLength={maxLength}
                    onChange={(e) =>
                        getChange(
                            e as unknown as React.ChangeEvent<HTMLInputElement>,
                        )
                    }
                    onKeyDown={(e) =>
                        onKeyDown &&
                        onKeyDown(
                            e as unknown as React.KeyboardEvent<HTMLInputElement>,
                        )
                    }
                    onBlur={(e) =>
                        onBlur &&
                        onBlur(
                            e as unknown as React.FocusEvent<HTMLInputElement>,
                        )
                    }
                    onFocus={(e) =>
                        onFocus &&
                        onFocus(
                            e as unknown as React.FocusEvent<HTMLInputElement>,
                        )
                    }
                    style={{
                        backgroundImage: `linear-gradient(to bottom, ${backgroundColor} 0% 80%, transparent 80%)`,
                        ...style,
                    }}
                    {...(aria || {})}
                />
            ) : (
                <input
                    ref={ref}
                    id={id}
                    role={role}
                    type={type}
                    value={value}
                    placeholder=" " // Empty placeholder to enable CSS selector
                    className={`floating-label-input input-${variant} ${className ?? ""}`}
                    required={required}
                    disabled={disabled}
                    pattern={pattern}
                    autoComplete={autoComplete}
                    min={min}
                    max={max}
                    step={step}
                    size={size}
                    minLength={minLength}
                    maxLength={maxLength}
                    onChange={getChange}
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    style={style}
                    {...(aria || {})}
                />
            )}
            <label
                htmlFor={id}
                className="floating-label"
                style={{
                    backgroundImage:
                        value !== "" && value !== undefined && value !== null
                            ? `linear-gradient(to bottom, ${backgroundColor} 0% 80%, transparent 80%)`
                            : undefined,
                }}
            >
                {placeholder}
                {required && (
                    <span
                        aria-hidden="true"
                        style={{ color: "red", margin: "0 5px" }}
                    >
                        &nbsp;*
                    </span>
                )}
            </label>
        </div>
    );
}
