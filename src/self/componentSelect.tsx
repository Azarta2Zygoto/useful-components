import React, { JSX } from "react";

import { useGlobal } from "./globalProvider";

import MenuSelect from "@/components/menuSelect/menuSelect";

export interface ComponentSelectProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    label: string;
    id: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    show?: boolean;
}

export default function ComponentSelect({
    options,
    value,
    onChange,
    label,
    id,
    children,
    style,
    show = true,
}: ComponentSelectProps): JSX.Element {
    const { width } = useGlobal();
    return (
        <div
            className="inner-component"
            style={style}
        >
            {show && <span></span>}
            <div className="inner-component-description">{children}</div>
            {show && (
                <MenuSelect
                    id={id}
                    boxClassName="inner-component-select"
                    options={options}
                    selectedOption={value}
                    onSelect={onChange}
                    backgroundColor="var(--bg2)"
                    floatingLabel
                    label={label}
                    boxStyle={{ margin: width < 600 ? "0 auto" : undefined }}
                />
            )}
        </div>
    );
}
