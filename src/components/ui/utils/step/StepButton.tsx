import type { ReactNode } from "react";

import CaretDown from "../../assets/icons/caret-down.svg";
import CaretUp from "../../assets/icons/caret-up.svg";
import Icon from "../../icon/Icon";
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
            <Icon icon={direction === "up" ? CaretUp : CaretDown} />
        </span>
    );
}
