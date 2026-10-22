"use client";

import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

import { createPortal } from "react-dom";

interface Props {
    parent?: HTMLElement;
}

export default function BodyAccess({
    children,
    parent,
}: Readonly<PropsWithChildren<Props>>): ReactNode {
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (parent) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setContainer(parent);
            return;
        }

        const el = document.createElement("div");
        el.dataset.bodyAccess = "";
        document.body.appendChild(el);
        setContainer(el);

        return () => {
            el.remove();
        };
    }, [parent]);

    const target = parent ?? container;

    if (!target) return null;

    return createPortal(children, target);
}
