"use client";

import React, { JSX } from "react";
import Toolbar from "@/component/toolbar/toolbar";
import toolbarJSON from "@/data/toolbar.json";

export default function ToolbarPage():JSX.Element {
    return (
        <main>
            <h1>Toolbar</h1>
            <Toolbar
                toolbarData={toolbarJSON.toolbar}
                isActive={true} 
                tooltip={true}
                type="expand"
                text={{fermer: "Fermer le menu", ouvrir: "Ouvrir le menu"}}
                displayName={(name) => {
                    if (name === "accueil") return "Accueil";
                    if (name === "a-propos") return "À propos";
                    if (name === "contact") return "Contact";
                    return name.charAt(0).toUpperCase() + name.slice(1);
                }
                }
                getPath={(path, subPath) => {
                    console.log("Path:", path);
                    console.log("SubPath:", subPath);
                }}
                getActive={(active) => {
                    console.log("Active:", active);
                }}
            />
            <Toolbar
                toolbarData={toolbarJSON.toolbar}
                isActive={true} 
                type="expand"
                innerChange={false}
                underChildren={
                    <div className="component-box">
                        <p>This is an under child element inside the Toolbar.</p>
                    </div>
                }
            >
                <div className="component-box">
                    <p>This is a child element inside the Toolbar.</p>
                </div>
            </Toolbar>
        </main>
    );
}
