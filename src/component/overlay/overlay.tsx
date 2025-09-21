import React, { useEffect, useRef, JSX } from 'react';
import BodyAccess from '@/component/utils/bodyAccess';
import './overlay.css';

interface OverlayProps {
    open?: boolean;
    id?: string;
    color?: string;
    tobody?: boolean;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onClose: () => void;
}

export default function Overlay({
    id,
    style,
    color = "rgba(0, 0, 0, 0.5)",
    open=true,
    tobody,
    children,
    onClose
}: OverlayProps): JSX.Element {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const overlay = overlayRef.current;
        if (!overlay) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (event.target !== overlay) return;
            event.preventDefault();
            onClose();
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const overlay = (
        <div
            id={id}
            className={`overlay ${open ? 'open' : 'closed'}`}
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-hidden={!open}
            style={{
                ...style,
                display: open ? 'block' : 'none',
                backgroundColor: color
            }}
            onKeyDown={(e) => {
                if (e.key === 'Escape') {
                    onClose();
                }
            }}
            tabIndex={-1}>
                {children}
        </div>
    );
    return tobody ? <BodyAccess>{overlay}</BodyAccess> : overlay;
}