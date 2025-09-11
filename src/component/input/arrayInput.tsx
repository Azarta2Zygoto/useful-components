import { ChangeEvent, JSX, useState, useEffect, Fragment } from "react";
import FloatingLabelInput from "./input";
import Box from "../box/box";
import "./input.css"
import NumberInput from "./numberInput";
import Icon from "../utils/icon";

interface ArrayInputProps {
    id: string;
    values: string[];
    placeholder: string;
    type?: "text" | "email" | "tel" | "url" | "number";
    className?: string;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    floatingLabel?: boolean;
    icon?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    step?: number;
    int?: boolean;
    style?: React.CSSProperties;
    getValues: (values:string[]) => void;
}

export default function ArrayInput({
    id,
    values,
    placeholder,
    type="text",
    className,
    required,
    disabled,
    autoComplete,
    floatingLabel,
    icon,
    pattern,
    minLength,
    maxLength,
    min,
    max,
    step,
    int,
    style,
    getValues,
}:ArrayInputProps): JSX.Element {
    const [currentValue, setCurrentValue] = useState<string>("");
    const [currentValues, setCurrentValues] = useState<string[]>(values);
    const [valueChange, setValueChange] = useState<string>("");


    useEffect(() => {
        setCurrentValues(values);
    }, [values]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setCurrentValue(newValue);
    };
    const handleAddInput = () => {
        if (currentValue.trim() === "") return;
        if (currentValues.includes(currentValue.trim())) return;
        const newValues = [...currentValues, currentValue.trim()];
        setCurrentValues(newValues);
        setCurrentValue("");
        getValues(newValues);
    }
    const handleRemoveInput = (e: React.MouseEvent, value: string) => {
        e.stopPropagation();
        const newValues = currentValues.filter((val) => val !== value);
        getValues(newValues);
    }
    const handleModifyInput = (value: string) => {
        setCurrentValue(value);
        setValueChange(value);
    }

    const handleValidateChange = () => {
        if (currentValue.trim() === "") return;
        if (currentValues.includes(currentValue.trim())&&currentValue.trim()!==valueChange) return;
        const newValues = currentValues.map((val) => val === valueChange ? currentValue.trim() : val);
        setCurrentValues(newValues);
        setCurrentValue("");
        setValueChange("");
        getValues(newValues);
    }

    const handleStopChange = () => {
        setValueChange("");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (valueChange === "") {
                handleAddInput();
            }
            else {
                handleValidateChange();
            }
        }
        if (e.key === 'Escape' && valueChange !== "") {
            e.preventDefault();
            handleStopChange();
        }
    }

    return (
        <div className={`array-input-container ${className??""}`} style={style}>
            <div className="array-input-label">
                {type!=="number"&&floatingLabel&&(
                    <FloatingLabelInput
                        id={id}
                        type={type}
                        value={currentValue}
                        placeholder={placeholder}
                        className={"array-input " + (className || '')}
                        required={required}
                        disabled={disabled}
                        autoComplete={autoComplete}
                        pattern={pattern}
                        minLength={minLength}
                        maxLength={maxLength}
                        getChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                )}
                {type!=="number"&&!floatingLabel&&(
                    <input
                        id={id}
                        type={type}
                        value={currentValue}
                        placeholder={placeholder}
                        className={"array-input " + (className || '')}
                        required={required}
                        disabled={disabled}
                        autoComplete={autoComplete}
                        pattern={pattern}
                        minLength={minLength}
                        maxLength={maxLength}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                )}
                {type==="number"&&(
                    <NumberInput
                        id={id}
                        value={currentValue===""?0:parseFloat(currentValue)}
                        placeholder={placeholder}
                        className={"array-input " + (className || '')}
                        required={required}
                        disabled={disabled}
                        autoComplete={autoComplete}
                        icon={icon}
                        floatingLabel={floatingLabel}
                        min={min}
                        max={max}
                        step={step}
                        getChange={(v)=>setCurrentValue(v.toString())}
                        onKeyDown={handleKeyDown}
                        int={int}
                    />
                )}
                {valueChange===""&&currentValue.trim()!==""&&!currentValues.includes(currentValue.trim())&&(
                    <button
                        type="button"
                        className="background-click validate-array-button-add"
                        onClick={handleAddInput}
                        aria-label="Add input"
                    >
                        <Icon name="plus-circle-fill" />
                    </button>
                )}
                
                {valueChange===""&&currentValues.includes(currentValue.trim())&&(
                    <Icon
                        name="plus-circle-fill"
                        color="var(--invalid-border-color)"
                        className="array-input-duplicate-icon"
                        title={"Already in the list"}
                        desc={"This value is already in the list"}
                    />
                )}
                {valueChange!==""&&currentValue.trim()!==""&&(
                    <Fragment>
                        <button
                            type="button"
                            className="background-click validate-array-button-modify"
                            onClick={handleValidateChange}
                            aria-label="Validate change"
                        >
                            <Icon name="edit-square-fill" />
                        </button>
                        <button
                            type="button"
                            className="background-click validate-array-button-cancel"
                            onClick={handleStopChange}
                            aria-label="Cancel change"
                        >
                            <Icon name="x-circle-fill" />
                        </button>
                    </Fragment>
                )}
            </div>
            <div className="array-input-boxes-container">
                {values.map((value, index) => (
                    <Box
                        key={index}
                        className={`array-input-box ${valueChange===value?"selected":""}`}
                        onClick={() => handleModifyInput(value)}
                        style={{width: 'fit-content', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1, flexDirection: 'row', alignItems: 'center'}}
                        disabled={disabled}>
                        {value}
                        {!disabled&&valueChange!==value&&(
                            <button
                                type="button"
                                className="background-click" 
                                onClick={(e) => handleRemoveInput(e, value)}
                                disabled={disabled||valueChange===value}
                                aria-disabled={disabled||valueChange===value}
                                aria-label={`Remove input ${value}`}
                                style={{marginLeft: '8px'}}
                            >
                                <Icon name="trash-fill" />
                            </button>
                        )}
                    </Box>
                ))}
            </div>
        </div>
    );
}