"use client";

import { ReactNode } from "react";

import Button from "@/components/button/button";
import { useTooltip } from "@/components/tooltip/useTooltip";

export default function TooltipPage(): ReactNode {
    const bottomTooltip = useTooltip({
        content: "Bottom tooltip",
        placement: "b",
    });
    const topTooltip = useTooltip({
        content: "Top tooltip",
        placement: "t",
    });
    const leftTooltip = useTooltip({
        content: "Left tooltip",
        placement: "l",
    });
    const rightTooltip = useTooltip({
        content: "Right tooltip",
        placement: "r",
    });

    return (
        <main>
            <h1>Tooltip</h1>
            <p>
                A tooltip is a small pop-up box that appears when a user hovers
                over an element, providing additional information or context
                about that element. Tooltips are commonly used in user
                interfaces to enhance usability and provide guidance to users.
            </p>
            <h2>Basic tooltip</h2>
            <p>
                You just need to put some texts into "data-tooltip" and, most of
                the time, a tooltip entirely made with CSS appears
            </p>
            <div className="inner-component">
                <Button
                    variant="primary"
                    data-tooltip="This is a tooltip"
                >
                    Primary
                </Button>
                <Button
                    variant="primary"
                    data-tooltip="This is a tooltip"
                    ripple={false}
                >
                    Primary
                </Button>
                <p data-tooltip="This is a tooltip">Element</p>
            </div>
            <h2>More develop tooltip</h2>
            <p>
                Sometimes, the precedent solution isn't working due to CSS
                (skill) issues or want more control over the tooltip. Then, you
                have a more advanced solution with a little bit of custom code.
                You can use the "useTooltip" hook to create a tooltip with more
                control over its behavior and appearance.
            </p>
            <div className="inner-component">
                <Button
                    variant="primary"
                    {...bottomTooltip}
                >
                    Bottom
                </Button>
                <Button
                    variant="primary"
                    {...topTooltip}
                >
                    Top
                </Button>
                <Button
                    variant="primary"
                    {...leftTooltip}
                >
                    Left
                </Button>
                <Button
                    variant="primary"
                    {...rightTooltip}
                >
                    Right
                </Button>
            </div>
        </main>
    );
}
