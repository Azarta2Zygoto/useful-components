"use client";

import React, { useState } from "react";

import ArrayInput from "@/components/input/arrayInput";
import { InfoComponent } from "@/self/moreInfo";

const arrayValues = [[], [], [], []];

const comboboxOptions = [
    "banana",
    "apple",
    "orange",
    "grape",
    "kiwi",
    "mango",
    "pear",
    "peach",
    "pineapple",
    "strawberry",
    "watermelon",
];

export default function ArrayInputPage() {
    const [arrayValue, setArrayValue] = useState<string[][]>(arrayValues);

    const handleInputChange = (value: string[], index: number) => {
        setArrayValue((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        });
    };

    return (
        <main>
            <h1>Array Input</h1>
            <p>
                Array Input allows user to enter multiple values in a single
                input component.
                <br />
                You can use it with all different type of input including the
                custom number input.
            </p>
            <h2>Basic Array Input</h2>
            <div className="inner-component">
                <ArrayInput
                    id="array-input-1"
                    values={arrayValue[0]}
                    placeholder="Enter a value"
                    type="text"
                    getValues={(value) => handleInputChange(value, 0)}
                />
            </div>
            <InfoComponent>
                <p>
                    The Array Input component is designed to handle multiple
                    input values efficiently. It provides a user-friendly
                    interface for adding, removing, and managing a list of
                    inputs.
                </p>
            </InfoComponent>
            <h2>Without reset</h2>
            <p>
                You can disable the reset button if you don&apos;t want the user
                to make the error to reset the input.
                <br />
                It is usefull mainly when you the user need to enter a large
                number of element
            </p>
            <div className="inner-component">
                <ArrayInput
                    id="array-input-2"
                    values={arrayValue[1]}
                    placeholder="Enter a value"
                    type="text"
                    reset={false}
                    getValues={(value) => handleInputChange(value, 1)}
                />
            </div>
            <h2>Custom box style</h2>
            <p>
                You can customize the style of the boxes containing the values
                by using the <code>boxStyle</code> and <code>boxClassName</code>{" "}
                props.
            </p>
            <div className="inner-component">
                <ArrayInput
                    id="array-input-3"
                    values={arrayValue[2]}
                    placeholder="Enter a value"
                    type="text"
                    boxClassName="custom-array-box"
                    getValues={(value) => handleInputChange(value, 2)}
                />
            </div>
            <h2>Combobox uses</h2>
            <p>It is also possible to combine it with a combobox.</p>
            <div className="inner-component">
                <ArrayInput
                    id="array-input-4"
                    values={arrayValue[3]}
                    placeholder="Enter a value"
                    floatingLabel
                    options={comboboxOptions}
                    type="combobox"
                    getValues={(value) => handleInputChange(value, 3)}
                />
            </div>
            <InfoComponent>
                <p>
                    You can&apos;t combine it with a select menu, use a multiple
                    select menu instead
                </p>
            </InfoComponent>
        </main>
    );
}
