import { Fragment } from "react";

import Progress from "@/components/ui/progress/Progress";

export default function ProgressPage() {
    const dots = [
        {
            value: 10,
        },
        {
            value: 25,
            label: "Hello",
        },
        {
            value: 75,
            label: (
                <span>
                    <Fragment>
                        {/* eslint-disable-next-line @next/next/no-img-element*/}
                        <img
                            src={`/useful-components/icon/banana-icon.svg`}
                            alt="banana"
                            style={{
                                width: "20px",
                                height: "20px",
                                verticalAlign: "middle",
                            }}
                        />
                        &nbsp;
                        <span style={{ textTransform: "capitalize" }}>
                            banana
                        </span>
                    </Fragment>
                </span>
            ),
        },
    ];
    return (
        <main>
            <h1>Progress Page</h1>
            <p>
                This is a simple progress component. You can use it to show the
                progress of a task.
            </p>
            <h2>Basic Progress</h2>
            <div className="code-view">
                <Progress
                    label="Basic Progress"
                    max={100}
                    value={50}
                />
            </div>
            <h2>Progress with hidden label</h2>
            <div className="code-view">
                <Progress
                    label="Progress with hidden label"
                    value={50}
                    max={100}
                    hideLabel
                />
            </div>
            <h2>Progress with dots</h2>
            <p>You can add an event on the progress wherever you want</p>
            <div className="code-view">
                <Progress
                    label="Progress with dots"
                    value={75}
                    max={100}
                    width="100%"
                    dots={dots}
                />
            </div>
            <h2>Progress with key points</h2>
            <p>
                If you have N tasks for the progress, you can put N labels that
                will be display.
            </p>
            <div className="code-view">
                <Progress
                    label="Progress with dots"
                    value={1}
                    max={2}
                    width="100%"
                    labels={["apple", "tomato", "ketchup"]}
                />
            </div>
        </main>
    );
}
