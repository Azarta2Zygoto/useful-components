import React, { useEffect, useRef, JSX } from 'react';
import { createPortal } from 'react-dom';

export default function BodyAccess({
    children
}: { children: React.ReactNode }):JSX.Element|null {
    const elRef = useRef<HTMLDivElement>(document.createElement('div'));

    useEffect(() => {
        const el = elRef.current;
        
        document.body.appendChild(el);
        return () => {
            document.body.removeChild(el);
        };
    }, []);
    
    return createPortal(children, elRef.current);
}