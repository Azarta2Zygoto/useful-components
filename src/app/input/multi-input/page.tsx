"use client";

import React, { useState } from "react";

import MultiInput from "@/components/input/multiInput";
import ComponentSelect from "@/self/componentSelect";
import { InfoComponent } from "@/self/moreInfo";

const multiValues = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

const selectedOptionDefault = ["standard", "filled", "outlined"];
const options = ["standard", "filled", "compact", "outlined"];
export default function MultiArrayPage() {
    const [multiValue, setMultiValue] =
        useState<(string[] | number[])[]>(multiValues);
    const [selectedOption, setSelectedOption] = useState<string[]>(
        selectedOptionDefault,
    );
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        arrayIndex: number,
        index: number,
    ) => {
        setMultiValue((prevValues) => {
            const newValues = [...prevValues];
            newValues[arrayIndex][index] = e.target.value;
            return newValues;
        });
    };

    const handleSelectChange = (value: string, index: number) => {
        setSelectedOption((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        });
    };
    return (
        <main>
            <h1>Multi Input</h1>
            <p>
                Multi Input allows user to enter multiple values in a single
                input component.
                <br />
                It is useful when you want to group related inputs together,
                such as entering multiple tags or categories.
            </p>
            <h2>Basic Multi Input</h2>

            <ComponentSelect
                show={false}
                options={options}
                value={selectedOption[0]}
                onChange={(val) => handleSelectChange(val, 0)}
                label={"Input style"}
                id={"select-change-multi-1"}
                style={{ justifyContent: "space-between" }}
            >
                <MultiInput
                    title="Multi Input for form values"
                    headers={["First Name", "Last Name", "Age"]}
                    inputs={[
                        {
                            value: multiValue[0],
                            placeholder: "First Name",
                            type: "text",
                            getChange(e, index) {
                                handleInputChange(e, 0, index);
                            },
                            variant: selectedOption[0] as
                                | "standard"
                                | "filled"
                                | "compact"
                                | "outlined",
                            style: { width: "150px" },
                        },
                        {
                            value: multiValue[1],
                            placeholder: "Last Name",
                            type: "text",
                            getChange(e, index) {
                                handleInputChange(e, 1, index);
                            },
                            style: { width: "150px" },
                        },
                        {
                            value: multiValue[2].map((c) => Number(c)),
                            placeholder: "Age",
                            type: "fake_input",
                            getNumber(value, index) {
                                handleInputChange(
                                    {
                                        target: { value: value.toString() },
                                    } as React.ChangeEvent<HTMLInputElement>,
                                    2,
                                    index,
                                );
                            },
                            style: { width: "150px" },
                        },
                    ]}
                />
            </ComponentSelect>
            <InfoComponent>
                <p>
                    It is just a fast way to create a form info where you can
                    add an unknow number of element
                </p>
            </InfoComponent>
        </main>
    );
}
