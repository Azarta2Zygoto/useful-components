"use client";

import { useState } from "react";

import * as Input from "@ui/input";

export default function InputPage() {
    const [value, setValue] = useState("");
    return (
        <main>
            <h1>Input</h1>
            <p>
                The input component is a wrapper around the native input
                element. It allows you to add a label, a tooltip, and a side
                element. It also allows you to hide the label and add a required
                indicator.
            </p>
            <div className="inner-component">
                <Input.Text
                    label="Text input"
                    placeholder="Enter text"
                />
            </div>
            <h2>Variant</h2>
            <div className="inner-component">
                <Input.Text
                    label="Text input standard"
                    placeholder="Enter text"
                    variant="standard"
                />
            </div>
            <h2>Label position</h2>
            <div className="inner-component">
                <Input.Text
                    label="Text input left"
                    placeholder="Enter text"
                    side="left"
                />
            </div>
            <h2>Required</h2>
            <p>
                When the element is invalid (required, size or pattern not
                respected), a red mark is put. You can put the element in
                default state not to use this feature. You can also put the
                element in invalid state to force the red mark.
            </p>
            <div className="inner-component">
                <Input.Text
                    label="Text input required in default state"
                    placeholder="Enter text"
                    required
                    state="default"
                />
                <Input.Text
                    label="Text input required error"
                    placeholder="Enter text"
                    required
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Input.Text
                    label="Text input required"
                    placeholder="Enter text"
                    required
                    variant="standard"
                    state="invalid"
                />
            </div>
            <h2>Disabled</h2>
            <div className="inner-component">
                <Input.Text
                    label="Text input disabled"
                    placeholder="Enter text"
                    disabled
                    value="Disabled"
                />
                <Input.Text
                    label="Text input disabled standard"
                    placeholder="Enter text"
                    disabled
                    variant="standard"
                    value="Disabled"
                />
            </div>
            <h2>Floating Label</h2>
            <div className="inner-component">
                <Input.Floating
                    label="Floating label"
                    placeholder="Enter text"
                />
                <Input.Floating
                    label="Floating label input"
                    placeholder="Enter text"
                    variant="standard"
                />
            </div>
            <h2>Textarea</h2>
            <p>
                Except the type, the API for textArea is the same than for the
                inputs.
            </p>
            <div className="inner-component">
                <Input.TextArea
                    label="Textarea"
                    placeholder="Enter text"
                />
            </div>
            <h2>Readonly</h2>
            <p>
                As normal inputs, the readonly attribute is supported. It is not
                possible to edit the value of the input, but it is possible to
                select the text
            </p>
            <div className="inner-component">
                <Input.TextArea
                    label="Readonly textarea"
                    defaultValue="This is a readonly textarea"
                    readOnly
                />
                <Input.Floating
                    label="Readonly input"
                    defaultValue="This is a readonly input"
                    readOnly
                    variant="standard"
                />
            </div>
        </main>
    );
}
