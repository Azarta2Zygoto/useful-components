"use client";

import React, { useEffect, useRef, JSX } from 'react';
import { createPortal } from 'react-dom';

export default function BodyAccess({
    children,
    parent,
}: { children: React.ReactNode, parent?: HTMLElement | null }): JSX.Element | null {
    // Ne pas accéder à `document` directement sur le serveur
    const elRef = useRef<HTMLDivElement | null>(
        typeof document !== "undefined" ? document.createElement('div') : null
    );

    useEffect(() => {
        // Si on est côté client et que l'élément n'existe pas encore, le créer
        if (!elRef.current) {
            elRef.current = document.createElement('div');
        }
        const el = elRef.current!;
        document.body.appendChild(el);
        return () => {
            document.body.removeChild(el);
        };
    }, []);

    if (!elRef.current) return null; // sécurité pour SSR
    return createPortal(children, parent??elRef.current);
}