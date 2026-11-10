"use client";

import CodeView from "@/components/CodeView";
import ComponentAccessibility from "@/components/ComponentAccessibility";
import ComponentApi from "@/components/ComponentApi";
import PageScroll from "@/components/PageScroll";
import Title from "@/components/Title";
import Progress from "@/components/ui/progress/Progress";
import progressApi from "@/data/progress.json";

export default function ProgressPage() {
    return (
        <PageScroll>
            <Title level={1}>Progress</Title>
            <p>
                <code>Progress</code> shows the completion state of a task using
                the native <code>progress</code> element. It can also display
                labels or marked points along the progress bar.
            </p>

            <Title level={2}>Basic progress</Title>
            <p>
                Provide a required <code>label</code>, the current{" "}
                <code>value</code>, and optionally a <code>max</code> value. The
                default maximum is <code>100</code>.
            </p>
            <CodeView
                code={`<Progress
    label="Uploading files"
    value={65}
    max={100}
/>`}
            >
                <Progress
                    label="Uploading files"
                    value={65}
                    max={100}
                />
            </CodeView>

            <Title level={2}>Hidden label</Title>
            <p>
                Set <code>hideLabel</code> when the visible label is not needed.
                The label remains available to assistive technologies through{" "}
                <code>aria-label</code>.
            </p>
            <CodeView
                code={`<Progress
    label="Installing updates"
    value={40}
    hideLabel
/>`}
            >
                <Progress
                    label="Installing updates"
                    value={40}
                    hideLabel
                />
            </CodeView>

            <Title level={2}>Key points</Title>
            <p>
                Use <code>dots</code> to mark events at specific numeric
                positions. Each dot can contain text or any React node.
            </p>
            <CodeView
                code={`<Progress
    label="Project progress"
    value={75}
    max={100}
    dots={[
        { value: 25, label: "Planning" },
        { value: 75, label: "Review" },
    ]}
/>`}
            >
                <Progress
                    label="Project progress"
                    value={75}
                    max={100}
                    dots={[
                        { value: 25, label: "Planning" },
                        { value: 75, label: "Review" },
                    ]}
                />
            </CodeView>

            <Title level={2}>Progress labels</Title>
            <p>
                Use <code>labels</code> for evenly distributed labels. The
                labels are placed from the start to the end of the progress bar
                in array order.
            </p>
            <CodeView
                code={`<Progress
    label="Checkout steps"
    value={2}
    max={3}
    labels={["Cart", "Shipping", "Payment"]}
/>`}
            >
                <Progress
                    label="Checkout steps"
                    value={2}
                    max={3}
                    labels={["Cart", "Shipping", "Payment"]}
                />
            </CodeView>

            <Title level={2}>Custom height</Title>
            <p>
                Customize the progress bar height with the <code>height</code>{" "}
                prop. It accepts a CSS length.
            </p>
            <CodeView
                code={`<Progress
    label="Processing"
    value={50}
    height="12px"
/>`}
            >
                <Progress
                    label="Processing"
                    value={50}
                    height="12px"
                />
            </CodeView>
            <ComponentApi elements={progressApi} />
            <ComponentAccessibility elements={progressApi.accessibility} />
        </PageScroll>
    );
}
