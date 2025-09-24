"use client";

import { Fragment, useState } from "react";
import MenuSelect from "@/component/menuSelect/menuSelect";

const selectOptionsList = [
    "apple",
    "",
    "",
    "",
    "",
    "",
    "",
    "apple",
    "",
    "",
    "",
    "apple",
    "apple"
]

const selectOptions = [
    "banana",
    "apple",
    "orange",
    "grape",
    "mango",
    "pineapple",
    "strawberry",
    "blueberry",
    "watermelon",
    "kiwi"
]

export default function MenuSelectPage(){
    const [selectedOption, setSelectedOption] = useState<string[]>(selectOptionsList);

    const handleInputChange = (newValue:string, index:number) => {
        setSelectedOption(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = newValue;
            return newValues;
        });
    };

    function customOptions(option:string){
        return (
            <Fragment>
                <i className="bi bi-emoji-smile"></i>&nbsp;
                <span style={{textTransform:"capitalize"}}>{option}</span>
            </Fragment>
        )
    }

    function customListOptions(index:number){
        const value = selectOptions[index];
        return (
            <Fragment>
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                <img src={`/useful-components/${value}-icon.svg`} alt={value} style={{width:"20px", height:"20px", verticalAlign:"middle"}}/>
                &nbsp;<span style={{textTransform:"capitalize"}}>{value}</span>
            </Fragment>
        )
    }
        
    return (
        <main>
            <h1>Select Menu</h1>
            <p>A select menu allows the user to select information defined but the owner of the website</p>

            <h2>Basic select menu</h2>
            <div className="inner-component">
                <MenuSelect
                    id="example-select"
                    label="Select Menu"
                    options={selectOptions}
                    selectedOption={selectedOption[0]}
                    onSelect={(value) => handleInputChange(value, 0)}
                    style={{ width: "200px" }}
                />
                <MenuSelect
                    id="example-select-floating"
                    label="Floating label"
                    options={selectOptions}
                    floatingLabel
                    selectedOption={selectedOption[10]}
                    onSelect={(value) => handleInputChange(value, 10)}
                    style={{ width: "200px" }}
                />
            </div>

            <h2>Different variant</h2>
            <p>Select menu can have different variants : standard, filled, compact and outlined.</p>
            <div className="inner-component">
                <MenuSelect
                    id="example-select-compact"
                    label="Compact select"
                    variant="compact"
                    options={selectOptions}
                    selectedOption={selectedOption[1]}
                    onSelect={(value) => handleInputChange(value, 1)}
                    style={{ width: "150px" }}
                />
                <MenuSelect
                    id="example-select-filled"
                    variant="filled"
                    label="Filled select"
                    options={selectOptions}
                    selectedOption={selectedOption[2]}
                    onSelect={(value) => handleInputChange(value, 2)}
                    style={{ width: "150px" }}
                />
                <MenuSelect
                    id="example-select-standard"
                    variant="standard"
                    label="Standard select"
                    options={selectOptions}
                    selectedOption={selectedOption[3]}
                    onSelect={(value) => handleInputChange(value, 3)}
                    style={{ width: "150px" }}
                />
            </div>

            
            <h2>Without icon</h2>
            <p>If you want, you can hide the icon. However, it doesn&apos;t help user to see the difference between a select menu and an input.</p>
            <div className="inner-component">
                <MenuSelect
                    id="example-select-icon"
                    label="Select Menu without icon"
                    options={selectOptions}
                    hideIcon
                    selectedOption={selectedOption[4]}
                    onSelect={(value) => handleInputChange(value, 4)}
                    style={{ width: "200px" }}
                />
            </div>
            <h2>The icon select menu</h2>
            <p>You can also put a custom icon in the select menu.</p>
            <div className="inner-component">
                <MenuSelect
                    id="example-select-icon-custom"
                    options={selectOptions}
                    selectedOption={selectedOption[5]}
                    onSelect={(value) => handleInputChange(value, 5)}
                    style={{ width: "200px" }}
                    setCustomOption={customOptions}
                />
            </div>
            <h2>Customized select</h2>
            <p>You can also customized each lines of the select</p>
            <div className="inner-component">
                <MenuSelect
                    id="example-select-icon-custom-list"
                    options={selectOptions}
                    selectedOption={selectedOption[6]}
                    onSelect={(value) => handleInputChange(value, 6)}
                    style={{ width: "200px" }}
                    setCustomList={customListOptions}
                />
            </div>
            <h2>Special variant - invisible</h2>
            <p>The invisible variant is used when you want to integrate the select menu in a text or a sentence.</p>
            <div className="inner-component">
                I like to eat&nbsp;: <MenuSelect
                    id="example-select-invisible"
                    options={selectOptions}
                    variant="invisible"
                    hideIcon
                    selectedOption={selectedOption[7]}
                    onSelect={(value) => handleInputChange(value, 7)}
                    style={{ width: "fit-content" }}
                />
            </div>
            <h2>Tooltip</h2>
            <p>When uses with invisible or for other reason, it is possible to attach a tooltip to the select menu</p>
            <div className="inner-component">
                I like to eat&nbsp;: <MenuSelect
                    id="example-select-invisible-tooltip"
                    label="Invisible with tooltip"
                    options={selectOptions}
                    variant="invisible"
                    hideIcon
                    tooltip
                    selectedOption={selectedOption[11]}
                    onSelect={(value) => handleInputChange(value, 11)}
                    style={{ width: "fit-content" }}
                />
            </div>
            <h2>Other features</h2>
            <p>Such as input, you can also use required and disabled props.</p>
            <div className="inner-component">
                <MenuSelect
                    id="example-select-required"
                    options={selectOptions}
                    required
                    selectedOption={selectedOption[8]}
                    onSelect={(value) => handleInputChange(value, 8)}
                    style={{ width: "200px" }}
                />
                <MenuSelect
                    id="example-select-disabled"
                    options={selectOptions}
                    disabled
                    selectedOption={selectedOption[9]}
                    onSelect={(value) => handleInputChange(value, 9)}
                    style={{ width: "200px" }}
                />
            </div>
        </main>
    );
}