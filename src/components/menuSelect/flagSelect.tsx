"use client";

import React, { Fragment, JSX } from "react";

import * as FlagIcons from "country-flag-icons/react/3x2";

import Icon from "../utils/icon";
import { InputVariant } from "../utils/types";
import "./flagSelect.css";
import MenuSelect from "./menuSelect";

interface FlagSelectProps {
    id: string;
    countries: { name: string; code: string }[];
    selectCountry: string;
    flagOnly?: boolean;
    variant?: InputVariant;
    label?: string;
    floatingLabel?: boolean;
    disabled?: boolean;
    hideIcon?: boolean;
    required?: boolean;
    tooltip?: boolean;
    className?: string;
    boxClassName?: string;
    boxStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    ref?: React.Ref<unknown>;
    backgroundColor?: string;
    onSelect: (country: string) => void;
    onKeyDown?: (event: React.KeyboardEvent<Element>) => void;
}

export default function FlagSelect({
    id,
    countries,
    selectCountry,
    flagOnly,
    label,
    floatingLabel,
    disabled,
    hideIcon,
    required,
    boxClassName,
    boxStyle,
    style,
    tooltip,
    variant = "outlined",
    className,
    backgroundColor = "var(--bg)",
    onSelect,
    onKeyDown,
}: FlagSelectProps): JSX.Element {
    function setCountryFlag(index: number): React.ReactNode {
        const countryCode = countries[index].code.toUpperCase();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const FlagComponent = (
            FlagIcons as Record<string, React.ComponentType<any>>
        )[countryCode];

        if (!FlagComponent) {
            return (
                <Fragment>
                    <Icon name="globe" />
                    <span className="flag-name">{countries[index].name}</span>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <FlagComponent
                    className="flag-icon"
                    aria-hidden="true"
                />
                <span className="flag-name">{countries[index].name}</span>
            </Fragment>
        );
    }

    function setCountryFlagOption(name: string): React.ReactNode {
        const country = countries.find((c) => c.name === name);
        if (!country) return <span className="flag-placeholder" />;
        const countryCode = country.code;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const FlagComponent = (
            FlagIcons as Record<string, React.ComponentType<any>>
        )[countryCode];
        if (!FlagComponent) {
            return (
                <Fragment>
                    <Icon name="globe" />
                    {!flagOnly && <span className="flag-name">{name}</span>}
                </Fragment>
            );
        }
        return (
            <Fragment>
                <FlagComponent
                    className="flag-icon"
                    aria-hidden="true"
                />
                {!flagOnly && <span className="flag-name">{name}</span>}
            </Fragment>
        );
    }

    return (
        <MenuSelect
            id={id}
            options={countries.map((c) => c.name)}
            selectedOption={selectCountry}
            variant={flagOnly ? "invisible" : variant}
            tooltip={flagOnly ? undefined : tooltip}
            hideIcon={flagOnly ? true : hideIcon}
            onSelect={onSelect}
            onKeyDown={onKeyDown}
            setCustomList={setCountryFlag}
            setCustomOption={setCountryFlagOption}
            backgroundColor={backgroundColor}
            label={label}
            floatingLabel={floatingLabel}
            disabled={disabled}
            required={required}
            boxClassName={boxClassName}
            boxStyle={boxStyle}
            style={{
                ...style,
                paddingRight: flagOnly ? 0 : undefined,
            }}
            className={className}
        />
    );
}
