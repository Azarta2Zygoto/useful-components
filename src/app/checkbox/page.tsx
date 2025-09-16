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
    false
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

    function handleHeart(checked: boolean) {
        if (!checked) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>
            )
        }
        else {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg>
            )
        }
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
            <Checkbox
                id="checkbox-example-heart"
                label="Heart Checkbox"
                checked={checked[7]}
                checkmark={handleHeart(checked[7])}
                onChange={()=>handleCheckboxChange(7)}
            />
        </main>
    );
}