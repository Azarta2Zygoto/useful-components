import React, { useEffect, useRef, JSX } from 'react';
import { createPortal } from 'react-dom';

export default function BodyAccess({
    children
}: { children: React.ReactNode }):JSX.Element|null {
    const elRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        elRef.current = document.createElement('div');

        document.body.appendChild(elRef.current!);
        return () => {
            document.body.removeChild(elRef.current!);
        };
    }, []);

    if (!elRef.current) return null;
    return createPortal(children, elRef.current);
}