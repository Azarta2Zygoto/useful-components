"use client";

import Button from "@ui/button/Button";
import { useTooltip } from "@ui/tooltip/useTooltip.hook";

export default function TooltipPage() {
    const bottomTooltip = useTooltip({
        content: "Bottom tooltip",
        placement: "bottom",
    });
    const topTooltip = useTooltip({
        content: "Top tooltip",
        placement: "top",
    });
    const leftTooltip = useTooltip({
        content: "Left tooltip",
        placement: "left",
    });
    const rightTooltip = useTooltip({
        content: "Right tooltip",
        placement: "right",
    });
    const tooltip300 = useTooltip({
        content: "300ms delay tooltip",
        delay: 300,
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
                You just need to put some texts into &quot;tooltip&quot; and,
                most of the time, a tooltip entirely made with CSS appears
            </p>
            <div className="inner-component">
                <Button
                    variant="primary"
                    tooltip="This is a tooltip"
                >
                    Primary
                </Button>
                <Button
                    variant="primary"
                    tooltip="This is a tooltip"
                    ripple={false}
                >
                    Primary
                </Button>
                <p data-tooltip="This is a tooltip">Element</p>
            </div>
            <h2>More develop tooltip</h2>
            <p>
                Sometimes, the precedent solution is not working due to CSS
                (skill) issues or want more control over the tooltip. Then, you
                have a more advanced solution with a little bit of custom code.
                You can use the &quot;useTooltip&quot; hook to create a tooltip
                with more control over its behavior and appearance.
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
            <h3>Delay</h3>
            <p>
                You can also add a delay to the tooltip, so it will appear after
                a certain amount of time. This can be useful to avoid showing
                the tooltip too quickly and annoying the user.
            </p>
            <div className="inner-component">
                <Button
                    variant="primary"
                    {...tooltip300}
                >
                    300ms delay
                </Button>
            </div>
        </main>
    );
}
