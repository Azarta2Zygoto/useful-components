import { JSX } from "react"
import { regexEnTexte } from "../utils/function"

interface displayInfoProps {
    type: string,
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
    let totalText = ""
    if (type === "required") totalText = text?.required || "This field is required";
    else if (type === "min_cara") totalText = text?.
        min_cara?.replace("{value}", String(value))||"Minimum {value} characters";
    else if (type === "max_cara") totalText = text?.
        max_cara?.replace("{value}", String(value))||"Maximum {value} characters";
    else if (type === "pattern" && value) totalText = text?.
        pattern?.replace("{value}", regexEnTexte(value.toString(), regexText))||"The value does not match the required format";
    else if (type === "min_number") totalText = text?.
        min_number?.replace("{value}", String(value))||"Minimum value is {value}";
    else if (type === "max_number") totalText = text?.
        max_number?.replace("{value}", String(value))||"Maximum value is {value}";
    else {
        totalText = String(value);
    }

    return (
        <span className="ligne">
            {valid?(
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" viewBox="0 0 16 16">
                    <desc>The specification is correct</desc>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
            ):(
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" viewBox="0 0 16 16">
                    <desc>The specification is incorrect</desc>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                </svg>
            )}
           {totalText}
        </span>
    )
}