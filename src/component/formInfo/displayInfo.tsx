import { JSX,useMemo } from "react"
import { regexEnTexte } from "../utils/function"

function ValidIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" viewBox="0 0 16 16" aria-label="Valid">
            <title>Valid specification</title>
            <desc>The specification is correct</desc>
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
    );
}

function InvalidIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" viewBox="0 0 16 16" aria-label="Invalid">
            <title>Invalid specification</title>
            <desc>The specification is incorrect</desc>
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
        </svg>
    );
}
const defaultTexts = {
    required: "This field is required",
    min_cara: "Minimum {value} characters",
    max_cara: "Maximum {value} characters",
    pattern: "The value does not match the required format",
    min_number: "Minimum value is {value}",
    max_number: "Maximum value is {value}",
};

type InfoType =
    | "required"
    | "min_cara"
    | "max_cara"
    | "pattern"
    | "min_number"
    | "max_number"
    | "else";

interface displayInfoProps {
    type: InfoType,
    valid: boolean,
    value?: string|number
    text?:{
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
}
export default function DisplayInfos({
    type,
    valid,
    value,
    text,
    regexText
}:displayInfoProps):JSX.Element{
    const totalText = useMemo(() => {
        switch (type) {
            case "required":
                return text?.required || defaultTexts.required;
            case "min_cara":
                return (text?.min_cara || defaultTexts.min_cara).replace("{value}", String(value));
            case "max_cara":
                return (text?.max_cara || defaultTexts.max_cara).replace("{value}", String(value));
            case "pattern":
                return value
                    ? (text?.pattern || defaultTexts.pattern).replace("{value}", regexEnTexte(value.toString(), regexText))
                    : defaultTexts.pattern;
            case "min_number":
                return (text?.min_number || defaultTexts.min_number).replace("{value}", String(value));
            case "max_number":
                return (text?.max_number || defaultTexts.max_number).replace("{value}", String(value));
            default:
                return String(value ?? "");
        }
    }, [type, value, text, regexText]);

    return (
        <span
            className="display-info"
            role="status"
            aria-live="polite"
            aria-label={valid ? "Valid specification" : "Invalid specification"}
        >
            {valid ? <ValidIcon /> : <InvalidIcon />}
            {totalText}
        </span>
    )
}