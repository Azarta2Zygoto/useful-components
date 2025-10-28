"use client";

import React, { useState } from "react";
import Combobox from "@/components/combobox/combobox";
import MultipleMenuSelect from "@/components/multipleMenuSelect/multipleMenuSelect";
import Table from "@/components/table/table";

export default function HomePage() {
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [selectedOPtions, setSelectedOptions] = useState<string[]>([]);

    function handleMultipleSelectChange(options: string[]) {
        setSelectedOptions(options);
    }

    return (
        <main>
            <h1>Welcome to the Component Library !</h1>
            <p>Explore a variety of reusable components designed to enhance your web applications.<br/>
            The library is made by an amateur to learn JS, CSS and HTML using the framework React.<br/>
            Feel free to browse through the components.<br/>
            However there is no plain to make them public as they are clearly not professionaly made.</p>
            <div className="component-box" style={{width: "300px"}}>
                <h2>Combobox</h2>
                <Combobox
                    id={"example-combobox"}
                    value={selectedOption}
                    options={['Banana', 'Apple', 'Orange', 'Mango', 'Pineapple', 'Grapes', 'Strawberry', 'Blueberry', 'Raspberry', 'Blackberry']}
                    placeholder="Select an option"
                    floatingLabel
                    onChange={(value) => setSelectedOption(value)}
                    style={{ maxWidth: '300px', width: '100%' }}
                />
            </div>
            <div className="component-box" style={{width: "300px"}}>
                <h2>Multiple Menu Select</h2>
                <MultipleMenuSelect
                    id={"example-multiple-menu-select"}
                    options={['Banana', 'Apple', 'Orange', 'Mango', 'Pineapple', 'Grapes', 'Strawberry', 'Blueberry', 'Raspberry', 'Blackberry']}
                    selectedOptions={selectedOPtions}
                    label="Select options"
                    floatingLabel
                    onSelect={handleMultipleSelectChange}
                    style={{ width: '250px' }}
                />
            </div>
            <div className="component-box" style={{width: "300px"}}>
                <h2>Table</h2>
                <Table
                    name="Example Table"
                    data={[
                        { Name: 'John Doe', Age: 28, City: 'New York' },
                        { Name: 'Jane Smith', Age: 34, City: 'Los Angeles' },
                        { Name: 'Sam Johnson', Age: 45, City: 'Chicago' },
                    ]}
                />
            </div>
        </main>
    );
}
