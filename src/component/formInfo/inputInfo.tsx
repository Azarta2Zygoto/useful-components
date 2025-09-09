import { useState, useEffect, useRef, JSX } from "react";
import DisplayInfos from "./displayInfo";
import MenuSelect from "../menuSelect/menuSelect";
import Tooltip from "../tooltip/tooltip";
import MultipleMenuSelect from "../multipleMenuSelect/multipleMenuSelect";
import FloatingLabelInput from "../input/input";
import "./inputInfo.css";
import BodyAccess from "../utils/bodyAccess";

interface InputInfoProps {
    id: string;
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
    const [positionTooltip, setPositionTooltip] = useState<{ top: string; left: string; translateY:string }>({ top: "0", left: "0", translateY: "-50%" });
    const [position, setPosition] = useState<{ top: string; left: string; translateY:string }>({ top: "0", left: "0", translateY: "-50%" });

    useEffect(() => {
        if (typeof document === "undefined") return;
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
        if (typeof document === "undefined") return;

        function updateTooltipPosition() {
            const input = document.getElementById(id + "-element");
            if (!input) return;
            const rect = input.getBoundingClientRect();
            let top = rect.top + rect.height / 2 + window.scrollY;
            const left = rect.right + 10 + window.scrollX;
            
            // Check for top overflow
            if (top + 40 > window.innerHeight) {
                top = window.innerHeight - 40;
            }
            setPositionTooltip({
                top: `${top}px`,
                left: `${left}px`,
                translateY: "-50%",
            });

            const tooltipWidth = 250;
            const dif = window.innerWidth - (rect.right + tooltipWidth + 90);
            if (dif > 0) {
                setPosition({
                    top: "14px",
                    left: `55px`,
                    translateY: "-50%"
                });
            } else {
                setPosition({
                    top: `28px`,
                    left: `${window.innerWidth-270-rect.right}px`,
                    translateY: "0"
                });
            }
        }

        updateTooltipPosition();
        window.addEventListener("resize", updateTooltipPosition);
        window.addEventListener("scroll", updateTooltipPosition, true);

        return () => {
            window.removeEventListener("resize", updateTooltipPosition);
            window.removeEventListener("scroll", updateTooltipPosition, true);
        };
    }, [id, show, width]);

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

            <BodyAccess>
                <div
                    style={{
                        opacity: show ? 1 : 0,
                        pointerEvents: show ? "auto" : "none",
                        display: show ? "flex" : "none",
                        top: positionTooltip.top,
                        left: positionTooltip.left,
                        transform: `translateY(${positionTooltip.translateY})`,
                    }}
                    ref={tooltipContentRef}
                    className={"tooltip-content right"}
                >
                    <Tooltip
                        title={problems.length===0 ? "All specifications are met" : `${problems.length} specification${problems.length>1?"s are":" is"} not met`}
                        style={{height:"16px"}}>
                        {problems.length===0 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" viewBox="0 0 16 16" style={{marginRight: "5px"}}>
                                <desc>All specifications are met</desc>
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" viewBox="0 0 16 16" style={{marginRight: "5px"}}>
                                <desc>Some specifications are not met</desc>
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                            </svg>
                        )}
                    </Tooltip>
                    <Tooltip title={"More information"}>
                        <button
                            className={`background-click ${isOpen&&"selected"}`}
                            onClick={()=> setIsOpen(!isOpen)}
                            aria-label={"More information"}
                            type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <desc>See all the information</desc>
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                            </svg>
                        </button>
                    </Tooltip>
                    
                <div className="form-info"
                    id={`${id}-forminfo`}
                    ref={formInfoRef}
                    style={{
                        display: isOpen && show ? "flex" : "none",
                        opacity: isOpen && show ? 1 : 0,
                        top:position.top,
                        left:position.left,
                        pointerEvents: isOpen && show  ? "auto" : "none",
                        transform: `translateY(${position.translateY})`,
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
                    {min &&
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
                                type={"else"}
                                valid={!problems.includes("others-"+index)}
                                value={value.text}
                                text={displayText}
                                regexText={regexText}
                            />
                        ))
                    )}
                </div>
                </div>
            </BodyAccess>
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
    if (type === "text" || type === "password" || type === "email" || type === "tel" || type === "url") {
        if (floatingLabel) {
            return (
                <FloatingLabelInput
                    id={id+"-element" || ""}
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
                id={id+"-element" || ""}
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
                    id={id+"-element" || ""}
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
                id={id+"-element" || ""}
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
                id={id+"-element" || ""}
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
                id={id+"-element" || ""}
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