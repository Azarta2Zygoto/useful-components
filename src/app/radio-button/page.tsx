"use client";

import React, { Fragment, useState } from "react";

import { WarningComponent } from "@/components/WrapperComponent";
import RadioGroup from "@/components/ui/radio-button/RadioGroup";

const radioList = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

const options3 = [
    { value: "banana", name: "banana" },
    { value: "apple", name: "apple" },
    { value: "orange", name: "orange" },
];

const options5 = [
    { value: "banana", name: "banana" },
    { value: "apple", name: "apple" },
    { value: "orange", name: "orange" },
    { value: "grape", name: "grape" },
    { value: "mango", name: "mango" },
];

const options5Disabled = [
    { value: "banana", name: "banana" },
    { value: "apple", name: "apple", disabled: true },
    { value: "orange", name: "orange" },
    { value: "grape", name: "grape", disabled: true },
    { value: "mango", name: "mango" },
];

export default function RadioButtonPage() {
    const [selectedValue, setSelectedValue] =
        useState<(string | null)[]>(radioList);

    const options5Images = options5.map((value) => ({
        value: value.value,
        name: value.name,
        label: (
            <Fragment key={value.value}>
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                <img
                    src={`/useful-components/icon/${value.value}-icon.svg`}
                    alt={value.value}
                    style={{
                        width: "20px",
                        height: "20px",
                        verticalAlign: "middle",
                    }}
                />
                &nbsp;
                <span style={{ textTransform: "capitalize" }}>
                    {value.value}
                </span>
            </Fragment>
        ),
    }));

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        setSelectedValue((prev) => {
            const newValue = [...prev];
            newValue[index] = event.target.value;
            return newValue;
        });
    };

    return (
        <main>
            <h1>Radio button</h1>
            <p>
                A radio group of a radio button allow you to select one choice
                over multiple options. You can&apos;t select multiple choices
            </p>

            <h2>Basic radio button</h2>
            <div className="inner-component">
                <RadioGroup
                    name="radio-group-3-primary"
                    label="Choose an option - primary"
                    variant="primary"
                    elements={options3}
                    selectedValue={selectedValue[0]}
                    onChange={(e) => handleChange(e, 0)}
                    columns={2}
                    width={100}
                />
                <RadioGroup
                    name="radio-group-3-secondary"
                    label="Choose an option - secondary"
                    variant="secondary"
                    elements={options3}
                    selectedValue={selectedValue[1]}
                    onChange={(e) => handleChange(e, 1)}
                    columns={2}
                    style={{ width: "100px" }}
                />
                <RadioGroup
                    name="radio-group-3-basic"
                    label="Choose an option - basic"
                    variant="basic"
                    elements={options3}
                    selectedValue={selectedValue[3]}
                    onChange={(e) => handleChange(e, 3)}
                    columns={2}
                    style={{ width: "100px" }}
                />
            </div>
            <h2>Line control</h2>
            <p>
                You can control the number of item per line with the columns
                property
            </p>
            <div className="inner-component">
                <RadioGroup
                    name="radio-group-5-1"
                    label="One per lines"
                    elements={options5}
                    selectedValue={selectedValue[1]}
                    onChange={(e) => handleChange(e, 1)}
                    columns={1}
                    style={{ width: "100px" }}
                />
                <RadioGroup
                    name="radio-group-5-2"
                    label="Two per lines"
                    elements={options5}
                    selectedValue={selectedValue[2]}
                    onChange={(e) => handleChange(e, 2)}
                    columns={2}
                    style={{ width: "100px" }}
                />
                <RadioGroup
                    name="radio-group-5-3"
                    label="Three per lines"
                    elements={options5}
                    selectedValue={selectedValue[3]}
                    onChange={(e) => handleChange(e, 3)}
                    columns={3}
                    style={{ width: "100px" }}
                />
            </div>
            <WarningComponent>
                <p>
                    If the width of the screen is too low, there isn&apos;t any
                    automatic change to not overflow from the screen.
                </p>
            </WarningComponent>
            <h2>Disabled</h2>
            <p>You can disable the entire radio group or specific elements.</p>
            <div className="inner-component">
                <RadioGroup
                    name="radio-group-disabled"
                    label="Disabled options"
                    elements={options3}
                    selectedValue={"banane"}
                    onChange={() => {}}
                    disabled
                    columns={2}
                    style={{ width: "100px" }}
                />
                <RadioGroup
                    name="radio-group-disabled-elements"
                    label="Disabled elements"
                    elements={options5Disabled}
                    selectedValue={selectedValue[4]}
                    onChange={(e) => handleChange(e, 4)}
                    columns={2}
                    variant="basic"
                    style={{ width: "100px" }}
                />
            </div>
            <h2>Required</h2>
            <p>You can ask the user to select one option.</p>
            <div className="inner-component">
                <RadioGroup
                    name="radio-group-required"
                    label="You must choose an option"
                    elements={options3}
                    selectedValue={selectedValue[5]}
                    onChange={(e) => handleChange(e, 5)}
                    required
                    columns={2}
                    style={{ width: "100px" }}
                />
            </div>
            <h2>Deselect</h2>
            <p>
                You can allow the user to deselect an option by clicking on it
                again.
            </p>
            <div className="inner-component">
                <RadioGroup
                    name="radio-group-deselect"
                    label="Choose an option and deselect if needed"
                    elements={options3}
                    selectedValue={selectedValue[6]}
                    onChange={(e) => handleChange(e, 6)}
                    required
                    columns={2}
                    deselect
                    style={{ width: "100px" }}
                />
            </div>
            <h2>Labeling</h2>
            <p>
                You can put label that will be display instead of the value of
                the radio button
                <br />
                That is not regular label but can be React node !
            </p>

            <div className="inner-component">
                <RadioGroup
                    name="radio-group-tooltip"
                    label="Choose an option"
                    elements={options5Images}
                    selectedValue={selectedValue[7]}
                    onChange={(e) => handleChange(e, 7)}
                    columns={2}
                    deselect
                    style={{ width: "100px" }}
                />
            </div>
            <h2>Tooltip</h2>
            <p>
                You can add a tooltip to each radio button, it will display the
                value of the radio button when hovering it.
            </p>

            <div className="inner-component">
                <RadioGroup
                    name="radio-group-tooltip"
                    label="Choose an option"
                    elements={options5Images}
                    selectedValue={selectedValue[7]}
                    onChange={(e) => handleChange(e, 7)}
                    columns={2}
                    deselect
                    tooltip
                    style={{ width: "100px" }}
                />
            </div>
        </main>
    );
}
