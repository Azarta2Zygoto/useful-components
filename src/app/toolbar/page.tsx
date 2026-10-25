"use client";

import React, { JSX } from "react";

import Toolbar from "@/components/ui/toolbar/Toolbar";
import toolbarJSON from "@/data/toolbar.json";

export default function ToolbarPage(): JSX.Element {
    return (
        <main>
            <h1>Toolbar</h1>
            <p>
                A toolbar allows the user to have access to a panel of tools.
                This is also used has a way of navigating throught pages.
            </p>
            <h2>Basic toolbar</h2>
            <p>
                The toolbar can be opened or close and you can have sub tools.
            </p>
            <div className="inner-component">
                <Toolbar toolbarData={toolbarJSON.toolbar} />
            </div>
            <h2>Close or open only</h2>
            <p>
                If you don&apos;t want it to be close or open, you can prevent
                this functionnality or you can control it from outside the
                component.
            </p>
            <div className="inner-component">
                <Toolbar
                    toolbarData={toolbarJSON.toolbar}
                    innerChange={false}
                />
                <Toolbar
                    toolbarData={toolbarJSON.toolbar}
                    isActiveDefault={true}
                    innerChange={false}
                />
            </div>
            <h2>Elements</h2>
            <p>You can put outside element on and under the navigation bar.</p>
            <div className="inner-component">
                <Toolbar
                    toolbarData={toolbarJSON.toolbar}
                    isActiveDefault={true}
                    innerChange={false}
                >
                    <div
                        style={{
                            padding: "10px",
                            borderBottom: "1px solid #ccc",
                        }}
                    >
                        I am an element on the toolbar
                    </div>
                </Toolbar>
                <Toolbar
                    toolbarData={toolbarJSON.toolbar}
                    isActiveDefault={true}
                    innerChange={false}
                    underChildren={
                        <div
                            style={{
                                padding: "10px",
                                borderTop: "1px solid #ccc",
                            }}
                        >
                            I am an element under the toolbar
                        </div>
                    }
                />
            </div>
            <h2>Menu</h2>
            <p>You can also have a menu toolbar. But that is coming soon.</p>
        </main>
    );
}
