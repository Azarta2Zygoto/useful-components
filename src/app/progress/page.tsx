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
                <code>Progress</code> wraps the native{" "}
                <code>&lt;progress&gt;</code> element to show determinate or
                indeterminate task completion. It supports labels, sizes,
                custom track heights, label positioning, and milestone markers.
            </p>

            <Title level={2}>Determinate progress</Title>
            <p>
                Provide a <code>label</code> and a numeric <code>value</code>.
                The default <code>max</code> is <code>100</code>; use another
                maximum when the progress represents a number of steps.
            </p>
            <CodeView
                code={`<Progress
    label="Uploading files"
    value={65}
/>
<Progress
    label="Checkout"
    value={2}
    max={3}
    size="lg"
    labelPosition="left"
/>`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                }}
            >
                <Progress
                    label="Uploading files"
                    value={65}
                />
                <Progress
                    label="Checkout"
                    value={2}
                    max={3}
                    size="lg"
                    labelPosition="left"
                />
            </CodeView>

            <Title level={2}>Indeterminate progress</Title>
            <p>
                Omit <code>value</code> when the task is active but its
                completion percentage is not known yet. The native progress
                semantics remain indeterminate and the visual animation
                respects reduced-motion preferences.
            </p>
            <CodeView
                code={`<Progress label="Installing updates" />`}
            >
                <Progress label="Installing updates" />
            </CodeView>

            <Title level={2}>Milestone markers</Title>
            <p>
                Use <code>preciseDots</code> to place labeled markers at
                numeric positions. Each marker accepts a <code>value</code>, an
                optional React <code>label</code>, and optional span properties.
            </p>
            <CodeView
                code={`<Progress
    label="Project progress"
    value={75}
    preciseDots={[
        { value: 25, label: "Planning" },
        { value: 75, label: "Review" },
    ]}
/>`}
            >
                <Progress
                    label="Project progress"
                    value={75}
                    preciseDots={[
                        { value: 25, label: "Planning" },
                        { value: 75, label: "Review" },
                    ]}
                />
            </CodeView>

            <p>
                Use <code>regularDots</code> for evenly distributed markers.
                Items are placed from the start to the end of the track in
                array order. Choose either <code>regularDots</code> or{" "}
                <code>preciseDots</code>.
            </p>
            <CodeView
                code={`<Progress
    label="Checkout steps"
    value={2}
    max={3}
    regularDots={["Cart", "Shipping", "Payment"]}
/>`}
            >
                <Progress
                    label="Checkout steps"
                    value={2}
                    max={3}
                    regularDots={["Cart", "Shipping", "Payment"]}
                />
            </CodeView>

            <Title level={2}>Layout and track styling</Title>
            <p>
                Set <code>labelPosition</code> to <code>left</code> for a
                horizontal label layout. Use <code>size</code> to adjust the
                component scale and <code>trackHeight</code> for a custom CSS
                length.
            </p>
            <CodeView
                code={`<Progress
    label="Processing"
    value={50}
    labelPosition="left"
    trackHeight="12px"
/>`}
            >
                <Progress
                    label="Processing"
                    value={50}
                    labelPosition="left"
                    trackHeight="12px"
                />
            </CodeView>

            <Title level={2}>Value handling</Title>
            <p>
                Values below zero are clamped to zero, values above{" "}
                <code>max</code> are clamped to the maximum, and invalid or
                non-positive maximum values are normalized to a safe range.
                Markers outside the range are not rendered.
            </p>

            <ComponentApi elements={progressApi} />
            <ComponentAccessibility elements={progressApi.accessibility} />
        </PageScroll>
    );
}
