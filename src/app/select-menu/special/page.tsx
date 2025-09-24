"use client";

import { useState } from "react";
import FlagSelect from "@/component/menuSelect/flagSelect";
import { InfoComponent } from "@/self/moreInfo";

const selectOptions = [
    {name: "United States", code: "US"},
    {name: "Canada", code: "CA"},
    {name: "United Kingdom", code: "GB"},
    {name: "France", code: "FR"},
    {name: "Germany", code: "DE"},
    {name: "Italy", code: "IT"},
    {name: "Spain", code: "ES"},
    {name: "Japan", code: "JP"},
    {name: "China", code: "CN"},
]

export default function FlagSelectPage(){
    const [selectedOption, setSelectedOption] = useState<string>("");

    const handleInputChange = (newValue:string) => {
        setSelectedOption(newValue);
    }
    return (
        <main>
            <h1>Flag Select Menu</h1>
            <p>A flag select menu allows the user to select a country between a set of possible options.</p>
            <h2>Basic flag select menu</h2>
            <div className="inner-component">
                <FlagSelect
                    id="example-flag-select"
                    label="Flag Select Menu"
                    countries={selectOptions}
                    selectCountry={selectedOption}
                    onSelect={(value) => handleInputChange(value)}
                    style={{ width: "200px" }}
                />
            </div>
            <InfoComponent>
                You then can add all of the properties of a regular select menu such as the variant, the floating label, the disabled state, the required state, the tooltip on hover, and so on.
            </InfoComponent>
        </main>
    )
}
