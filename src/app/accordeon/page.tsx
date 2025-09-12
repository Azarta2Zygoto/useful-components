"use client";

import { useState } from "react";
import Accordeon from "@/component/accordeon/accordeon";


export default function AccordeonPage() {
    const [open, setOpen] = useState(false);
    const [openCard, setOpenCard] = useState(false);
    const [openSimple, setOpenSimple] = useState(false);

    return (
        <div>
            <h1>Accordeon Example</h1>
            <button onClick={() => setOpen(!open)}>
                {open ? "Close Accordeon" : "Open Accordeon"}
            </button>
            <button onClick={() => setOpenCard(!openCard)}>
                {open ? "Close Accordeon" : "Open Accordeon"}
            </button>
            <button onClick={() => setOpenSimple(!openSimple)}>
                {open ? "Close Accordeon" : "Open Accordeon"}
            </button>
            <Accordeon
                title="Sample Accordeon"
                open={openSimple}
                onToggle={() => setOpenSimple(!open)}
                height={110}
                view="simple">
                <div style={{padding: "1rem"}}>
                    <p>This is the content of the accordeon.</p>
                    <p>You can put any JSX element here.</p>
                </div>
            </Accordeon>
            <Accordeon
                title="Card View Accordeon"
                open={openCard}
                view="card">
                <div>
                    <p>This is another accordeon with card view.</p>
                    <p>It has a different style.</p>
                </div>
            </Accordeon>
            <Accordeon
                title={<span style={{fontWeight: "bold"}}>Icon View Accordeon</span>}
                view="icon">
                <div style={{padding: "1rem"}}>
                    <p>This is an accordeon with icon view.</p>
                    <p>Click the header to toggle.</p>
                </div>
            </Accordeon>
            <Accordeon
                title="Component Type Accordeon"
                type="inner"
                view="icon">
                <div>
                    <p>This accordeon is of type &quot;component&quot;.</p>
                    <p>It has a border and padding.</p>
                </div>
            </Accordeon>
        </div>
    );
}
