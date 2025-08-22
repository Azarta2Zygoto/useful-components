import { JSX } from "react";
import "./radioButton.css";

interface RadioButtonProps {
    name: string;
    value: string;
    label?: React.ReactNode
    checked?: boolean;
    disabled?: boolean;
    className?: string;
    deselect?: boolean;
    style?: React.CSSProperties;
    tooltip?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioButton({
    name,
    value,
    label,
    checked,
    disabled,
    className,
    deselect,
    style,
    tooltip,
    onChange
}: RadioButtonProps):JSX.Element {

    function handleDeselect(event: React.MouseEvent<HTMLInputElement>) {
        if (!deselect || !checked) return;

        if (onChange) {
            const syntheticEvent = {
                target: {
                    name,
                    value: "",
                    checked: false,
                },
                currentTarget: event.currentTarget,
                preventDefault: () => {},
                stopPropagation: () => {},
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            
            onChange(syntheticEvent);
        }
    }
    return (
        <div className="radio-button-container">
            <input
                type="radio"
                id={name+ "-" +value}
                className={`radio-input ${className ? className + "-input" : ""}`}
                name={name}
                value={value}
                onChange={onChange}
                onClick={handleDeselect}
                checked={checked}
                aria-checked={checked}
                aria-disabled={disabled}
                disabled={disabled}/>
            <label
                htmlFor={name+ "-" +value}
                className={`radio-label ${className ? className + "-label" : ""} ${tooltip ? "tooltip" : ""}`}
                style={style}
                aria-label={label ? label.toString() : undefined}
                data-tooltip={tooltip?value:undefined}
            >
                {label||value}
            </label>
        </div>
    );
}