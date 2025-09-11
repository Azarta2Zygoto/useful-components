import { ChangeEvent, JSX, useState, useEffect, Fragment } from "react";
import FloatingLabelInput from "./input";
import Box from "../box/box";
import "./input.css"

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
    style,
    getValues,
}:ArrayInputProps): JSX.Element {
    const [currentValue, setCurrentValue] = useState<string>("");
    const [currentValues, setCurrentValues] = useState<string[]>(values);
    const [valueChange, setValueChange] = useState<number>(-1);


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
    const handleRemoveInput = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        const newValues = currentValues.filter((_, i) => i !== index);
        getValues(newValues);
    }
    const handleModifyInput = (index: number) => {
        setCurrentValue(currentValues[index]);
        setValueChange(index);
    }

    const handleValidateChange = () => {
        if (currentValue.trim() === "") return;
        if (currentValues.includes(currentValue.trim())) return;
        const newValues = currentValues.map((val, i) => i === valueChange ? currentValue.trim() : val);
        setCurrentValues(newValues);
        setCurrentValue("");
        setValueChange(-1);
        getValues(newValues);
    }

    const handleStopChange = () => {
        setValueChange(-1);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (valueChange === -1) {
                handleAddInput();
            }
            else {
                handleValidateChange();
            }
        }
        if (e.key === 'Escape' && valueChange !== -1) {
            e.preventDefault();
            handleStopChange();
        }
    }

    return (
        <div className={`array-input-container ${className??""}`} style={style}>
            <div className="array-input-label">
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
                {valueChange===-1&&currentValue.trim()!==""&&!currentValues.includes(currentValue.trim())&&(
                    <button
                        type="button"
                        className="background-click validate-array-button-add"
                        onClick={handleAddInput}
                        aria-label="Add input"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                        </svg>
                    </button>
                )}
                
                {currentValues.includes(currentValue.trim())&&(
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" viewBox="0 0 16 16" className="array-input-duplicate-icon">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                    </svg>
                )}
                {valueChange!==-1&&currentValue.trim()!==""&&(
                    <Fragment>
                        <button
                            type="button"
                            className="background-click validate-array-button-modify"
                            onClick={handleValidateChange}
                            aria-label="Validate change"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.97 11.03a.75.75 0 0 0 1.07 0l3.992-3.992a.75.75 0 1 0-1.06-1.06L7.5 9.439l-2.47-2.47a.75.75 0 0 0-1.06 1.06l2.47 2.47z"/>
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="background-click validate-array-button-cancel"
                            onClick={handleStopChange}
                            aria-label="Cancel change"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.97 11.03a.75.75 0 0 0 1.07 0l3.992-3.992a.75.75 0 1 0-1.06-1.06L7.5 9.439l-2.47-2.47a.75.75 0 0 0-1.06 1.06l2.47 2.47z"/>
                            </svg>
                        </button>
                    </Fragment>
                )}
            </div>
            {values.map((value, index) => (
                <Box
                    key={index}
                    className="array-input-box"
                    onClick={() => handleModifyInput(index)}
                    style={{width: 'fit-content', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1, flexDirection: 'row', alignItems: 'center'}}
                    disabled={disabled}>
                    {value}
                    <button
                        type="button"
                        className="background-click"
                        onClick={(e) => handleRemoveInput(e, index)}
                        disabled={disabled}
                        aria-label={`Remove input ${value}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{marginLeft: '8px'}}>
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                        </svg>
                    </button>
                </Box>
            ))}
        </div>
    );
}