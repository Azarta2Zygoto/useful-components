"use client";

import { useState } from "react";
import FloatingLabelInput from "@/component/input/input";

const inputValues = [
    "",
    "",
    "",
    "Disabled Input"
]
export default function InputPage() {
    const [inputValue, setInputValue] = useState<string[]>(inputValues);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index:number) => {
        setInputValue(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = e.target.value;
            return newValues;
        });
    };

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
        </main>
    );
}