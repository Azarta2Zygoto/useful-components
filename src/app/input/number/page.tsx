"use client";

import React, { useState } from "react";
import NumberInput from "@/components/input/numberInput";
import ComponentSelect from "@/self/componentSelect";

const numberValues = [
    0,
    0,
    0,
    0,
    0,
    0,
]

const selectedOptionDefault = [
    'standard',
    'filled',
    'outlined',
    'outlined'
]

const options = ['standard', 'filled', 'compact', 'outlined'];
export default function NumberPage() {
    const [numberValue, setNumberValue] = useState<number[]>(numberValues);
    const [selectedOption, setSelectedOption] = useState<string[]>(selectedOptionDefault);

    const handleInputChange = (value: number, index:number) => {
        setNumberValue(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        });
    };

    const handleSelectChange = (value: string, index:number) => {
        setSelectedOption(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        }
        );
    }

    return (
        <main>
            <h1>Number Input</h1>
            <p>Number Input allows user to enter numeric values.<br/>
            Its difference is that it allows to use the . and , as a same character for decimal point.<br/>
            It also allows to have more control over the icons.</p>
            <h2>Basic Number Input</h2>

            <ComponentSelect
                options={options}
                value={selectedOption[0]}
                onChange={(val)=>handleSelectChange(val, 0)}
                label={"Input style"}
                id={"select-change-number-1"}
                style={{justifyContent:"space-between"}}
            >
                <div className="colonne">
                    <label htmlFor="number">A basic number input</label>
                    <NumberInput
                        id="number"
                        value={numberValue[0]}
                        variant={selectedOption[0] as "standard" | "filled" | "compact" | "outlined"}
                        placeholder="Enter a number"
                        getChange={(value) => handleInputChange(value, 0)}
                        style={{ width: '200px' }}
                    />
                </div>
            </ComponentSelect>
            <h2>Icons</h2>
            <p>You can hide or display icons</p>
            <ComponentSelect
                options={options}
                value={selectedOption[1]}
                onChange={(val)=>handleSelectChange(val, 1)}
                label={"Input style"}
                id={"select-change-number-2"}
                style={{justifyContent:"space-between"}}
            >
                <div className="colonne">
                    <NumberInput
                        id="number-icon"
                        value={numberValue[1]}
                        variant={selectedOption[1] as "standard" | "filled" | "compact" | "outlined"}
                        placeholder="Enter a number"
                        icon
                        getChange={(value) => handleInputChange(value, 1)}
                        style={{ width: '200px' }}
                    />
                </div>
            </ComponentSelect>
            <h2>Floating label</h2>
            <p>Obviously, it allows floating label</p>
            <ComponentSelect
                options={options}
                value={selectedOption[2]}
                onChange={(val)=>handleSelectChange(val, 2)}
                label={"Input style"}
                id={"select-change-number-3"}
                style={{justifyContent:"space-between"}}
            >
                <div className="colonne">
                    <NumberInput
                        id="number-floating"
                        value={numberValue[2]}
                        variant={selectedOption[2] as "standard" | "filled" | "compact" | "outlined"}
                        placeholder="Enter a number"
                        floatingLabel
                        getChange={(value) => handleInputChange(value, 2)}
                        style={{ width: '200px' }}
                    />
                </div>
            </ComponentSelect>
            <h2>Usual props</h2>
            <p>The usual props such as min, max step can still be used</p>
            <ComponentSelect
                options={options}
                value={selectedOption[3]}
                onChange={(val)=>handleSelectChange(val,3)}
                label={"Input style"}
                id={"select-change-number-4"}
                style={{justifyContent:"space-between"}}
            >
                <div className="colonne">
                    <p>Value between -5 and 20 with a step of 1.5</p>
                    <NumberInput
                        id="number-props"
                        value={numberValue[3]}
                        variant={selectedOption[3] as "standard" | "filled" | "compact" | "outlined"}
                        placeholder="Enter a number"
                        floatingLabel
                        min={-5}
                        max={20}
                        step={1.5}
                        getChange={(value) => handleInputChange(value, 3)}
                        style={{ width: '200px' }}
                    />
                    <NumberInput
                        id="number-required"
                        value={numberValue[4]}
                        variant={selectedOption[3] as "standard" | "filled" | "compact" | "outlined"}
                        placeholder="Enter a number"
                        floatingLabel
                        required
                        getChange={(value) => handleInputChange(value, 4)}
                        style={{ width: '200px' }}
                    />
                    <NumberInput
                        id="number-disabled"
                        value={numberValue[5]}
                        variant={selectedOption[3] as "standard" | "filled" | "compact" | "outlined"}
                        placeholder="Enter a number"
                        floatingLabel
                        disabled
                        getChange={(value) => handleInputChange(value, 5)}
                        style={{ width: '200px' }}
                    />
                </div>
            </ComponentSelect>
        </main>
    );
}