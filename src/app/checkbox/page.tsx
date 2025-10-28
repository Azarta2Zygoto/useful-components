"use client";

import {useState} from "react";
import Checkbox from "@/components/checkbox/checkbox";
import { WarningComponent } from "@/self/moreInfo";

const defaultChecked= [
    false,
    false,
    false,
    false,
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>
            )
        }
        else {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg>
            )
        }
    }

    return (
        <main>
            <h1>Checkbox</h1>
            <p>A checkbox allows the user to agree or disagree/allow or disallow some information.</p>

            <h2>Basic checkbox</h2>
            <div className="inner-component">
                <Checkbox
                    id="checkbox-example"
                    label="Right Checkbox"
                    checked={checked[0]}
                    onChange={()=>handleCheckboxChange(0)}
                />
                <Checkbox
                    id="checkbox-example-left"
                    label="Left Checkbox"
                    checked={checked[1]}
                    side="left"
                    onChange={()=>handleCheckboxChange(1)}
                />
            </div>
            <h2>Required</h2>
            <p>You can set a checkbox as required with the required property.</p>
            <div className="inner-component">
                <Checkbox
                    id="checkbox-example-required"
                    label="Required Checkbox"
                    required
                    checked={checked[2]}
                    onChange={()=>handleCheckboxChange(2)}
                />
            </div>
            <h2>Disabled</h2>
            <p>You can disable a checkbox with the disabled property.</p>
            <div className="inner-component">
                <Checkbox
                    id="checkbox-example-disabled"
                    label="Disabled Checkbox"
                    disabled
                    checked={checked[3]}
                    onChange={()=>handleCheckboxChange(3)}
                />
                <Checkbox
                    id="checkbox-example-disabled-checked"
                    label="Disabled Checked Checkbox"
                    disabled
                    checked={checked[4]}
                    tooltip
                    onChange={()=>handleCheckboxChange(4)}
                />
            </div>
            <h2>Without label</h2>
            <p>You can hide the label of the checkbox with the hideLabel property. It is recommended to use the tooltip property to help the user understand what the checkbox is for.</p>

            <div className="inner-component">
                <Checkbox
                    id="checkbox-example-without-label"
                    label="Without label Checkbox"
                    checked={checked[5]}
                    hideLabel
                    onChange={()=>handleCheckboxChange(5)}
                />
                <Checkbox
                    id="checkbox-example-without-label-tooltip"
                    label="Without label Checkbox"
                    checked={checked[6]}
                    hideLabel
                    tooltip
                    onChange={()=>handleCheckboxChange(6)}
                />
            </div>
            <WarningComponent>
                <p>When using a checkbox without label, it is important for accessibility to use the tooltip or put our own label outside of the component.</p>
            </WarningComponent>
            <h2>Different shape</h2>
            <p>You can use your own checkmark with the checkmark property. It can be a React node or a function that takes the checked state as a parameter and returns a React node.</p>
            
            <div className="inner-component">
                <Checkbox
                    id="checkbox-example-heart"
                    label="Heart Checkbox"
                    checked={checked[7]}
                    checkmark={handleHeart(checked[7])}
                    onChange={()=>handleCheckboxChange(7)}
                />
            </div>
        </main>
    );
}