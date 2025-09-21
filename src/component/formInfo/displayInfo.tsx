"use client";

import { JSX,useMemo } from "react"
import { regexEnTexte } from "../utils/function"
import Icon from "../utils/icon";

const defaultTexts = {
    required: "This field is required",
    min_cara: "Minimum {value} characters",
    max_cara: "Maximum {value} characters",
    pattern: "The value does not match the required format",
    min_number: "Minimum value is {value}",
    max_number: "Maximum value is {value}",
    max_elements: "Maximum {value} elements",
};

type InfoType =
    | "required"
    | "min_cara"
    | "max_cara"
    | "pattern"
    | "min_number"
    | "max_number"
    | "max_elements"
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
            case "max_elements":
                return (text?.max_elements || defaultTexts.max_elements).replace("{value}", String(value));
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
            {valid ?
                <Icon
                    name="check-circle-fill"
                    title="Valid"
                    desc="The specifications are correct"
                    color="var(--valid-border-color)"
                /> :
                <Icon
                    name="x-circle-fill"
                    title="Invalid"
                    desc="The specifications are incorrect"
                    color="var(--invalid-border-color)"
                />
            }
            {totalText}
        </span>
    )
}