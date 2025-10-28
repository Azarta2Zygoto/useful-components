"use client";

import { ChangeEvent, useState } from "react";
import MultiInput from "@/components/input/multiInput";

export default function Page() {
    const [inputValues, setInputValues] = useState<{
        firstName: string[];
        lastName: string[];
        age: number[];
    }>({
        firstName: [],
        lastName: [],
        age: []
    });

    function handleFistNameChange(e: ChangeEvent<HTMLInputElement>, index: number) {
        const newValues = [...inputValues.firstName];
        newValues[index] = e.target.value;
        setInputValues(prev => ({ ...prev, firstName: newValues }));
    }

    function handleLastNameChange(e: ChangeEvent<HTMLInputElement>, index: number) {
        const newValues = [...inputValues.lastName];
        newValues[index] = e.target.value;
        setInputValues(prev => ({ ...prev, lastName: newValues }));
    }

    function handleAgeChange(value:number, index: number) {
        const newValues = [...inputValues.age];
        newValues[index] = value;
        setInputValues(prev => ({ ...prev, age: newValues }));
    }
    return (
        <div>
            <h1>Multi Input Example</h1>
            <MultiInput
                title="Enter values:"
                headers={["First Name", "Last Name", "Age", "Disabled Input"]}
                inputs={[
                    {
                        id: "firstName",
                        label:"firstName",
                        type: "text",
                        value: inputValues.firstName,
                        getChange: handleFistNameChange

                    },
                    {
                        id: "lastName",
                        label:"firstName",
                        type: "text",
                        value: inputValues.lastName,
                        getChange: handleLastNameChange
                    },
                    {
                        id: "age",
                        label:"firstName",
                        type: "number",
                        value: inputValues.age,
                        getNumber: handleAgeChange
                    },
                    {
                        id: "disabledInput",
                        label:"firstName",
                        type: "text_array",
                        value: ["Disabled"],
                        disabled: true
                    }
                ]}
            />
            <div>
                <h2>Current Values:</h2>
                <ul>
                    {Object.keys(inputValues).map((value, index) => (
                        
                        <li key={index}>
                            {inputValues[value as keyof typeof inputValues].join(", ")}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}