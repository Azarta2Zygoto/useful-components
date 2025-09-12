"use client";

import { useState, useEffect } from "react";
import AlertBox from "@/component/alertBox/alertBox";
import MenuSelect from "@/component/menuSelect/menuSelect";

const positionsList = [
    "top",
    "bottom",
    "left",
    "right",
    "center",
    "top left",
    "top right",
    "bottom left",
    "bottom right"
] as const;


export default function AlertBoxPage() {
    const [visible, setVisible] = useState(true);
    const [error, setError] = useState<-1|0|1|2>(1);
    const [message, setMessage] = useState("This is an alert box message.");
    const [position, setPosition] = useState<typeof positionsList[number]>("bottom left");
    const [alertType, setAlertType] = useState<"default"|"compact">("default");

    useEffect(() => {
        // Simulate an error after 2 seconds
        const timer = setTimeout(() => {
            setError(0); // Set to error state
            setMessage("An error has occurred.");
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <h1>Alert Box Example</h1>
            <button onClick={() => setVisible(!visible)}>
                {visible ? "Hide Alert Box" : "Show Alert Box"}
            </button>
            <MenuSelect
                id={"error-select"}
                label="Select Position"
                selectedOption={position}
                onSelect={(value) => setPosition(value as unknown as typeof positionsList[number])}
                options={positionsList as unknown as string[]}
            />
            <MenuSelect
                id={"alert-type-select"}
                label="Select Alert Type"
                selectedOption={alertType}
                onSelect={(value) => setAlertType(value as "default"|"compact")}
                options={["default", "compact"]}
            />
            <AlertBox
                error={error}
                position={position}
                message={message}
                visible={visible}
                view={alertType}
                onClose={() => setVisible(false)}
            />
        </div>
    );
}