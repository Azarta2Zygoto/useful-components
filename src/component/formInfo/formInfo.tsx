import { JSX, useRef } from "react";
import Tooltip from "../tooltip/tooltip";
import Icon from "../utils/icon";

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
            active={!!tooltip}
            targetRef={infoRef}
        >
            <button
                className={`background-click ${isInfo&&"selected"} ${buttonclassName??""}`}
                aria-label={text?.see||"See more information"}
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
                <Icon name="info-circle-fill" />
            </button>
        </Tooltip>
    )

    if (form) {
        return (
            <form
                action={action||"#"}
                method={method||"get"}
                ref={ref as React.Ref<HTMLFormElement>}
                className={`component-box ${className??""}`}
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
            className={`component-box ${className??""}`}
            style={style}
        >
            {innerJSX}
            {children}
        </div>
    );
}