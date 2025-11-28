"use client";

import { useState } from "react";

import FormInfo from "@/components/formInfo/formInfo";
import InputInfo from "@/components/formInfo/inputInfo";

export default function FormPage() {
    const [infoVisible, setInfoVisible] = useState(false);
    return (
        <main>
            <h1>Form Info Component</h1>
            <FormInfo
                isInfo={infoVisible}
                text={{ see: "Show Info" }}
                getInfo={() => setInfoVisible((prev) => !prev)}
                tooltip
            >
                <h2>Form Title</h2>
                <p>This is a sample form content.</p>
                <InputInfo
                    label="Input with Info"
                    type="password"
                    tooltip
                    id="input-with-info"
                    value="password"
                    placeholder="Type something as password..."
                    maxLength={20}
                    show={infoVisible}
                    getChange={(val) => console.log(val)}
                />
                <InputInfo
                    label="Input with Info"
                    type="email"
                    id="input-with-info-email"
                    value="email"
                    placeholder="Type something as email..."
                    show={infoVisible}
                    getChange={(val) => console.log(val)}
                />
                <InputInfo
                    label="Input with Info"
                    type="email"
                    id="input-with-info-email-2"
                    value="email"
                    floatingLabel
                    placeholder="Type something as email..."
                    show={infoVisible}
                    getChange={(val) => console.log(val)}
                />
            </FormInfo>
        </main>
    );
}
