"use client";

import {useState} from "react";
import Switch from "@/component/switch/switch";

const radioList = [
    true,
    false,
    true,
    false,
    true,
];

export default function SwitchPage() {
    const [selectedValue, setSelectedValue] = useState<boolean[]>(radioList);

    const handleChange = (value: boolean, index:number) => {
        console.log("Switch changed:", value, index);
        setSelectedValue(prev=> {
            const newValue = [...prev];
            newValue[index] = value;
            return newValue;
        });
    };

    return (
        <div>
            <h1>Switch Example</h1>
            <Switch
                id="example"
                label="Enable feature"
                checked={selectedValue[0]}
                onChange={(checked)=>handleChange(checked, 0)}
            />
            <br />
            <Switch
                id="example disabled"
                label="Disabled switch"
                checked={selectedValue[1]}
                onChange={(checked)=>handleChange(checked, 1)}
                disabled
            />
            <br />
            <Switch
                id="example required"
                label="Required switch"
                checked={selectedValue[2]}
                onChange={(checked)=>handleChange(checked, 2)}
                required
            />
            <br />
            <Switch
                id="example no label"
                checked={selectedValue[3]}
                tooltip
                onChange={(checked)=>handleChange(checked, 3)}
            />
            <br />
            <Switch
                id="no-label-required"
                checked={selectedValue[4]}
                tooltip={{
                    on: "This switch is required to be on",
                    off: "This switch is required to be off"
                }}
                onChange={(checked)=>handleChange(checked, 4)}
            />
        </div>
    );
}