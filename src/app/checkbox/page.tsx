"use client";

import {useState} from "react";
import Checkbox from "@/component/checkbox/checkbox";

const defaultChecked= [
    false,
    false,
    false,
    true,
    true,
    false,
    false,
]
export default function CheckboxPage() {
    const [checked, setChecked] = useState<boolean[]>(defaultChecked);

    function handleCheckboxChange(index: number) {
        setChecked(prev => {
            const newChecked = [...prev];
            newChecked[index] = !newChecked[index];
            return newChecked;
        });
    }

    return (
        <main>
            <Checkbox
                id="checkbox-example"
                label="Normal Checkbox"
                checked={checked[0]}
                onChange={()=>handleCheckboxChange(0)}
            />
            <Checkbox
                id="checkbox-example-required"
                label="Required Checkbox"
                required
                checked={checked[1]}
                onChange={()=>handleCheckboxChange(1)}
            />
            <Checkbox
                id="checkbox-example-disabled"
                label="Disabled Checkbox"
                disabled
                checked={checked[2]}
                onChange={()=>handleCheckboxChange(2)}
            />
            <Checkbox
                id="checkbox-example-disabled-checked"
                label="Disabled Checked Checkbox"
                disabled
                checked={checked[3]}
                tooltip
                onChange={()=>handleCheckboxChange(3)}
            />
            <Checkbox
                id="checkbox-example-disabled-checked"
                label="Disabled Checked Checkbox"
                side="left"
                checked={checked[4]}
                onChange={()=>handleCheckboxChange(4)}
            />
            <p>Without label</p>
            <Checkbox
                id="checkbox-example-without-label"
                label="Without label Checkbox"
                checked={checked[5]}
                hideLabel
                onChange={()=>handleCheckboxChange(5)}
            />
            <p>Without label but tooltip</p>
            <Checkbox
                id="checkbox-example-without-label"
                label="Without label Checkbox"
                checked={checked[6]}
                hideLabel
                tooltip
                onChange={()=>handleCheckboxChange(6)}
            />
        </main>
    );
}