import type { PropsWithChildren, ReactNode } from "react";

export interface SvgProps {
    height?: string | number;
    width?: string | number;
    fill?: string;
    ariaLabel?: string;
    title?: string;
}

interface Props extends SvgProps {
    viewBox?: string;
}

export function IconSVG({
    viewBox = "0 0 24 24",
    height = 24,
    width = 24,
    fill = "currentColor",
    ariaLabel,
    title,
    children,
}: Readonly<PropsWithChildren<Props>>): ReactNode {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            height={height}
            width={width}
            focusable="false"
            fill={fill}
            aria-label={ariaLabel}
            aria-hidden={ariaLabel ? undefined : "true"}
        >
            {title && <title>{title}</title>}
            {children}
        </svg>
    );
}
