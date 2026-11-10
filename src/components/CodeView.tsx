"use client";

import {
    type ComponentProps,
    type PropsWithChildren,
    type ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";

import Button from "./ui/button/Button";

interface Props extends ComponentProps<"div"> {
    code?: string;
}

export default function CodeView({
    code,
    children,
    ...props
}: Readonly<PropsWithChildren<Props>>): ReactNode {
    const codeRef = useRef<HTMLElement>(null);
    const [isCodeVisible, setIsCodeVisible] = useState(false);

    useEffect(() => {
        if (isCodeVisible && codeRef.current) {
            window.Prism?.highlightElement(codeRef.current);
        }
    }, [isCodeVisible]);

    return (
        <div
            {...props}
            className={`code-view ${props.className ?? ""}`}
        >
            {code && (
                <Button
                    className="code-view-button"
                    variant="transparent"
                    data-uc-tooltip="View code"
                    pressed={isCodeVisible}
                    onClick={() => setIsCodeVisible(!isCodeVisible)}
                    aria-label="View code"
                >
                    &#60;&#62;
                </Button>
            )}
            {children}
            {isCodeVisible && (
                <pre>
                    <code
                        ref={codeRef}
                        className="language-jsx"
                    >
                        {code}
                    </code>
                </pre>
            )}
        </div>
    );
}
