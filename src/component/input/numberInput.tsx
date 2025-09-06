import { ChangeEvent, JSX, useState } from "react";
import FloatingLabelInput from "./input";

interface NumberInputProps {
    id: string;
    value: number;
    placeholder: string;
    className?: string;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    min?: number;
    max?: number;
    step?: number;
    style?: React.CSSProperties;
    getChange: (value:number) => void;
}

export default function NumberInput({
    id,
    value,
    placeholder,
    className,
    required,
    disabled,
    autoComplete,
    min,
    max,
    step,
    style,
    getChange
}:NumberInputProps): JSX.Element {
    const [numberSize, setNumberSize] = useState<number>(-1)

    function handleValueChange(e:ChangeEvent<HTMLInputElement>) {
        let newValue = e.target.value
        newValue.replace(',', '.')
        if (newValue[newValue.length-1]==="." && numberOccurence(newValue, '.')===1){
            setNumberSize(0);
        }
        else {
            setNumberSize(-1)
        }
        if (numberSize!=-1){
            const [start, end] = newValue.slice(newValue.length-1);
            console.log(start, end)
            newValue = start + '.' + end;
        }
        console.log(newValue)
        const numbered = numberAfterComa(newValue);
        console.log(numbered)
        const toNumber = parseFloat(newValue)
        console.log(toNumber)
        getChange(toNumber)
    }

    return (
        <FloatingLabelInput
            type="text"
            id={id}
            value={value}
            placeholder={placeholder}
            className={className}
            required={required}
            disabled={disabled}
            autoComplete={autoComplete}
            style={style}
            getChange={handleValueChange}
        />
    )
}

function numberAfterComa(value:string):number{
    if (value.includes('.')){
        const index=value.indexOf('.')
        return value.length-index
    }
    else {
        return 0
    }
}

function numberOccurence(value:string, char:string):number {
    let compteur = 0;
    for (let i = 0; i<value.length; i++){
        if (value[i]===char) compteur++
    }
    return compteur
}