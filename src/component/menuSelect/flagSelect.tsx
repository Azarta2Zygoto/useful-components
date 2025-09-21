"use client";

import React, { JSX, Fragment } from "react";
import MenuSelect from "./menuSelect";
import { InputVariant } from "../utils/types";
import * as FlagIcons from "country-flag-icons/react/3x2";
import "./flagSelect.css";
import Icon from "../utils/icon";

interface FlagSelectProps {
    id: string;
    countries: {name:string, code:string}[];
    selectCountry: string;
    className?: string;
    flagOnly?: boolean;
    variant?: InputVariant;
    tooltip?: boolean;
    style?: React.CSSProperties;
    backgroundColor?: string;
    onSelect: (country: string) => void;
    onKeyDown?: (event: React.KeyboardEvent<Element>) => void;
}

export default function FlagSelect({
    id,
    countries,
    selectCountry,
    flagOnly,
    style,
    tooltip,
    variant="outlined",
    className,
    backgroundColor = "var(--bg)",
    onSelect,
    onKeyDown
}: FlagSelectProps): JSX.Element {

    function setCountryFlag(index:number):React.ReactNode {
        const countryCode = countries[index].code;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const FlagComponent = (FlagIcons as Record<string, React.ComponentType<any>>)[countryCode];

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

    function setCountryFlagOption(name:string):React.ReactNode {
        const country = countries.find(c=>c.name === name);
        if (!country) return <span className="flag-placeholder" />;
        const countryCode = country.code;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const FlagComponent = (FlagIcons as Record<string, React.ComponentType<any>>)[countryCode];
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
            options={countries.map(c=>c.name)}
            selectedOption={selectCountry}
            variant={flagOnly ? "invisible" : variant}
            tooltip={flagOnly ? undefined : tooltip}
            hideIcon={flagOnly ? true : false}
            onSelect={onSelect}
            onKeyDown={onKeyDown}
            setCustomList={setCountryFlag}
            setCustomOption={setCountryFlagOption}
            backgroundColor={backgroundColor}
            style={{
                ...style,
                paddingRight: flagOnly ? 0 : undefined,}}
            className={className}
        />
    )
}
