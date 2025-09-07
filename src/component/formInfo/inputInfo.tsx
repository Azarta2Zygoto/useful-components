import { useState, useEffect, useRef, JSX } from "react";
import DisplayInfos from "./displayInfo";
import MenuSelect from "../menuSelect/menuSelect";
import Tooltip from "../tooltip/tooltip";
import MultipleMenuSelect from "../multipleMenuSelect/multipleMenuSelect";
import FloatingLabelInput from "../input/input";

interface InputInfoProps {
    id?: string;
    type:string;
    value: string|number;
    values?: string[];
    label?: string;
    placeholder?: string;
    pattern?: string;
    size?: number;
    minLength?: number;
    min?:number;
    maxLength?: number;
    max?:number;
    step?: number;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    options?: string[];
    className?: string;
    style?: React.CSSProperties;
    boxStyle?: React.CSSProperties;
    show?: boolean;
    otherTests?: {text:string, correct:boolean}[];
    floatingLabel?: boolean;
    width?: number;
    tooltip?: boolean;
    displayText?:{
        required?: string,
        min_cara?: string,
        max_cara?: string,
        pattern?: string,
        min_number?: string,
        max_number?: string,
    }
    regexText?:{
        minuscule?: string,
        majuscule?: string,
        accent?: string,
        number?: string,
        space?: string,
        others?: string,
        forbidden?: string
    }
    getChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getValue?: (value: string) => void;
    getValues?: (values: string[]) => void;
}

