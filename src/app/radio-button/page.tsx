"use client";

import {useState} from "react";
import RadioGroup from "@/component/radioButton/radioGroup";

const radioList = [
    "option1",
    "option1",
    "",
    "option1",
    "option1"
]

export default function RadioButtonPage() {
    const [selectedValue, setSelectedValue] = useState<string[]>(radioList);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index:number) => {
        setSelectedValue(prev=> {
            const newValue = [...prev];
            newValue[index] = event.target.value;
            return newValue;
        });
    };

    return (
        <div>
            <h1>Radio Button Example</h1>
            <RadioGroup
                name="example"
                title="Choose an option"
                values={["option1", "option2", "option3"]}
                selectedValue={selectedValue[0]}
                label={["Option 1", "Option 2", "Option 3"]}
                onChange={(e)=>handleChange(e, 0)}
                size={2}
                style={{ margin: "20px 0" }}
            />
            <RadioGroup
                name="example disabled"
                title="Choose an option"
                values={["option1", "option2", "option3"]}
                selectedValue={"option2"}
                label={["Option 1", "Option 2", "Option 3"]}
                onChange={(e)=>handleChange(e, 1)}
                disabled
                deselect
                size={2}
                style={{ margin: "20px 0" }}
            />
            <RadioGroup
                name="example required"
                title="Choose an option"
                values={["option1", "option2", "option3"]}
                selectedValue={selectedValue[2]}
                label={["Option 1", "Option 2", "Option 3"]}
                onChange={(e)=>handleChange(e, 2)}
                required
                size={2}
                style={{ margin: "20px 0" }}
            />
            <RadioGroup
                name="example deselect"
                title="Choose an option"
                values={["option1", "option2", "option3"]}
                selectedValue={selectedValue[3]}
                label={["Option 1", "Option 2", "Option 3"]}
                onChange={(e)=>handleChange(e, 3)}
                required
                size={2}
                deselect
                style={{ margin: "20px 0" }}
            />
            <RadioGroup
                name="example disabled doble"
                title="Choose an option"
                values={["option1", "option2", "option3"]}
                selectedValue={selectedValue[4]}
                label={["Option 1", "Option 2", "Option 3"]}
                onChange={(e)=>handleChange(e, 4)}
                size={2}
                deselect
                disabledValues={["option2"]}
                style={{ margin: "20px 0" }}
            />
            <RadioGroup
                name="example disabled tooltip"
                title="Choose an option"
                values={["option1", "option2", "option3"]}
                selectedValue={selectedValue[5]}
                label={["Option 1", "Option 2", "Option 3"]}
                onChange={(e)=>handleChange(e, 5)}
                size={2}
                deselect
                tooltip
                disabledValues={["option2"]}
            />
        </div>
    );
}