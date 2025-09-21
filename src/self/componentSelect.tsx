import MenuSelect from "@/component/menuSelect/menuSelect";
import React, { JSX } from "react";

export interface ComponentSelectProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    label: string;
    id: string;
    children?: React.ReactNode;
}

export default function ComponentSelect({
    options,
    value,
    onChange,
    label,
    id,
    children
}: ComponentSelectProps) : JSX.Element {
    return (
        <div className="inner-component">
            <span></span>
            <div className="inner-component-description">
                {children}
            </div>
            <MenuSelect
                id={id}
                boxClassName="inner-component-select"
                options={options}
                selectedOption={value}
                onSelect={onChange}
                backgroundColor="var(--bg2)"
                floatingLabel
                label={label}
            />
        </div>
    );
}