export default function InputInfo({
    id,
    type,
    value,
    values,
    label,
    placeholder,
    pattern,
    size,
    minLength,
    min,
    maxLength,
    max,
    step,
    required,
    disabled,
    autoComplete = "on",
    options,
    className,
    style,
    boxStyle,
    show,
    otherTests,
    floatingLabel,
    width = 1025,
    regexText,
    tooltip,
    displayText,
    getChange,
    getValue,
    getValues
}: InputInfoProps) {
    const tooltipContentRef = useRef<HTMLDivElement>(null);
    const formInfoRef = useRef<HTMLDivElement>(null);
    const [problems, setProblems] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [position, setPosition] = useState<{ top: string; right: string; translateY:string }>({ top: "0", right: "0", translateY: "-50%" });

    useEffect(() => {
        if (!tooltipContentRef.current || !formInfoRef.current) return;
        
        const currentTooltip = tooltipContentRef.current;
        const currentFormInfo = formInfoRef.current;

        const handleClick = (e: MouseEvent) => {
            if ((currentTooltip && !currentTooltip.contains(e.target as Node)) &&
                (currentFormInfo && !currentFormInfo.contains(e.target as Node))) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [tooltipContentRef, formInfoRef]);

    useEffect(() => {
        if (!tooltipContentRef.current) return;
        const inputRect = tooltipContentRef.current.getBoundingClientRect();
        const tooltipWidth = 250;
        const dif = width - (inputRect.right + tooltipWidth);
        if (dif > 0) {
            setPosition({
                top: `50%`,
                right: `-75px`,
                translateY: "-50%"
            });
        } else {
            setPosition({
                top: `100%`,
                right: `${-dif-70}px`,
                translateY: "-17px"
            });
        }
    }, [width, tooltipContentRef]);

    useEffect(() => {
        const newProblems = []
        if (otherTests && otherTests.length > 0) {
            otherTests.forEach((value, index) => {
                if (!value.correct) {
                    newProblems.push("others-"+index);
                }
            });
        }
        if (value === "" && required) {
            newProblems.push("required")
        }
        if (pattern && typeof value === "string") {
            const regex = new RegExp(pattern);
            if (!regex.test(value)) newProblems.push("regex");
        }
        if (minLength && typeof value === "string" && value.length < minLength) {
            newProblems.push("min")
        }
        if (maxLength && typeof value === "string" && value.length > maxLength) {
            newProblems.push("max")
        }
        if (min && typeof value === "number" && value < min) {
            newProblems.push("min")
        }
        if (max && typeof value === "number" && value > max) {
            newProblems.push("max")
        }

        setProblems(newProblems)
    }, [max, maxLength, min, minLength, pattern, required, value, otherTests]);

    return (
        <div className="tooltip" style={boxStyle}>
            <Displayer
                id={id}
                type={type}
                value={value}
                values={values}
                label={label}
                placeholder={placeholder}
                pattern={pattern}
                size={size}
                minLength={minLength}
                maxLength={maxLength}
                min={min}
                max={max}
                step={step}
                required={required}
                disabled={disabled}
                autoComplete={autoComplete}
                options={options}
                className={className+(problems.length > 0 ? " invalid" : "")}
                style={style}
                floatingLabel={floatingLabel}
                tooltip={tooltip}
                getChange={getChange}
                getValue={getValue}
                getValues={getValues}
            />

            <div
                style={{
                    opacity: show ? 1 : 0,
                    pointerEvents: show ? "auto" : "none",
                }}
                ref={tooltipContentRef}
                className={"tooltip-content right ligne"}
            >
                <i
                    className={`bi ${problems.length===0 ? "bi-check-circle-fill green" : "bi-x-circle-fill red"}`}
                    style={{margin:"0 5px"}}>
                </i>
                <Tooltip title={problems.length===0 ? "All specifications are met" : `${problems.length} specification${problems.length>1?"s are":" is"} not met`}>
                    <button
                        className="background-click round"
                        onClick={()=> setIsOpen(!isOpen)}
                        aria-label={problems.length===0 ? "All specifications are met" : `${problems.length} specification${problems.length>1?"s are":" is"} not met`}
                        type="button">
                        <i className="bi bi-info-circle-fill"></i>
                    </button>
                </Tooltip>
            </div>

            <div className="form-info"
                ref={formInfoRef}
                style={{
                    opacity: isOpen && show ? 1 : 0,
                    top:position.top,
                    right:position.right,
                    pointerEvents: isOpen && show  ? "auto" : "none",
                    transform: `translateY(${position.translateY}) translateX(100%)`,
                }}>
                {required &&
                    <DisplayInfos
                        type="required"
                        valid={!problems.includes("required")}
                        text={displayText}
                        regexText={regexText}
                    />
                }
                {minLength &&
                    <DisplayInfos
                        type="min_cara"
                        valid={!problems.includes("min")}
                        value={minLength}
                        text={displayText}
                        regexText={regexText}
                    />
                }
                {maxLength &&
                    <DisplayInfos
                        type="max_cara"
                        valid={!problems.includes("max")}
                        value={maxLength}
                        text={displayText}
                        regexText={regexText}
                    />
                }
                {pattern &&
                    <DisplayInfos
                        type="pattern"
                        valid={!problems.includes("regex")}
                        value={pattern}
                        text={displayText}
                        regexText={regexText}
                    />
                }
                {min!==undefined &&
                    <DisplayInfos
                        type="min_number"
                        valid={!problems.includes("min")}
                        value={min}
                        text={displayText}
                        regexText={regexText}
                    />
                }
                {max &&
                    <DisplayInfos
                        type="max_number"
                        valid={!problems.includes("max")}
                        value={max}
                        text={displayText}
                        regexText={regexText}
                    />
                }
                {otherTests && otherTests.length > 0 &&(
                    otherTests.map((value, index) => (
                        <DisplayInfos
                            key={index}
                            type={"others-"+index}
                            valid={!problems.includes("others-"+index)}
                            value={value.text}
                            text={displayText}
                            regexText={regexText}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

interface DisplayerProps {
    id?: string;
    type:string;
    value: string|number;
    values?: string[];
    label?: string;
    placeholder?: string;
    pattern?: string;
    size?: number;
    minLength?: number;
    min?: number;
    maxLength?: number;
    max?: number;
    step?: number;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    options?: string[];
    className?: string;
    style?: React.CSSProperties;
    show?: boolean;
    floatingLabel?: boolean;
    tooltip?: boolean;
    getChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getValue?: (value: string) => void;
    getValues?: (values: string[]) => void;
}

function Displayer({
    id,
    type,
    value,
    values,
    label,
    placeholder,
    pattern,
    size,
    minLength,
    min,
    maxLength,
    max,
    step,
    required = false,
    disabled = false,
    autoComplete = "on",
    options,
    className,
    style,
    tooltip,
    floatingLabel = false,
    getChange,
    getValue,
    getValues
}: DisplayerProps): JSX.Element {
    if (type === "text" || type === "password") {
        if (floatingLabel) {
            return (
                <FloatingLabelInput
                    id={id || ""}
                    type={type}
                    value={value as string}
                    placeholder={placeholder || ""}
                    className={className}
                    required={required}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    pattern={pattern}
                    size={size}
                    minLength={minLength}
                    maxLength={maxLength}
                    getChange={getChange || (() => {})}
                    style={style}
                />
            );
        }
        return (
            <input
                type={type}
                id={id}
                className={className}
                value={value}
                placeholder={placeholder}
                pattern={pattern}
                size={size}
                minLength={minLength}
                maxLength={maxLength}
                required={required}
                disabled={disabled}
                autoComplete={autoComplete}
                style={style}
                onChange={getChange}
            />
        );
    }
    else if (type === "number") {
        if (floatingLabel) {
            return (
                <FloatingLabelInput
                    id={id || ""}
                    type={type}
                    value={value as string}
                    placeholder={placeholder || ""}
                    className={className}
                    required={required}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    pattern={pattern}
                    size={size}
                    step={step}
                    minLength={minLength}
                    maxLength={maxLength}
                    getChange={getChange || (() => {})}
                    style={style}
                />
            );
        }
        return (
            <input
                type={type}
                id={id}
                className={className}
                value={value}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                required={required}
                disabled={disabled}
                autoComplete={autoComplete}
                style={style}
                onChange={getChange}
            />
        );
    }
    else if (type === "select_menu") {
        return (
            <MenuSelect
                id={id || label +'-select'|| ""}
                label={label || ""}
                selectedOption={value as string}
                options={options || []}
                disabled={disabled}
                floatingLabel={floatingLabel}
                className={className}
                style={style}
                required={required}
                tooltip={tooltip}
                onSelect={getValue || (() => {})}
            />
        );
    }
    else if (type === "multiple_select_menu") {
        return (
            <MultipleMenuSelect
                id={id || label +'-multiple-select'|| ""}
                label={label || ""}
                selectedOptions={values as string[]}
                options={options || []}
                disabled={disabled}
                floatingLabel={floatingLabel}
                className={className}
                style={style}
                required={required}
                tooltip={tooltip}
                onSelect={getValues || (() => {})}
            />
        );
    }
    else {
        return <></>;
    }
}