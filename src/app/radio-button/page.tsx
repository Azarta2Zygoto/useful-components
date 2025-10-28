"use client";

import React, { useState, Fragment} from "react";
import RadioGroup from "@/components/radioButton/radioGroup";
import { WarningComponent } from "@/self/moreInfo";

const radioList = [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
]

const options3 = [
    "banana",
    "apple",
    "orange"
]

const options5 = [
    "banana",
    "apple",
    "orange",
    "grape",
    "mango"
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
        <main>
            <h1>Radio button</h1>
            <p>A radio group of a radio button allow you to select one choice over multiple options. You can&apos;t select multiple choices</p>

            <h2>Basic radio button</h2>
            <div className="inner-component">
                <RadioGroup
                    name="radio-group-3"
                    title="Choose an option"
                    values={options3}
                    selectedValue={selectedValue[0]}
                    onChange={(e)=>handleChange(e, 0)}
                    size={2}
                    individualStyle={{width:"100px"}}
                />
            </div>
            <h2>Line control</h2>
            <p>You can control the number of item per line with the size property</p>
            <div className="inner-component">
                <RadioGroup
                    name="radio-group-5-1"
                    title="One per lines"
                    values={options5}
                    selectedValue={selectedValue[1]}
                    onChange={(e)=>handleChange(e, 1)}
                    size={1}
                    individualStyle={{width:"100px"}}
                />
                <RadioGroup
                    name="radio-group-5-2"
                    title="Two per lines"
                    values={options5}
                    selectedValue={selectedValue[2]}
                    onChange={(e)=>handleChange(e, 2)}
                    size={2}
                    individualStyle={{width:"100px"}}
                />
                <RadioGroup
                    name="radio-group-5-3"
                    title="Three per lines"
                    values={options5}
                    selectedValue={selectedValue[3]}
                    onChange={(e)=>handleChange(e, 3)}
                    size={3}
                    individualStyle={{width:"100px"}}
                />
            </div>
            <WarningComponent>
                <p>If the width of the screen is too low, there isn&apos;t any automatic change to not overflow from the screen.</p>
            </WarningComponent>
            <h2>Disabled</h2>
            <p>You can disable the entire radio group or specific values.</p>
            <div className="inner-component">
                <RadioGroup
                    name="radio-group-disabled"
                    title="Disabled options"
                    values={options3}
                    selectedValue={"banane"}
                    onChange={()=>{}}
                    disabled
                    size={2}
                    individualStyle={{width:"100px"}}
                />
                <RadioGroup
                    name="radio-group-disabled-values"
                    title="Disabled values"
                    values={options5}
                    selectedValue={selectedValue[4]}
                    onChange={(e)=>handleChange(e, 4)}
                    disabledValues={["apple", "grape"]}
                    size={2}
                    individualStyle={{width:"100px"}}
                />
            </div>
            <h2>Required</h2>
            <p>You can ask the user to select one option.</p>
            <div className="inner-component">
                <RadioGroup
                    name="radio-group-required"
                    title="You must choose an option"
                    values={options3}
                    selectedValue={selectedValue[5]}
                    onChange={(e)=>handleChange(e, 5)}
                    required
                    size={2}
                    individualStyle={{width:"100px"}}
                />
            </div>
            <h2>Deselect</h2>
            <p>You can allow the user to deselect an option by clicking on it again.</p>
            <div className="inner-component">
                <RadioGroup
                    name="radio-group-deselect"
                    title="Choose an option and deselect if needed"
                    values={options3}
                    selectedValue={selectedValue[6]}
                    onChange={(e)=>handleChange(e, 6)}
                    required
                    size={2}
                    deselect
                    individualStyle={{width:"100px"}}
                />
            </div>
            <h2>Labeling</h2>
            <p>You can put label that will be display instead of the value of the radio button<br/>
            That is not regular label but can be React node !</p>

            <div className="inner-component">
                <RadioGroup
                    name="radio-group-tooltip"
                    title="Choose an option"
                    values={options5}
                    selectedValue={selectedValue[7]}
                    label={options5.map((value)=>
                        <Fragment key={value}>
                            {/* eslint-disable-next-line @next/next/no-img-element*/}
                            <img src={`/useful-components/${value}-icon.svg`} alt={value} style={{width:"20px", height:"20px", verticalAlign:"middle"}}/>
                            &nbsp;<span style={{textTransform:"capitalize"}}>{value}</span>
                        </Fragment>
                    )}
                    onChange={(e)=>handleChange(e, 7)}
                    size={2}
                    deselect
                    individualStyle={{width:"100px"}}
                />
            </div>
            <h2>Tooltip</h2>
            <p>You can add a tooltip to each radio button, it will display the value of the radio button when hovering it.</p>

            <div className="inner-component">
                <RadioGroup
                    name="radio-group-tooltip"
                    title="Choose an option"
                    values={options5}
                    selectedValue={selectedValue[7]}
                    label={options5.map((value)=>
                        <Fragment key={value}>
                            {/* eslint-disable-next-line @next/next/no-img-element*/}
                            <img src={`/useful-components/${value}-icon.svg`} alt={value} style={{width:"20px", height:"20px", verticalAlign:"middle"}}/>
                        </Fragment>
                    )}
                    onChange={(e)=>handleChange(e, 7)}
                    size={2}
                    deselect
                    tooltip
                    individualStyle={{width:"100px"}}
                />
            </div>
        </main>
    );
}