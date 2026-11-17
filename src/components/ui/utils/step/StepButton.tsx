import type { ReactNode } from "react";

import { CaretDownIcon, CaretUpIcon } from "@ui/assets/icons";
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
        <Icon
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
            icon={direction === "up" ? CaretUpIcon : CaretDownIcon}
        />
    );
}
