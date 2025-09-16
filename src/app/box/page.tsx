"use client";

import { useState } from "react";
import Box from "@/component/box/box";

export default function BoxPage() {
    const [boxes, setBoxes] = useState<string[]>(["Box 1", "Box 2", "Box 3"]);
    const [counter, setCounter] = useState(4);
    const [disabled, setDisabled] = useState(false);

    function addBox() {
        setBoxes([...boxes, `Box ${counter}`]);
        setCounter(counter + 1);
    }
    function removeBox() {
        setBoxes(boxes.slice(0, -1));
    }
    return (
        <div>
            <h1>Box Component Example</h1>
            <button onClick={addBox}>Add Box</button>
            <button onClick={removeBox} disabled={boxes.length === 0}>
                Remove Box
            </button>
            <button onClick={() => setDisabled(!disabled)}>
                {disabled ? "Enable Click" : "Disable Click"}
            </button>
            <div style={{ marginTop: "20px" }}>
                {boxes.map((box, index) => (
                    <Box
                        key={index}
                        onClick={() => alert(`${box} clicked!`)}
                        disabled={disabled}
                        style={{ marginBottom: "10px" }}
                        className="custom-box"
                    >
                        {box}
                    </Box>
                ))}
            </div>
        </div>
    );
}