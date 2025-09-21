"use client";

import React, { useState } from "react";
import FloatingLabelInput from "@/component/input/input";
import MenuSelect from "@/component/menuSelect/menuSelect";
import ComponentSelect from "@/self/componentSelect";

const inputValues = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
]

const selectedOptionDefault = [
    'standard',
    'filled',
    'outlined',
    'outlined'
]

const options = ['standard', 'filled', 'compact', 'outlined'];
export default function InputPage() {
    const [inputValue, setInputValue] = useState<string[]>(inputValues);
    const [numberValue, setNumberValue] = useState<number>(0);
    const [dateValue, setDateValue] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string[]>(selectedOptionDefault);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index:number) => {
        setInputValue(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = e.target.value;
            return newValues;
        });
    };

    const handleSelectChange = (value: string, index:number) => {
        setSelectedOption(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        });
    };

    return (
        <main>
            <h1>Input</h1>
            <p>Input allows user to enter specific information</p>

            <h2>Basic input</h2>


            <div className="inner-component">
                <div className="colonne">
                    <label htmlFor="text">A text input</label>
                    <input
                        id="text"
                        type="text"
                        className="input-standard"
                        value={inputValue[0]}
                        placeholder="Enter text"
                        onChange={(e)=>handleInputChange(e, 0)}
                    />
                </div>
            </div>

            
            <h2>Different variant</h2>
            <p>Input can have different variants : standard, filled, compact and outlined</p>
            <div className="inner-component">
                <div className="colonne">
                    <label htmlFor="filled">Filled</label>
                    <input
                        id="filled"
                        type="text"
                        className="input-filled"
                        value={inputValue[1]}
                        placeholder="Enter text"
                        onChange={(e)=>handleInputChange(e, 1)}
                    />
                </div>
                <div className="colonne">
                    <label htmlFor="compact">Compact</label>
                    <input
                        id="compact"
                        type="text"
                        className="input-compact"
                        value={inputValue[2]}
                        placeholder="Enter text"
                        onChange={(e)=>handleInputChange(e, 2)}
                    />
                </div>
                <div className="colonne">
                    <label htmlFor="outlined">Outlined</label>
                    <input
                        id="outlined"
                        type="text"
                        className="input-outlined"
                        value={inputValue[3]}
                        disabled    
                        placeholder="Enter text"
                        onChange={(e)=>handleInputChange(e, 3)}
                    />
                </div>
            </div>
            <h2>Other input type</h2>
            <p>Obviously, variants work with other type of input</p>
            <div className="inner-component" style={{minHeight: "100px"}}>
                <MenuSelect
                    id={"select-change-number"}
                    boxClassName="inner-component-select"
                    options={options}
                    selectedOption={selectedOption[0]}
                    onSelect={(val)=>handleSelectChange(val, 0)}
                    floatingLabel
                    backgroundColor="var(--bg2)"
                    style={{width:140}}
                    label={"Number input style"}
                />
                <MenuSelect
                    id={"select-change-number"}
                    boxClassName="inner-component-select-sub"
                    options={options}
                    selectedOption={selectedOption[1]}
                    onSelect={(val)=>handleSelectChange(val, 1)}
                    floatingLabel
                    backgroundColor="var(--bg2)"
                    style={{width:140}}
                    label={"Date input style"}
                />
                <div className="colonne">
                    <label htmlFor="number">Number</label>
                    <input
                        id="number"
                        type="number"
                        className={`input-${selectedOption[0]}`}
                        value={numberValue}
                        placeholder="Enter text"
                        onChange={(e)=>setNumberValue(Number(e.target.value))}
                    />
                </div>
                <div className="colonne">
                    <label htmlFor="date">Date</label>
                    <input
                        id="date"
                        type="date"
                        className={`input-${selectedOption[1]}`}
                        value={dateValue}
                        placeholder="Enter text"
                        onChange={(e)=>setDateValue(e.target.value)}
                    />
                </div>
            </div>
            <h2>Floating label</h2>
            <p>Input can also have floating label</p>
            <ComponentSelect
                options={options}
                value={selectedOption[2]}
                onChange={(val)=>handleSelectChange(val, 2)}
                label={"Input style"}
                id={"select-change-floating-label-style"}
            >
                <FloatingLabelInput
                    id="floating-label-input"
                    type="text"
                    value={inputValue[4]}
                    variant={selectedOption[2] as "standard" | "filled" | "compact" | "outlined"}
                    placeholder="Enter text"
                    getChange={(e)=>handleInputChange(e, 4)}
                />
            </ComponentSelect>
            <h2>Floating label with other features</h2>
            <p>Floating label also works with other features like required, disabled, invalid...</p>
            <ComponentSelect
                options={options}
                value={selectedOption[3]}
                onChange={(val)=>handleSelectChange(val, 3)}
                label={"Input style"}
                id={"select-change-floating-label-style-fields"}
            >
                <FloatingLabelInput
                    id="floating-label-input-required"
                    type="text"
                    required
                    value={inputValue[5]}
                    variant={selectedOption[3] as "standard" | "filled" | "compact" | "outlined"}
                    placeholder="Enter text"
                    getChange={(e)=>handleInputChange(e, 5)}
                />
                <FloatingLabelInput
                    id="floating-label-input-disabled"
                    type="text"
                    disabled
                    value={inputValue[6]}
                    variant={selectedOption[3] as "standard" | "filled" | "compact" | "outlined"}
                    placeholder="Enter text"
                    getChange={(e)=>handleInputChange(e, 6)}
                />
                <FloatingLabelInput
                    id="floating-label-input-invalid"
                    type="text"
                    pattern={"^[A-Za-z]+$"}
                    value={inputValue[7]}
                    variant={selectedOption[3] as "standard" | "filled" | "compact" | "outlined"}
                    placeholder="Enter only letters"
                    getChange={(e)=>handleInputChange(e, 7)}
                />
            </ComponentSelect>
        </main>
    );
}