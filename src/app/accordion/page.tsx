"use client";

import { useState } from "react";

import Accordion from "@ui/accordion/Accordion";
import Button from "@ui/button/Button";

import CodeView from "@/components/CodeView";
import ComponentAccessibility from "@/components/ComponentAccessibility";
import ComponentApi from "@/components/ComponentApi";
import PageScroll from "@/components/PageScroll";
import Title from "@/components/Title";
import accordionJson from "@/data/accordion.json";

export default function AccordionPage() {
    const [openSimple, setOpenSimple] = useState(false);
    const [openSimple2, setOpenSimple2] = useState(false);
    const [openControlled, setOpenControlled] = useState(false);

    return (
        <PageScroll
            name={accordionJson.name}
            link={accordionJson.source}
        >
            <Title level={1}>Accordion</Title>
            <p>An accordion allows to hide then show content.</p>

            <Title level={2}>Basic Accordion</Title>
            <p>
                The basic accordion is controlled by its parent through the{" "}
                <code>open</code> prop. It renders a <code>div</code> that can
                be opened or closed by any control outside the component.
            </p>
            <CodeView
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
                code={`<Button onClick={() => setOpenSimple(!openSimple)}>
    {openSimple ? "Close Accordion" : "Open Accordion"}
</Button>
<Accordion open={openSimple}>
    <p>This is the content of the accordion.</p>
    <p>You can put any JSX element here.</p>
</Accordion>`}
            >
                <Button onClick={() => setOpenSimple(!openSimple)}>
                    {openSimple ? "Close Accordion" : "Open Accordion"}
                </Button>
                <Accordion open={openSimple}>
                    <p>This is the content of the accordion.</p>
                    <p>You can put any JSX element here.</p>
                </Accordion>
            </CodeView>
            <Title level={3}>Variants</Title>
            <p>
                There are three variants: <code>around</code>, <code>left</code>
                , and <code>none</code>. The default is <code>around</code>.
            </p>
            <CodeView
                code={`<Accordion
    variant="left"
    open={open}
>
    JSX
</Accordion>`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <Button onClick={() => setOpenSimple2(!openSimple2)}>
                    {openSimple2 ? "Close Accordion" : "Open Accordion"}
                </Button>
                <Accordion
                    variant="left"
                    open={openSimple2}
                >
                    <p>This is the content of the accordion.</p>
                    <p>You can put any JSX element here.</p>
                </Accordion>

                <Button onClick={() => setOpenControlled(!openControlled)}>
                    {openControlled ? "Close Accordion" : "Open Accordion"}
                </Button>
                <Accordion
                    variant="none"
                    open={openControlled}
                >
                    <p>This is the content of the accordion.</p>
                    <p>You can put any JSX element here.</p>
                </Accordion>
            </CodeView>
            <Title level={2}>Icon accordion</Title>
            <p>
                The accordion can also be controlled by clicking an icon. Set
                the <code>view</code> prop to <code>icon</code> and provide a
                label with the <code>header</code> prop. The{" "}
                <code>variant</code> changes the header style. Tooltips are
                enabled by default and can be disabled with{" "}
                <code>tooltip={"{false}"}</code>.
            </p>
            <CodeView
                code={`<Accordion
    header="Icon View Accordion"
    view="icon"
>
    <p>This is an accordion with icon view.</p>
    <p>Click the icon to toggle.</p>
</Accordion>`}
            >
                <Accordion
                    header="Icon View Accordion"
                    view="icon"
                >
                    <p>This is an accordion with icon view.</p>
                    <p>Click the icon to toggle.</p>
                </Accordion>
            </CodeView>
            <Title level={2}>Card accordion</Title>
            <p>
                The accordion can also have a card view. You can click wherever
                on the card, it will open the accordion. You need to set the{" "}
                <code>view</code> prop to <code>card</code> and put a header to
                the card with the <code>header</code> props. The variant is also
                modifying the style of the card.
            </p>
            <CodeView
                code={`<Accordion
    header="Card View Accordion"
    view="card"
>
    <p>This is an accordion with card view.</p>
</Accordion>
<Accordion
    header="Card View Accordion"
    view="card"
    variant="none"
>
    <p>This is another accordion with card view.</p>
    <p>It has a different style.</p>
</Accordion>`}
            >
                <Accordion
                    header="Card View Accordion"
                    view="card"
                >
                    <p>This is an accordion with card view.</p>
                </Accordion>
                <Accordion
                    header="Card View Accordion"
                    view="card"
                    variant="none"
                >
                    <p>This is another accordion with card view.</p>
                    <p>It has a different style.</p>
                </Accordion>
            </CodeView>
            <ComponentApi elements={accordionJson} />
            <ComponentAccessibility elements={accordionJson.accessibility} />
        </PageScroll>
    );
}
