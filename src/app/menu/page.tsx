"use client";

import { useRef, useState } from "react";

import Menu from "@/components/menu/menu";

export default function MenuPage() {
    const parentRef = useRef<HTMLButtonElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuData = [
        { icon: "🏠", name: "Home", shortcut: "Ctrl+H" },
        { icon: "🔍", name: "Search", shortcut: "Ctrl+F" },
        { icon: "⚙️", name: "Settings", shortcut: "Ctrl+S" },
        { icon: "🚪", name: "---", shortcut: "Ctrl+L" },
        {
            icon: "❓",
            name: "Help",
            shortcut: "F1",
            subItems: [
                { name: "Documentation" },
                { name: "Support" },
                { name: "Feedback" },
            ],
        },
        { icon: "🚪", name: "Logout", shortcut: "Ctrl+L" },
    ];

    const handleSelect = () => {
        setMenuOpen(false);
    };

    return (
        <main>
            <h1>Menu Component</h1>
            <button
                className="button"
                style={{ position: "relative" }}
                ref={parentRef}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? "Close Menu" : "Open Menu"}
                <Menu
                    data={menuData}
                    isOpen={menuOpen}
                    parentRef={parentRef}
                    openType="onClick"
                    variant="standard"
                    onSelect={handleSelect}
                    className="custom-menu"
                />
            </button>
        </main>
    );
}
