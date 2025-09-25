"use client";

import Box from "@/component/box/box";
import Tooltip from "@/component/tooltip/tooltip";

const selectOptions = [
    "banana",
    "apple",
    "orange",
    "grape",
    "mango",
    "pineapple",
    "strawberry",
    "blueberry",
    "watermelon",
    "kiwi"
]

export default function BoxPage() {
    return (
        <main>
            <h1>Little components</h1>
            <p>Here are a list of little components man made</p>

            <h2>Box</h2>
            <p>They are little boxes that can contain any content. You can click on them to trigger an action.</p>
            <div className="inner-component">
                {selectOptions.map((box, index) => (
                    <Box
                        key={index}
                        onClick={() => alert(`${box} clicked!`)}
                        style={{ marginBottom: "10px" }}
                        className="custom-box"
                    >
                        {box}
                    </Box>
                ))}
            </div>
            <h2>Disabled box</h2>
            <p>You can also disable them. They will be as if they where not clickable</p>
            <div className="inner-component">
                {selectOptions.filter((_, index)=>index<4).map((box, index) => (
                    <Box
                        key={index}
                        onClick={() => alert(`${box} clicked!`)}
                        style={{ marginBottom: "10px" }}
                        disabled
                        className="custom-box"
                    >
                        {box}
                    </Box>
                ))}
            </div>
            <h2>Tooltip</h2>
            <p>Across the website, a lot of the component allows tooltip. You can put a tooltip on any element you want !</p>

            <div className="inner-component">
                <Tooltip title="I am a tooltip!">
                    <Box
                        style={{ marginBottom: "10px" }}
                        className="custom-box"
                    >
                        Hover me !
                    </Box>
                </Tooltip>
            </div>
            <h2>Tooltip placement or offset</h2>
            <p>You can also change the placement of the tooltip or the offset from the element</p>
            <div className="inner-component">
                <Tooltip
                    title="I am a right!"
                    placement="right"
                >
                    <Box
                        style={{ marginBottom: "10px" }}
                        className="custom-box"
                    >
                        Hover me !
                    </Box>
                </Tooltip>
                <Tooltip
                    title="I am a left!"
                    placement="left"
                >
                    <Box
                        style={{ marginBottom: "10px" }}
                        className="custom-box"
                    >
                        Hover me !
                    </Box>
                </Tooltip>
                <Tooltip
                    title="I am a so low!"
                    offset={20}
                >
                    <Box
                        style={{ marginBottom: "10px" }}
                        className="custom-box"
                    >
                        Hover me !
                    </Box>
                </Tooltip>
                <Tooltip
                    title="I am a hiding you!"
                    offset={-35}
                >
                    <Box
                        style={{ marginBottom: "10px" }}
                        className="custom-box"
                    >
                        Hover me !
                    </Box>
                </Tooltip>
            </div>
        </main>
    );
}