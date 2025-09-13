import { useState, useEffect, useRef, JSX } from "react";
import DisplayInfos from "./displayInfo";
import MenuSelect from "../menuSelect/menuSelect";
import Tooltip from "../tooltip/tooltip";
import MultipleMenuSelect from "../multipleMenuSelect/multipleMenuSelect";
import FloatingLabelInput from "../input/input";
import BodyAccess from "../utils/bodyAccess";
import NumberInput from "../input/numberInput";
import Icon from "../utils/icon";
import "./inputInfo.css";
import ArrayInput from "../input/arrayInput";

type listType = "text" | "password" |
    "email" | "tel" |
    "url" | "number" |
    "select_menu" | "multiple_select_menu" |
    "fake_input" | "text_array" |
    "number_array" | "email_array" |
    "tel_array" | "url_array" |
    "date" | "textarea"
;

interface InputInfoProps {
    id: string;
    type:listType;
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
    icon?: boolean;
    maxElements?: number;
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
        max_elements?: string,
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
    getNumber?: (value: number) => void;
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
    icon,
    maxElements,
    width = 1025,
    regexText,
    tooltip,
    displayText,
    getChange,
    getValue,
    getValues,
    getNumber
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
                    left: `${window.innerWidth-285-rect.right}px`,
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
        if (maxElements && values && values.length > maxElements) {
            newProblems.push("max_elements")
        }

        setProblems(newProblems)
    }, [max, maxLength, min, minLength, pattern, required, value, otherTests, values, maxElements]);

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
                icon={icon}
                maxElements={maxElements}
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
                getNumber={getNumber}
            />

            <BodyAccess>
                <div
                    style={{
                        opacity: show ? 1 : 0,
                        pointerEvents: show ? "auto" : "none",
                        display: show ? "flex" : "none",
                        zIndex: isOpen&&show ? 4 : 3,
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
                            <Icon
                                name="check-circle-fill"
                                color="var(--valid-border-color)"
                                title={"valid"}
                                desc={"All specifications are met"}
                                style={{marginRight: "0.5rem"}}
                            />
                        ) : (
                            <Icon
                                name="x-circle-fill"
                                color="var(--invalid-border-color)"
                                title={"invalid"}
                                desc={"Some specifications are not met"}
                                style={{marginRight: "0.5rem"}}
                            />
                        )}
                    </Tooltip>
                    <Tooltip title={"More information"}>
                        <button
                            className={`background-click ${isOpen&&"selected"}`}
                            onClick={()=> setIsOpen(!isOpen)}
                            aria-label={"More information"}
                            type="button">
                                <Icon name="info-circle-fill" />
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
                    {maxElements &&
                        <DisplayInfos
                            type="max_elements"
                            valid={!problems.includes("max_elements")}
                            value={maxElements}
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

export interface DisplayerProps {
    id?: string;
    type:listType;
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
    icon?: boolean;
    maxElements?: number;
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
    getNumber?: (value: number) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function Displayer({
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
    icon,
    maxElements,
    autoComplete = "on",
    options,
    className,
    style,
    tooltip,
    floatingLabel,
    getChange,
    getValue,
    getValues,
    getNumber,
    onKeyDown
}: DisplayerProps): JSX.Element {
    if (type === "text_array" || type === "number_array" || type === "email_array" || type === "tel_array" || type === "url_array") {
        return (
            <ArrayInput
                id={id+"-element" || ""}
                type={type === "number_array" ? "number" : type === "email_array" ? "email" : type === "tel_array" ? "tel" : type === "url_array" ? "url" : "text"}
                values={values || []}
                placeholder={placeholder || ""}
                className={className}
                required={required}
                disabled={disabled}
                autoComplete={autoComplete}
                pattern={pattern}
                size={size}
                minLength={minLength}
                maxLength={maxLength}
                min={min}
                max={max}
                icon={icon}
                maxElements={maxElements}
                step={step}
                floatingLabel={floatingLabel}
                style={style}
                getValues={getValues || (() => {})}
                onKeyDown={onKeyDown}
            />
        );
    }
    else if (type === "text" || type === "password" || type === "email" || type === "tel" || type === "url" || type === "date") {
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
                    onKeyDown={onKeyDown}
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
                onKeyDown={onKeyDown}
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
                    getChange={(e)=>getNumber && getNumber(Number(e.target.value))}
                    style={style}
                    onKeyDown={onKeyDown}
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
                onChange={(e)=>getNumber && getNumber(Number(e.target.value))}
                onKeyDown={onKeyDown}
            />
        );
    }
    else if (type === "fake_input") {
        return (
            <NumberInput
                id={id+"-element" || ""}
                value={value as number}
                placeholder={placeholder || ""}
                className={className}
                required={required}
                disabled={disabled}
                autoComplete={autoComplete}
                min={min}
                max={max}
                step={step}
                icon={icon}
                floatingLabel={floatingLabel}
                style={style}
                getChange={getNumber || (() => {})}
                onKeyDown={onKeyDown}
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
    else if (type === "textarea") {
        return (
            <textarea
                id={id+"-element" || ""}
                className={className}
                value={value}
                placeholder={placeholder}
                minLength={minLength}
                maxLength={maxLength}
                required={required}
                disabled={disabled}
                autoComplete={autoComplete}
                style={style}
                onChange={
                    getChange
                        ? (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            // Adapt the event to match the expected signature
                            getChange({
                                ...e,
                                target: {
                                    ...e.target,
                                    value: e.target.value
                                }
                            } as unknown as React.ChangeEvent<HTMLInputElement>);
                        }
                        : undefined
                }
                onKeyDown={
                    onKeyDown
                        ? (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                            // Adapt the event to match the expected signature for input
                            onKeyDown(e as unknown as React.KeyboardEvent<HTMLInputElement>);
                        }
                        : undefined
                }
            />
        );
    }
    else {
        return <></>;
    }
}