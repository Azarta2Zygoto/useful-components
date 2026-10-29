import type { ReactNode } from "react";

import Icon from "../../icon/icon";
import "./step-button.css";

interface StepButtonProps {
    direction: "up" | "down";
    startStep: (direction: "up" | "down") => void;
    stopStep: () => void;
}

export default function StepButton({
    direction,
    startStep,
    stopStep,
}: Readonly<StepButtonProps>): ReactNode {
    return (
        <span
            aria-hidden="true"
            className={`step-button ${direction}`}
            onPointerDown={(e) => {
                if (e.button !== 0) return;
                e.currentTarget.setPointerCapture(e.pointerId);
                startStep(direction);
            }}
            onPointerUp={stopStep}
            onPointerCancel={stopStep}
            onLostPointerCapture={stopStep}
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => e.preventDefault()}
        >
            <Icon
                name={`caret-${direction}-fill`}
                size={14}
            />
        </span>
    );
}
