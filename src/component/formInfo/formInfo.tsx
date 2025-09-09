import { JSX, useRef } from "react";
import Tooltip from "../tooltip/tooltip";

interface FormInfoProps {
    className?: string;
    tooltip?: boolean;
    form?: boolean;
    action?: string;
    method?: "get"|"post";
    encType?: string;
    style?: React.CSSProperties;
    text?:{
        see?: string
    }
    children: React.ReactNode;
    isInfo?: boolean;
    buttonClassName?: string;
    ref?: React.Ref<HTMLFormElement>|React.Ref<HTMLDivElement>;
    getInfo:()=>void;
    onSubmit?:(e: React.FormEvent<HTMLFormElement>)=>void;
}


export default function FormInfo({
    className,
    isInfo,
    tooltip,
    style,
    action,
    method,
    form = true,
    text,
    encType="application/x-www-form-urlencoded",
    children,
    buttonClassName,
    ref,
    getInfo,
    onSubmit
}: FormInfoProps): JSX.Element {
    const infoRef = useRef<HTMLButtonElement>(null);

    const innerJSX = (
        <Tooltip
            title={text?.see||"See more information"}
            active={tooltip}
            targetRef={infoRef}
        >
            <button
                className={`background-click ${isInfo&&"selected"} ${buttonClassName||""}`}
                aria-label={text?.see||"See more information"}
                aria-describedby="forminfo-tooltip"
                onClick={getInfo}
                ref={infoRef}
                type="button"
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 1
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <desc>See all the information</desc>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                </svg>
            </button>
        </Tooltip>
    )

    if (form) {
        return (
            <form
                action={action||"#"}
                method={method||"get"}
                ref={ref as React.Ref<HTMLFormElement>}
                className={`component-box ${className||""}`}
                encType={encType}
                style={style}
                onSubmit={onSubmit}
            >
                {innerJSX}
                {children}
            </form>
        );
    }
    return (
        <div
            ref={ref as React.Ref<HTMLDivElement>}
            className={`component-box ${className||""}`}
            style={style}
        >
            {innerJSX}
            {children}
        </div>
    );
}