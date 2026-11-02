"use client";

import {
    type PropsWithChildren,
    type ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";

import Button from "./ui/button/Button";

interface Props {
    code?: string;
}

export default function CodeView({
    code,
    children,
}: Readonly<PropsWithChildren<Props>>): ReactNode {
    const codeRef = useRef<HTMLElement>(null);
    const [isCodeVisible, setIsCodeVisible] = useState(false);

    useEffect(() => {
        if (isCodeVisible && codeRef.current) {
            console.log("Highlighting code...", window.Prism);
            window.Prism?.highlightElement(codeRef.current);
        }
    }, [isCodeVisible]);

    return (
        <div className="code-view">
            {code && (
                <Button
                    className="code-view-button"
                    variant="transparent"
                    tooltip="View code"
                    pressed={isCodeVisible}
                    onClick={() => setIsCodeVisible(!isCodeVisible)}
                    aria-label="code"
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
