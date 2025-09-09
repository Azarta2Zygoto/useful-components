"use client";

import { useState } from "react";
import FormInfo from "@/component/formInfo/formInfo";
import InputInfo from "@/component/formInfo/inputInfo";

export default function FormPage() {
    const [infoVisible, setInfoVisible] = useState(false);
    return (
        <main>
            <h1>Form Info Component</h1>
            <FormInfo
                isInfo={infoVisible}
                text={{see: "Show Info"}}
                getInfo={() => setInfoVisible(prev=>!prev)}
                tooltip
            >
                <h2>Form Title</h2>
                <p>This is a sample form content.</p>
            </FormInfo>
        </main>
    );
}