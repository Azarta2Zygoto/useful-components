"use client";

import { useState } from "react";
import Checkbox from "@/component/checkbox/checkbox";
import MenuSelect from "@/component/menuSelect/menuSelect";
import DateTooltip from "@/component/date/dateTooltip";
import Box from "@/component/box/box";
import Icon from "@/component/utils/icon";

export default function Home() {
    const [checked, setChecked] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleSelectChange = (value:string) => {
        console.log("Selected option:", value);
        setSelectedOption(value);
    };

    return (
        <main>
            <p>Welcome to the Component Library!</p>
            <Checkbox
                id="example-checkbox"
                label="Example Checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
                style={{ margin: "10px 0" }}
            />
            <Checkbox
                id="example-checkbox-disabled"
                label="Example Checkbox Disabled"
                checked={checked}
                disabled
                onChange={handleCheckboxChange}
                style={{ margin: "10px 0" }}
            />
            <MenuSelect
                id="example-select"
                label="Example Select"
                options={["Option 1", "Option 2", "chevalier", "grenouille"]}
                selectedOption={selectedOption}
                floatingLabel
                onSelect={handleSelectChange}
                style={{ width: "200px"}}
            />
            <button
                onClick={() => console.log("Button clicked!")}
                style={{ marginTop: "10px" }}
            >
                Toggle Checkbox
            </button>
            <DateTooltip
                date={new Date()}
            />
            <input
                type="text"
                placeholder="Type something..."
                />
            <Box>
                <span>This is a box component.</span>
            </Box>
            <Icon
                name="envelope-fill"
                title="Contact"
                desc="Contact us"
                color="blue"
                style={{marginRight: "0.5rem"}}
            />
            <Icon
                name="info-circle-fill"
                title="Information"
                desc="More information"
                color="green"
                style={{marginRight: "0.5rem"}}
            />
            <Icon
                name="x-circle-fill"
                title="Error"
                desc="An error has occurred"
                color="red"
                style={{marginRight: "0.5rem"}}
            />
        </main>
    );
}
