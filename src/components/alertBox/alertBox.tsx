"use client";

import React, { JSX, useEffect, useState } from "react";

import Tooltip from "../tooltip/tooltip";
import Icon from "../utils/icon";
import "./alertBox.css";

interface ValidateBoxProps {
    error: -1 | 0 | 1 | 2; // -1 Dev Error, 0: error, 1: success, 2: warning
    message: string;
    position?:
        | "top"
        | "bottom"
        | "left"
        | "right"
        | "center"
        | "top left"
        | "top right"
        | "bottom left"
        | "bottom right";
    className?: string;
    visible?: boolean;
    tooltip?: boolean;
    zIndex?: number;
    view?: "default" | "compact";
    text?: {
        devError?: string;
        info?: string;
        close?: string;
    };
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onInfo?: () => void;
    onClose?: () => void;
    onContact?: () => void;
}

export default function AlertBox({
    error,
    message,
    position = "bottom left",
    className,
    visible = true,
    tooltip = true,
    zIndex = 3,
    view = "default",
    text,
    style,
    children,
    onInfo,
    onClose,
    onContact,
}: ValidateBoxProps): JSX.Element | null {
    const classNameValue =
        error === 2 ? "warning" : error === 1 ? "success" : "error";

    const classNameView = view === "compact" ? "info-box-compact" : "info-box";

    const [icon, setIcon] = useState<JSX.Element | string>("");
    const [positioning, setPositioning] = useState<{
        top?: string;
        left?: string;
        transform?: string | undefined;
    }>({ top: "97%", left: "3%", transform: "translateY(-100%)" });

    useEffect(() => {
        setIcon(iconShow(error));
    }, [error]);

    useEffect(() => {
        const [posX, posY] = position.split(" ");
        const top = posX === "top" ? "3%" : posX === "bottom" ? "97%" : "50%";
        const left =
            posX === "left" || posY === "left"
                ? "3%"
                : posX === "right" || posY === "right"
                  ? "97%"
                  : "50%";

        const transform =
            posY === "center" || posX === "center"
                ? "translate(-50%, -50%)"
                : posX === "top" && posY === undefined
                  ? "translateX(-50%)"
                  : posX === "bottom" && posY === undefined
                    ? "translateY(-100%) translateX(-50%)"
                    : posX === "bottom" && posY === "right"
                      ? "translateY(-100%) translateX(-100%)"
                      : posX === "bottom"
                        ? "translateY(-100%)"
                        : posX === "right" || posY === "right"
                          ? "translateX(-100%)"
                          : undefined;

        setPositioning({ top, left, transform });
    }, [position]);

    if (!visible) return null;
    return (
        <div
            className={`${classNameView} ${classNameValue}`}
            role="alert"
            aria-live="assertive"
            style={{
                zIndex: zIndex,
                top: positioning.top,
                left: positioning.left,
                transform: positioning.transform,
            }}
        >
            {view !== "compact" && icon}
            <p>{message}</p>
            {children && (
                <div
                    className={className ?? ""}
                    style={style}
                >
                    {children}
                </div>
            )}
            <span className="info-box-icons">
                {onContact && error === -1 && (
                    <Tooltip
                        title={text?.devError || "Dev Error"}
                        active={tooltip}
                        style={{ margin: "0 5px" }}
                    >
                        <button
                            type="button"
                            className={`background-click`}
                            onClick={onContact}
                            aria-label={text?.devError || "Dev Error"}
                        >
                            <Icon name="envelope-fill" />
                        </button>
                    </Tooltip>
                )}
                {onInfo && (
                    <Tooltip
                        title={text?.info || "Information"}
                        active={tooltip}
                        style={{ margin: "0 5px" }}
                    >
                        <button
                            type="button"
                            className={`background-click`}
                            onClick={onInfo}
                            aria-label={text?.info || "Information"}
                        >
                            <Icon name="info-circle-fill" />
                        </button>
                    </Tooltip>
                )}
                {onClose && (
                    <Tooltip
                        title={text?.close || "Close"}
                        active={tooltip}
                        style={{ margin: "0 5px" }}
                    >
                        <button
                            type="button"
                            className={`background-click`}
                            onClick={onClose}
                            aria-label={text?.close || "Close"}
                        >
                            <Icon name="x-circle-fill" />
                        </button>
                    </Tooltip>
                )}
            </span>
        </div>
    );
}

function iconShow(error: number): JSX.Element {
    switch (error) {
        case -1:
            return (
                <Icon
                    name="x-circle-fill"
                    color="var(--invalid-border-color)"
                    style={{ marginRight: "0.5rem" }}
                />
            );
        case 0:
            return (
                <Icon
                    name="x-circle-fill"
                    color="var(--invalid-border-color)"
                    style={{ marginRight: "0.5rem" }}
                />
            );
        case 1:
            return (
                <Icon
                    name="check-circle-fill"
                    color="var(--valid-border-color)"
                    style={{ marginRight: "0.5rem" }}
                />
            );
        case 2:
            return (
                <Icon
                    name="exclamation-circle-fill"
                    color="var(--warning-border-color)"
                    style={{ marginRight: "0.5rem" }}
                />
            );
        default:
            return (
                <Icon
                    name="x-circle-fill"
                    color="var(--invalid-border-color)"
                    style={{ marginRight: "0.5rem" }}
                />
            );
    }
}
