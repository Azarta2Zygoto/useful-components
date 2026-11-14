"use client";

import { useState } from "react";

import Button from "@ui/button/Button";
import { useToast } from "@ui/toast/Toast.context";

import CodeView from "@/components/CodeView";
import ComponentAccessibility from "@/components/ComponentAccessibility";
import ComponentApi from "@/components/ComponentApi";
import PageScroll from "@/components/PageScroll";
import Title from "@/components/Title";
import toastApi from "@/data/toast.json";

export default function ToastPage() {
    const toast = useToast();
    const [dismissibleId, setDismissibleId] = useState<number | null>(null);

    return (
        <PageScroll
            name={toastApi.name}
            link={toastApi.source}
        >
            <Title level={1}>Toast</Title>
            <p>
                A toast displays a temporary message without interrupting the
                current page. Toasts pause while hovered or focused and can
                contain any React node.
            </p>

            <Title level={2}>Toast types</Title>
            <p>
                Use the matching method on <code>useToast</code> to communicate
                success, errors, information, or warnings.
            </p>
            <CodeView
                code={`const toast = useToast();

toast.success("Changes saved");
toast.error("Unable to save changes");
toast.info("A new version is available");
toast.warning("Your session will expire soon");`}
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                }}
            >
                <Button onClick={() => toast.success("Changes saved")}>
                    Success
                </Button>
                <Button onClick={() => toast.error("Unable to save changes")}>
                    Error
                </Button>
                <Button onClick={() => toast.info("A new version is available")}>
                    Info
                </Button>
                <Button
                    onClick={() => toast.warning("Your session will expire soon")}
                >
                    Warning
                </Button>
            </CodeView>

            <Title level={2}>Toast options</Title>
            <p>
                Pass options as the second argument to customize the duration,
                exit animation, tooltip, size, labels, or close callback. A
                duration of <code>0</code> keeps the toast visible until it is
                dismissed.
            </p>
            <CodeView
                code={`toast.success("Saved briefly", { duration: 1000 });
toast.info("This toast stays visible", { duration: 0 });
toast.error("Custom exit animation", {
    exitDuration: 1000,
});`}
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                }}
            >
                <Button
                    onClick={() =>
                        toast.success("Saved briefly", { duration: 1000 })
                    }
                >
                    One second
                </Button>
                <Button
                    onClick={() =>
                        toast.info("This toast stays visible", { duration: 0 })
                    }
                >
                    Persistent
                </Button>
                <Button
                    onClick={() =>
                        toast.error("Custom exit animation", {
                            exitDuration: 1000,
                        })
                    }
                >
                    Custom exit
                </Button>
            </CodeView>

            <Title level={2}>React content and dismissal</Title>
            <p>
                The message accepts any React node. Each creation method
                returns an identifier that can be passed to{" "}
                <code>dismiss</code>.
            </p>
            <CodeView
                code={`const id = toast.info(
    <>
        <span>More information</span>
        <Button onClick={() => toast.dismiss(id)}>
            Dismiss
        </Button>
    </>,
    { duration: 0 },
);`}
            >
                <Button
                    onClick={() => {
                        const id = toast.info(
                            <>
                                <span>More information</span>
                                <Button onClick={() => toast.dismiss(id)}>
                                    Dismiss
                                </Button>
                            </>,
                            { duration: 0 },
                        );
                        setDismissibleId(id);
                    }}
                >
                    Show dismissible toast
                </Button>
                {dismissibleId !== null && (
                    <Button
                        variant="transparent"
                        onClick={() => {
                            toast.dismiss(dismissibleId);
                            setDismissibleId(null);
                        }}
                    >
                        Dismiss from outside
                    </Button>
                )}
            </CodeView>

            <Title level={2}>Provider configuration</Title>
            <p>
                Wrap the application with <code>ToastProvider</code> once.
                Provider options apply globally and cannot be set when creating
                an individual toast.
            </p>
            <CodeView
                code={`<ToastProvider
    duration={3000}
    exitDuration={300}
    position="tr"
    toastNumberLimit={5}
    tooltip
>
    {children}
</ToastProvider>`}
            />

            <ComponentApi
                title="Provider API"
                elements={toastApi.provider}
            />
            <ComponentApi
                title="Toast creation API"
                elements={toastApi.toast}
            />
            <ComponentAccessibility elements={toastApi.accessibility} />
        </PageScroll>
    );
}
