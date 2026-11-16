"use client";

import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext<{
    openToolbar: boolean;
    setOpenToolbar: (open: boolean) => void;
}>({
    openToolbar: false,
    setOpenToolbar: () => {},
});

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [openToolbar, setOpenToolbar] = useState(false);

    return (
        <GlobalContext.Provider value={{ openToolbar, setOpenToolbar }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => useContext(GlobalContext);
