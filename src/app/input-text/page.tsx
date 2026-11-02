"use client";

import { useState } from "react";

import CaretDownIcon from "@ui/assets/icons/caret-down.svg";
import * as Input from "@ui/input";

import CodeView from "@/components/CodeView";
import Title from "@/components/Title";
import InfoFrame from "@/components/frames/InfoFrame";

export default function InputPage() {
    const [value, setValue] = useState("");
    return (
        <main>
            <Title level={1}>Text Input</Title>
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
            <InfoFrame>
                <p>
                    The element has no React internal state. You can use the{" "}
                    <code>onValue</code> API to directly get the string value.
                </p>
            </InfoFrame>
            <CodeView
                code={`<Input.Input
    type="text"
    placeholder="Basic input without label"
/>
<Input.TextField
    label="A complete text input"
    placeholder="You can write here"
/>`}
            >
                <Input.Input
                    type="text"
                    placeholder="Basic input without label"
                />
                <Input.TextField
                    label="A complete text input"
                    placeholder="You can write here"
                />
            </CodeView>
            <Title level={2}>Variant</Title>
            <p>
                There is two main variants: <code>outlined</code> (the default)
                and <code>underlined</code>.
            </p>
            <div className="code-view">
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
            <Title level={2}>Size</Title>
            <p>
                There are three sizes: <code>small (sm)</code>,{" "}
                <code>medium (md)</code> (the default) and{" "}
                <code>large (lg)</code>. The size can be set on the input itself
                or on the wrapper component. The wrapper component will override
                the size of the input.
            </p>
            <div className="code-view">
                <Input.TextField
                    label="Text input smalllkfjnearhfcnzer igaeniucfhaiufg eigf aiegrif"
                    placeholder="Enter small text"
                    size="sm"
                />
                <Input.TextField
                    label="Text input medium (default)"
                    placeholder="Enter text"
                    size="md"
                />
                <Input.TextField
                    label="Text input large"
                    placeholder="Enter big text"
                    size="lg"
                    variant="underlined"
                />
            </div>
            <Title level={2}>Floating label</Title>
            <p>
                For both variants, it is possible to have a floating label. The
                label will be displayed inside the input when it is empty and
                will move to the top when the input is focused or has a value.
            </p>
            <div className="code-view">
                <Input.TextField
                    label="Text input outlined (default)"
                    placeholder="Enter text"
                    variant="underlined"
                    floatingLabel
                />
                <Input.TextField
                    label="Text input outlined (default)"
                    placeholder="Enter text"
                    variant="underlined"
                    floatingLabel
                    size="sm"
                />
                <Input.TextField
                    label="Text input outlined (default)"
                    placeholder="Enter text"
                    variant="underlined"
                    floatingLabel
                    size="lg"
                />
                <Input.TextField
                    label="Text input underlined"
                    placeholder="Enter text"
                    variant="underlined"
                    floatingLabel
                />
            </div>
            <Title level={2}>Label position</Title>
            <p>
                The label can be positioned on the top (default) or left of the
                input. That is useless in floating label mode.
            </p>
            <div className="code-view">
                <Input.TextField
                    label="Text input left"
                    placeholder="Enter text"
                    labelPosition="left"
                />
            </div>
            <Title level={2}>Required</Title>
            <p>
                When the element is invalid (required, size or pattern not
                respected), a red mark is put. You can also put the element in
                invalid state with <code>aria-invalid=&quot;true&quot;</code> to
                force the red mark. A one line space is let freee to show an
                error message.
            </p>
            <div className="code-view">
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
            <Title level={2}>Disabled</Title>
            <div className="code-view">
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
            <Title level={2}>Read Only</Title>
            <div className="code-view">
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
            <Title level={2}>Adornment</Title>
            <p>
                You can put an icon on the left or right of the input. The icon
                can be a string (the name of the icon) or a React component.
            </p>
            <div className="code-view">
                <Input.TextField
                    label="Readonly textarea"
                    defaultValue="This is a readonly textarea"
                    iconLeft={CaretDownIcon}
                />
                <Input.TextField
                    label="Readonly textarea"
                    defaultValue="This is a readonly textarea"
                    iconLeft={CaretDownIcon}
                    readOnly
                />
                <Input.TextField
                    label="Readonly textarea"
                    defaultValue="This is a readonly textarea"
                    iconRight={CaretDownIcon}
                />
                <Input.TextField
                    label="Readonly textarea"
                    defaultValue="This is a readonly textarea"
                    iconRight={CaretDownIcon}
                    readOnly
                />
                <Input.TextField
                    label="Readonly textarea"
                    defaultValue="This is a readonly textarea"
                    floatingLabel
                    iconLeft={CaretDownIcon}
                />
                <Input.TextField
                    label="Readonly textarea that is very very long"
                    defaultValue="This is a readonly textarea that is very very long"
                    floatingLabel
                    iconLeft={CaretDownIcon}
                    iconRight={CaretDownIcon}
                />
                <Input.TextField
                    label="Readonly textarea"
                    defaultValue="This is a readonly textarea"
                    floatingLabel
                    readOnly
                    iconRight={CaretDownIcon}
                />
                <Input.TextField
                    label="Readonly textarea very loooooong"
                    defaultValue="This is a readonly textarea"
                    floatingLabel
                    variant="underlined"
                    iconLeft={CaretDownIcon}
                    iconRight={{
                        icon: CaretDownIcon,
                        size: 50,
                    }}
                />
                <Input.TextField
                    label="Readonly textarea"
                    defaultValue="This is a readonly textarea"
                    floatingLabel
                    variant="underlined"
                    iconRight={CaretDownIcon}
                    size="sm"
                />
                <Input.TextField
                    label="Readonly textarea"
                    defaultValue="This is a readonly textarea"
                    floatingLabel
                    variant="underlined"
                    readOnly
                    iconRight={CaretDownIcon}
                    size="lg"
                />
            </div>
            <Title level={1}>TextArea</Title>
            <p>
                Except the type, the API for textArea is the same than for the
                inputs.
            </p>
            <div className="code-view">
                <Input.TextAreaField
                    label="Textarea"
                    placeholder="Enter text"
                />
            </div>
            <Title level={2}>Read Only</Title>
            <p>
                As normal inputs, the readonly attribute is supported. It is not
                possible to edit the value of the input, but it is possible to
                select the text
            </p>
            <div className="code-view">
                <Input.TextAreaField
                    label="Readonly textarea"
                    defaultValue="This is a readonly textarea"
                    readOnly
                />
            </div>
        </main>
    );
}
