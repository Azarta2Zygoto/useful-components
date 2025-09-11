"use client";

import { useState } from "react";
import FloatingLabelInput from "@/component/input/input";
import NumberInput from "@/component/input/numberInput";
import ArrayInput from "@/component/input/arrayInput";

const inputValues = [
    "",
    "",
    "",
    "Disabled Input"
]

const numberValues = [
    1, 0, 0, 0
]

export default function InputPage() {
    const [inputValue, setInputValue] = useState<string[]>(inputValues);
    const [numberValue, setNumberValue] = useState<number[]>(numberValues);
    const [ArrayTextChange, setArrayTextChange] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index:number) => {
        setInputValue(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = e.target.value;
            return newValues;
        });
    };

    function handleNumberValuesChanges(value:number, index:number) {
        setNumberValue(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        });
    }   

    return (
        <main>
            <h1>Floating Label Input Example</h1>
            <FloatingLabelInput
                id="example-input"
                type="text"
                value={inputValue[0]}
                placeholder="Enter text"
                getChange={(e)=>handleInputChange(e, 0)}
            />
            <FloatingLabelInput
                id="example-input required"
                type="text"
                value={inputValue[1]}
                placeholder="Enter text"
                required
                getChange={(e)=>handleInputChange(e, 1)}
            />
            <FloatingLabelInput
                id="example-input-disabled"
                type="text"
                value={inputValue[2]}
                placeholder="Enter text"
                disabled
                getChange={(e)=>handleInputChange(e, 2)}
            />
            <FloatingLabelInput
                id="example-input-disabled-2"
                type="text"
                value={inputValue[3]}
                placeholder="Enter text"
                disabled
                getChange={(e)=>handleInputChange(e, 3)}
            />
            <NumberInput
                id="Number"
                value={numberValue[0]}
                placeholder="change the number"
                getChange={(v)=>handleNumberValuesChanges(v, 0)}
                />
                
            <NumberInput
                id="Number-floating"
                value={numberValue[1]}
                placeholder="change the number"
                floatingLabel
                getChange={(v)=>handleNumberValuesChanges(v, 1)}
                />
            <NumberInput
                id="Number-floating-icon"
                value={numberValue[2]}
                placeholder="change the number"
                icon
                floatingLabel
                getChange={(v)=>handleNumberValuesChanges(v, 2)}
                />
            <NumberInput
                id="Number-floating-icon-max"
                value={numberValue[2]}
                placeholder="change the number - max 10"
                icon
                max={10}
                floatingLabel
                getChange={(v)=>handleNumberValuesChanges(v, 2)}
                />
            <ArrayInput
                id="Array-input"
                type="text"
                values={ArrayTextChange}
                placeholder="Add values to the array"
                style={{maxWidth:450}}
                getValues={(v)=>setArrayTextChange(v)}
                />
        </main>
    );
}