"use client";

import { useState } from "react";

import * as Input from "@ui/input";

import { InfoComponent } from "@/components/WrapperComponent";

export default function InputPage() {
    const [value, setValue] = useState("");
    return (
        <main>
            <h1>Text Input</h1>
            <p>
                There are two important components for text input: the base one
                and the complete. The base one is the <code>Input.Input</code>{" "}
                and <code>Input.TextArea</code> components, which are the basic
                input and textarea components. The complete one is the{" "}
                <code>Input.TextField</code> and{" "}
                <code>Input.TextAreaField</code> component, which is a wrapper
                around the base components that adds a label, error message, and
                other features.
            </p>
            <InfoComponent>
                <p>
                    The element has no React internal state. You can use the{" "}
                    <code>onValue</code> API to directly get the string value.
                </p>
            </InfoComponent>
            <div className="inner-component">
                <Input.Input
                    type="text"
                    placeholder="Basic input without label"
                />
                <Input.TextField
                    label="A complete text input"
                    placeholder="You can write here"
                />
            </div>
            <h2>Variant</h2>
            <p>
                There is two main variants: <code>outlined</code> (the default)
                and <code>underlined</code>.
            </p>
            <div className="inner-component">
                <Input.TextField
                    label="Text input outlined (default)"
                    placeholder="Enter text"
                    variant="outlined"
                />
                <Input.TextField
                    label="Text input underlined"
                    placeholder="Enter text"
                    variant="underlined"
                />
            </div>
            <h2>Floating label</h2>
            <p>
                For both variants, it is possible to have a floating label. The
                label will be displayed inside the input when it is empty and
                will move to the top when the input is focused or has a value.
            </p>
            <div className="inner-component">
                <Input.TextField
                    label="Text input outlined (default)"
                    placeholder="Enter text"
                    variant="outlined"
                    floatingLabel
                />
                <Input.TextField
                    label="Text input underlined"
                    placeholder="Enter text"
                    variant="underlined"
                    floatingLabel
                />
            </div>
            <h2>Label position</h2>
            <p>
                The label can be positioned on the top (default) or left of the
                input. That is useless in floating label mode.
            </p>
            <div className="inner-component">
                <Input.TextField
                    label="Text input left"
                    placeholder="Enter text"
                    labelPosition="left"
                />
            </div>
            <h2>Required</h2>
            <p>
                When the element is invalid (required, size or pattern not
                respected), a red mark is put. You can also put the element in
                invalid state with <code>aria-invalid=&quot;true&quot;</code> to
                force the red mark. A one line space is let freee to show an
                error message.
            </p>
            <div className="inner-component">
                <Input.TextField
                    label="Text input required with error"
                    placeholder="Enter text"
                    required
                    value={value}
                    error={
                        value.length < 1 ? "This field is required" : undefined
                    }
                    onChange={(e) => setValue(e.target.value)}
                />
                <Input.TextField
                    label="Text input required"
                    placeholder="Enter text"
                    required
                    variant="underlined"
                />
                <Input.TextField
                    label="Text input required floating label with error"
                    placeholder="Enter text"
                    required
                    floatingLabel
                    value={value}
                    error={
                        value.length < 1
                            ? "This field is too long to be show in a unique line, help me to reduce it please, i need a lot of help cause it is hard"
                            : undefined
                    }
                    onChange={(e) => setValue(e.target.value)}
                />
                <Input.TextField
                    label="underlined required with floating label"
                    placeholder="Enter text"
                    required
                    floatingLabel
                    variant="underlined"
                />
            </div>
            <h2>Disabled</h2>
            <div className="inner-component">
                <Input.TextField
                    label="Text input disabled"
                    placeholder="Enter text"
                    disabled
                    value="Disabled"
                />
                <Input.TextField
                    label="Text input disabled underlined"
                    placeholder="Enter text"
                    disabled
                    variant="underlined"
                    value="Disabled"
                />
            </div>
            <h2>Read only</h2>
            <div className="inner-component">
                <Input.TextField
                    label="Text input readonly"
                    placeholder="Enter text"
                    readOnly
                    value="read"
                />
                <Input.TextField
                    label="Text input readOnly underlined"
                    placeholder="Enter text"
                    readOnly
                    variant="underlined"
                />
                <Input.TextField
                    label="Text input readonly with floating label"
                    placeholder="Enter text"
                    readOnly
                    floatingLabel
                    value="Floating label"
                />
                <Input.TextField
                    label="Underlined readonly with floating label"
                    placeholder="Enter text"
                    readOnly
                    floatingLabel
                    variant="underlined"
                    value="Floating label"
                />
                <Input.TextField
                    label="Text input readonly with floating label"
                    placeholder="Enter text"
                    readOnly
                    floatingLabel
                />
                <Input.TextField
                    label="Underlined readonly with floating label"
                    placeholder="Enter text"
                    readOnly
                    floatingLabel
                    variant="underlined"
                />
            </div>
            <h2>Textarea</h2>
            <p>
                Except the type, the API for textArea is the same than for the
                inputs.
            </p>
            <div className="inner-component">
                <Input.TextAreaField
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
                <Input.TextAreaField
                    label="Readonly textarea"
                    defaultValue="This is a readonly textarea"
                    readOnly
                />
            </div>
        </main>
    );
}
