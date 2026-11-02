"use client";

import { useState } from "react";

import Switch from "@ui/switch/switch";

import InfoFrame from "@/components/frames/InfoFrame";

const radioList = [
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
];

export default function SwitchPage() {
    const [selectedValue, setSelectedValue] = useState<boolean[]>(radioList);

    const handleChange = (value: boolean, index: number) => {
        console.log("Switch changed:", value, index);
        setSelectedValue((prev) => {
            const newValue = [...prev];
            newValue[index] = value;
            return newValue;
        });
    };

    return (
        <main>
            <h1>Switch</h1>
            <p>
                A switch allows the user to select an option between two choice,
                this is an alternative way to do a checkbox.
            </p>

            <h2>Basic switch</h2>
            <div
                className="code-view"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                <Switch
                    label="Enable feature left"
                    checked={selectedValue[0]}
                    onChange={(e) => handleChange(e.currentTarget.checked, 0)}
                />
                <Switch
                    label="Enable feature right"
                    side="right"
                    checked={selectedValue[1]}
                    onChange={(e) => handleChange(e.currentTarget.checked, 1)}
                />
                <Switch
                    label="Enable feature top"
                    side="top"
                    checked={selectedValue[2]}
                    onChange={(e) => handleChange(e.currentTarget.checked, 2)}
                />
                <Switch
                    label="Enable feature bottom"
                    side="bottom"
                    checked={selectedValue[3]}
                    onChange={(e) => handleChange(e.currentTarget.checked, 3)}
                />
            </div>

            <h2>Switch with labels</h2>
            <p>This type of switch informs which value is currently put.</p>
            <div className="code-view">
                <Switch
                    label="Enable feature left"
                    checked={selectedValue[4]}
                    values={{ on: "On", off: "Off" }}
                    onChange={(e) => handleChange(e.currentTarget.checked, 4)}
                />
            </div>

            <h2>Disabled option</h2>
            <p>As input or checkbox, a switch can be disabled.</p>
            <div className="code-view">
                <Switch
                    label="Disabled switch on"
                    checked
                    disabled
                />
                <Switch
                    label="Disabled switch off"
                    checked={false}
                    disabled
                />
            </div>

            <h2>Required</h2>
            <p>
                The require allows the user to know when he needs to accept.
                This is mainly usefull to indicate that the user need to accept
                terms and conditions of use of your website.
            </p>

            <div className="code-view">
                <Switch
                    id="switch-required"
                    label="Required switch"
                    checked={selectedValue[5]}
                    onChange={(e) => handleChange(e.currentTarget.checked, 5)}
                    required
                />
            </div>
            <InfoFrame>
                <p>
                    The main difference with just a red/green switch is the
                    label width the red &nbsp;<b style={{ color: "red" }}>*</b>
                </p>
            </InfoFrame>
            <h2>Colors</h2>
            <p>
                You can change the color of the switch when it is on or off. You
                can also use the &quot;opposite&quot; color to have a green/red
                switch depending on the state.
            </p>

            <div className="code-view">
                <Switch
                    id="switch-colors"
                    checked={selectedValue[6]}
                    label="Custom colors"
                    colors={["#4caf50", "#f44336"]}
                    onChange={(e) => handleChange(e.currentTarget.checked, 6)}
                />
            </div>
            <h2>Tooltip</h2>
            <p>
                You can add a tooltip to the switch, it will display the state
                of the switch or a custom text when hovering the switch.
            </p>
            <div className="code-view">
                <Switch
                    label="Switch with tooltip"
                    checked={selectedValue[7]}
                    tooltip="informations about the switch"
                    onChange={(e) => handleChange(e.currentTarget.checked, 7)}
                />
                <Switch
                    label="Switch with tooltip"
                    required
                    checked={selectedValue[8]}
                    tooltip={{
                        on: "This switch is on",
                        off: "This switch is off",
                    }}
                    onChange={(e) => handleChange(e.currentTarget.checked, 8)}
                />
            </div>
            <h2>Without label</h2>
            <p>
                You can hide the label of the switch with the hideLabel
                property. An aria-label is automatically added to the switch for
                accessibility. It is recommended to use the tooltip property to
                help the user understand what the switch is for.
            </p>
            <div className="code-view">
                <Switch
                    label="Switch without label"
                    hideLabel
                    checked={selectedValue[9]}
                    tooltip="Switch without label"
                    onChange={(e) => handleChange(e.currentTarget.checked, 9)}
                />
            </div>
        </main>
    );
}
