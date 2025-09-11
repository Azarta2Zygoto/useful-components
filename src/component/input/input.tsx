import { JSX } from 'react';
import "./input.css";

interface FloatingLabelInputProps {
    id: string;
    type: string;
    value: string | number;
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
    getChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function FloatingLabelInput({
    id,
    type,
    value,
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
    getChange,
    onKeyDown
}: FloatingLabelInputProps): JSX.Element {
    return (
        <div 
        className="floating-label-container" 
        >
        <input
            id={id}
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
            style={style}
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