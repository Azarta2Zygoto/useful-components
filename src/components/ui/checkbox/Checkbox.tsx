"use client";

import {
    type ChangeEvent,
    type ReactNode,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

import Required from "../required/Required";
import { useTooltip } from "../tooltip/useTooltip.hook";
import "./checkbox.css";
import type { CheckboxProps } from "./checkbox.type";

function chain<E>(...f: Array<((e: E) => void) | undefined>) {
    return (e: E) => f.forEach((fn) => fn?.(e));
}

export default function Checkbox({
    ref,
    label,
    checked,
    defaultChecked,
    indeterminate = false,
    position = "left",
    size,
    hideLabel,
    required,
    tooltip,
    checkmark,
    containerProps,
    onChange,
    onValue,
    ...props
}: CheckboxProps): ReactNode {
    const inputRef = useRef<HTMLInputElement>(null);
    const [innerChecked, setInnerChecked] = useState(defaultChecked ?? false);
    const isControlled = checked !== undefined;
    const currentChecked = checked ?? innerChecked;

    useImperativeHandle(ref, () => inputRef.current!, []);

    useLayoutEffect(() => {
        if (inputRef.current) inputRef.current.indeterminate = indeterminate;
    });

    const check =
        typeof checkmark === "function"
            ? checkmark(currentChecked, indeterminate)
            : checkmark;

    const { "aria-describedby": tooltipDescribedBy, ...handlers } = useTooltip({
        content: tooltip,
        delay: 300,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
            setInnerChecked(e.target.checked);
        }
        e.target.indeterminate = indeterminate;
        onChange?.(e);
        onValue?.(e.target.checked);
    };

    return (
        <label
            {...containerProps}
            data-uc-size={size}
            data-uc-checkbox={`${position}-${hideLabel ? "none" : "label"}`}
            onMouseEnter={chain(
                containerProps?.onMouseEnter,
                handlers.onMouseEnter,
            )}
            onMouseLeave={chain(
                containerProps?.onMouseLeave,
                handlers.onMouseLeave,
            )}
            onFocus={chain(containerProps?.onFocus, handlers.onFocus)}
            onBlur={chain(containerProps?.onBlur, handlers.onBlur)}
        >
            {hideLabel ? null : (
                <>
                    {label}
                    <Required required={required} />
                </>
            )}
            <input
                {...props}
                ref={inputRef}
                type="checkbox"
                checked={checked}
                defaultChecked={defaultChecked}
                required={required}
                aria-label={hideLabel ? label : undefined}
                aria-describedby={
                    [props["aria-describedby"], tooltipDescribedBy]
                        .filter(Boolean)
                        .join(" ") || undefined
                }
                onChange={handleChange}
            />
            <span
                aria-hidden="true"
                className={`uc-checkbox${check ? " custom" : " checkmark"}`}
            >
                {check ?? null}
            </span>
        </label>
    );
}
