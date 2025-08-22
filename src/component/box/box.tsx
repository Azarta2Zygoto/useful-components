import { JSX } from "react";
import "./box.css";

interface BoxProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}

export default function Box({ children, style, className }: BoxProps): JSX.Element {
    return (
        <div
            className={`box ${className ? className : ""}`}
            style={style}
        >
            {children}
        </div>
    );
}