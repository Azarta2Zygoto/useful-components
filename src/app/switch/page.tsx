"use client";

import {useState} from "react";
import Switch from "@/components/switch/switch";
import { InfoComponent } from "@/self/moreInfo";

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
        <main>
            <h1>Switch</h1>
            <p>A switch allows the user to select an option between two choice, this is an alternative way to do a checkbox.</p>


            <h2>Basic switch</h2>
            <div className="inner-component">
                <Switch
                    id="switch"
                    label="Enable feature"
                    checked={selectedValue[0]}
                    onChange={(checked)=>handleChange(checked, 0)}
                />
                <span>&nbsp;{selectedValue[0] ? "On" : "Off"}</span>
            </div>
            
            <h2>Disabled option</h2>
            <p>As input or checkbox, a switch can be disabled.</p>
            <div className="inner-component">
                <Switch
                    id="switch-disabled-on"
                    label="Disabled switch on"
                    checked={true}
                    onChange={()=>{}}
                    disabled
                />
                <Switch
                    id="switch-disabled-off"
                    label="Disabled switch off"
                    checked={false}
                    onChange={()=>{}}
                    disabled
                />
            </div>

            <h2>Required</h2>
            <p>The require allows the user to know when he needs to accept. This is mainly usefull to indicate that the user need to accept terms and conditions of use of your website.</p>
            
            <div className="inner-component">
                <Switch
                    id="switch-required"
                    label="Required switch"
                    checked={selectedValue[1]}
                    onChange={(checked)=>handleChange(checked, 1)}
                    required
                />
            </div>
            <InfoComponent>
                <p>The main difference with just a red/green switch is the label width the red &nbsp;<b style={{color:"red"}}>*</b></p>
            </InfoComponent>
            <h2>Colors</h2>
            <p>You can change the color of the switch when it is on or off. You can also use the &quot;opposite&quot; color to have a green/red switch depending on the state.</p>
            
            <div className="inner-component">
                <Switch
                    id="switch-colors"
                    checked={selectedValue[2]}
                    label="Custom colors"
                    colors={["#4caf50", "#f44336"]}
                    onChange={(checked)=>handleChange(checked, 2)}
                />
            </div>
            <h2>Tooltip</h2>
            <p>You can add a tooltip to the switch, it will display the state of the switch or a custom text when hovering the switch.</p>
            <div className="inner-component">
                <Switch
                    id="example no label"
                    checked={selectedValue[3]}
                    tooltip
                    onChange={(checked)=>handleChange(checked, 3)}
                />
                <Switch
                    id="no-label-required"
                    checked={selectedValue[4]}
                    tooltip={{
                        on: "This switch is on",
                        off: "This switch is off"
                    }}
                    onChange={(checked)=>handleChange(checked, 4)}
                />
            </div>
        </main>
    );
}