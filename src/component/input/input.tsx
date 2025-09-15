import { JSX } from 'react';
import "./input.css";

interface FloatingLabelInputProps {
    id: string;
    type: string;
    value: string | number;
    role?: string;
    placeholder: string;
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
    aria?: { [key: string]: string|undefined };
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
    getChange,
    onKeyDown,
    onBlur,
    onFocus
}: FloatingLabelInputProps): JSX.Element {
    return (
        <div 
            className="floating-label-container" 
        >
        <input
            ref={ref}
            id={id}
            role={role}
            type={type}
            value={value}
            placeholder=" " // Empty placeholder to enable CSS selector
            className={"floating-label-input "+ (className || '')}
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
            onChange={(e)=>getChange(e)}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onFocus={onFocus}
            style={style}
            {...(aria || {})}
        />
        <label 
            htmlFor={id} 
            className="floating-label"
        >
            {placeholder}
            {required && <span aria-hidden="true" style={{ color: "red", margin:"0 5px" }}>&nbsp;*</span>}
        </label>
        </div>
    );
}