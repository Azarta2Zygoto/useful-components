"use client";
import Link from "next/link";
import { useState } from "react";

import MultipleMenuSelect from "@/components/multipleMenuSelect/multipleMenuSelect";
import { InfoComponent } from "@/self/moreInfo";

const voidOptions = [[], [], [], [], [], [], [], []];

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
    "kiwi",
];

export default function MultipleMenuSelectPage() {
    const [chosenOptions, setChosenOptions] = useState<string[][]>(voidOptions);

    function handleSelect(index: number, values: string[]) {
        const newChosenOptions = [...chosenOptions];
        newChosenOptions[index] = values;
        setChosenOptions(newChosenOptions);
    }

    return (
        <main>
            <h1>Multiple Select Menu</h1>
            <p>
                A multiple select menu allows the user to select multiple
                choices between a set of possible options.
            </p>

            <h2>Basic multiple select menu</h2>
            <div className="inner-component">
                <MultipleMenuSelect
                    id="example-multiple-select"
                    label="Multiple select Menu"
                    options={selectOptions}
                    selectedOptions={chosenOptions[0]}
                    onSelect={(value) => handleSelect(0, value)}
                    style={{ width: "200px" }}
                />
                <MultipleMenuSelect
                    id="example-multiple-select-floating"
                    label="Floating label"
                    options={selectOptions}
                    floatingLabel
                    selectedOptions={chosenOptions[1]}
                    onSelect={(value) => handleSelect(1, value)}
                    style={{ width: "200px" }}
                />
            </div>
            <InfoComponent>
                The box used can be found to this&nbsp;
                <Link href="/components">link</Link>.
            </InfoComponent>
            <InfoComponent>
                The variant and the version without icon exist such as in the
                regular select menu.
            </InfoComponent>
            <h2>With checkbox</h2>
            <p>You can also add checkbox to each options easily.</p>
            <div className="inner-component">
                <MultipleMenuSelect
                    id="example-select"
                    label="Left checkbox"
                    options={selectOptions}
                    checkbox="left"
                    floatingLabel
                    selectedOptions={chosenOptions[2]}
                    onSelect={(value) => handleSelect(2, value)}
                    style={{ width: "200px" }}
                />
                <MultipleMenuSelect
                    id="example-select"
                    label="Right checkbox"
                    options={selectOptions}
                    checkbox="right"
                    floatingLabel
                    selectedOptions={chosenOptions[3]}
                    onSelect={(value) => handleSelect(3, value)}
                    style={{ width: "200px" }}
                />
            </div>

            <h2>Other features</h2>
            <p>
                The same props as select menu can be used : required, disabled
                and tooltip
            </p>
            <div className="inner-component">
                <MultipleMenuSelect
                    id="example-select-required"
                    label="Required"
                    options={selectOptions}
                    checkbox="left"
                    floatingLabel
                    required
                    selectedOptions={chosenOptions[4]}
                    onSelect={(value) => handleSelect(4, value)}
                    style={{ width: "200px" }}
                />
                <MultipleMenuSelect
                    id="example-select-disabled"
                    label="Disabled"
                    options={selectOptions}
                    checkbox="left"
                    floatingLabel
                    disabled
                    selectedOptions={chosenOptions[5]}
                    onSelect={(value) => handleSelect(5, value)}
                    style={{ width: "200px" }}
                />
                <MultipleMenuSelect
                    id="example-select-tooltip"
                    label="With a tooltip"
                    options={selectOptions}
                    checkbox="left"
                    floatingLabel
                    tooltip
                    selectedOptions={chosenOptions[6]}
                    onSelect={(value) => handleSelect(6, value)}
                    style={{ width: "200px" }}
                />
            </div>
        </main>
    );
}
