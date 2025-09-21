"use client"

import React, { createContext, useState, useContext, useEffect } from "react";

const GlobalContext = createContext<{
    openToolbar: boolean;
    width: number;
    setOpenToolbar: (open: boolean) => void;
    setWidth: (width: number) => void;
}>({
    openToolbar: false,
    width: 250,
    setOpenToolbar: () => {},
    setWidth: () => {}
});

export const GlobalProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [openToolbar, setOpenToolbar] = useState(false);
    const [width, setWidth] = useState(250);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <GlobalContext.Provider value={{ openToolbar, setOpenToolbar,
                                        width, setWidth
                                        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => useContext(GlobalContext);