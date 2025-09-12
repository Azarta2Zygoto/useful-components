import { JSX, useEffect, useState } from "react";
import Tooltip from "../tooltip/tooltip";
import "./alertBox.css";
import Icon from "../utils/icon";

interface ValidateBoxProps {
    error:-1|0|1|2; // -1 Dev Error, 0: error, 1: success, 2: warning
    message: string;
    position?: "top" | "bottom" | "left" | "right" | "center" |
                "top left" | "top right" |
                "bottom left" | "bottom right";
    visible?: boolean;
    zIndex?: number;
    tooltip?: boolean;
    children?: JSX.Element | JSX.Element[];
    view?:"default" | "compact";
    text?: {
        devError?: string;
        descDevError?: string;
        info?: string;
        descInfo?: string;
        close?: string;
        descClose?: string;
    }
    onInfo?: () => void;
    onClose?: () => void;
    onContact?: () => void;
}

/**
 * 
 * @param param - The properties for the AlertBox component.
 * @param param.error - The error state (-1 Dev Error, 0: error, 1: success, 2: warning).
 * @param param.message - The message to display.
 * @param param.position - Optional position of the box (default is "bottom left").
 * @param param.visible - Optional visibility state of the box (default is true).
 * @param param.zIndex - Optional z-index for the box (default is 3).
 * @param param.children - Optional children elements to display inside the box.
 * @param param.text - Optional text for dev error, info, and close buttons.
 * @param param.tooltip - Optional tooltip for the box (default is true).
 * @param param.onInfo - Optional callback for additional information.
 * @param param.onClose - Optional callback to close the box.
 * @param param.onContact - Optional callback to contact support.
 * @returns A JSX element representing the AlertBox component.
 */
export default function AlertBox({
    error,
    message,
    position = "bottom left",
    visible = true,
    zIndex = 3,
    tooltip = true,
    view = "default",
    text = {
        devError: "Dev Error",
        descDevError: "An error occurred, please contact support.",
        info: "Information",
        descInfo: "Click for more information.",
        close: "Close",
        descClose: "Close this alert box."
    },
    onInfo,
    onClose,
    onContact,
    children
}: ValidateBoxProps):JSX.Element {
    const classNameValue = error === 2 ? "warning" :
        error === 1 ? "success" : "error";

    const classNameView = view === "compact" ? "info-box-compact" : "info-box";

    const [icon, setIcon] = useState<JSX.Element | string>("");
    const [positioning, setPositioning] = useState<{
        top?: string;
        left?: string;
        transform?: string|undefined;
    }>({top: "97%", left: "3%", transform: "translateY(-100%)"});

    useEffect(() => {
        setIcon(iconShow(error));
    }, [error]);

    useEffect(() => {
        const [posX, posY] = position.split(" ");
        const top = posX === "top" ? "3%" : posX === "bottom" ? "97%" : "50%";
        const left = posX === "left" || posY === "left" ? "3%" :
                posX === "right" || posY === "right" ? "97%" : "50%";
                
        const transform = posY === "center" || posX === "center" ? "translate(-50%, -50%)" : 
                posX === "top" && posY === undefined ? "translateX(-50%)" :
                posX === "bottom" && posY === undefined ? "translateY(-100%) translateX(-50%)" :
                posX==="bottom"&&posY === "right" ? "translateY(-100%) translateX(-100%)" :    
                posX==="bottom"?"translateY(-100%)": 
                posX === "right" || posY === "right" ? "translateX(-100%)" :undefined;
                
        setPositioning({ top, left, transform });
    }, [position]);
    
    return (
        <div
            style={{
                zIndex: zIndex,
                display: visible ? "flex" : "none",
                top: positioning.top,
                left: positioning.left,
                transform: positioning.transform,
            }}
            role="alert"
            aria-live="assertive"
            className={`${classNameView} ${classNameValue}`}>
            {view!=="compact"&&icon}
            <p>{message}</p>
            {children && (
                <div className="info-box-children">
                    {children}
                </div>
            )}
            <div style={{display: "flex", alignItems: "center"}}>
                {onContact && error === -1 && (
                    <Tooltip title={text.devError || "Dev Error"} active={tooltip} style={{margin: "0 5px"}}>
                        <button
                            className={`background-click`}
                            aria-label={text.devError || "Dev Error"}
                            onClick={onContact}
                            type="button">
                            <Icon
                                name="envelope-fill"
                            />
                        </button>
                    </Tooltip>
                )}
                {onInfo && (
                    <Tooltip title={text.info || "Information"} active={tooltip} style={{margin: "0 5px"}}>
                        <button
                            className={`background-click`}
                            aria-label={text.info || "Information"}
                            onClick={onInfo}
                            type="button">
                            <Icon
                                name="info-circle-fill"
                            />
                        </button>
                    </Tooltip>
                )}
                {onClose && (
                    <Tooltip title={text.close || "Close"} active={tooltip} style={{margin: "0 5px"}}>
                        <button
                            className={`background-click`}
                            aria-label={text.close || "Close"}
                            onClick={onClose}
                            type="button">
                            <Icon
                                name="x-circle-fill"
                            />
                        </button>
                    </Tooltip>
                )}
            </div>
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
                    style={{marginRight: "0.5rem"}}
                />
            );
        case 0: 
            return (
                <Icon
                    name="x-circle-fill"
                    color="var(--invalid-border-color)"
                    style={{marginRight: "0.5rem"}}
                />
        )
        case 1:
            return (
                <Icon
                    name="check-circle-fill"
                    color="var(--valid-border-color)"
                    style={{marginRight: "0.5rem"}}
                />
            )
        case 2: 
            return (
                <Icon
                    name="exclamation-circle-fill"
                    color="var(--warning-border-color)"
                    style={{marginRight: "0.5rem"}}
                />
        )
        default:
            return (
                <Icon
                    name="x-circle-fill"
                    color="var(--invalid-border-color)"
                    style={{marginRight: "0.5rem"}}
                />
        );
    }
}