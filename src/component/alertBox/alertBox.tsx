import { JSX, useEffect, useState } from "react";
import Tooltip from "../tooltip/tooltip";
import "./alertBox.css";

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
            className={`info-box ${classNameValue}`}>
            {icon}
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <desc>{text.descDevError}</desc>
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                            </svg>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <desc>{text.descInfo}</desc>
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                            </svg>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <desc>{text.descClose}</desc>
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                style={{
                    color: "var(--invalid-border-color)",
                    marginRight: "0.5rem",
                }}>
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
            </svg>
            );
        case 0: 
            return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                style={{
                    color: "var(--invalid-border-color)",
                    marginRight: "0.5rem",
                }}>
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
            </svg>
        )
        case 1:
            return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                style={{
                    color: "var(--success-border-color)",
                    marginRight: "0.5rem",
                }}>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
            </svg>
            )
        case 2: 
            return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                style={{
                    color: "var(--warning-border-color)",
                    marginRight: "0.5rem",
                }}>
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
            </svg>
        )
        default:
            return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                style={{
                    color: "var(--invalid-border-color)",
                    marginRight: "0.5rem",
                }}>
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
            </svg>
        );
    }
}