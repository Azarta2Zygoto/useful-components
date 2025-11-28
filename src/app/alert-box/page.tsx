"use client";

import { useState } from "react";

import AlertBox from "@/components/alertBox/alertBox";
import MenuSelect from "@/components/menuSelect/menuSelect";
import { InfoComponent } from "@/self/moreInfo";

const positionsList = [
    "top",
    "bottom",
    "left",
    "right",
    "center",
    "top left",
    "top right",
    "bottom left",
    "bottom right",
] as const;

export default function AlertBoxPage() {
    const [visible, setVisible] = useState(true);
    const [error, setError] = useState<-1 | 0 | 1 | 2>(1);
    const [position, setPosition] =
        useState<(typeof positionsList)[number]>("bottom left");
    const [alertType, setAlertType] = useState<"default" | "compact">(
        "default",
    );
    const [getInformation, setGetInformation] = useState(false);

    function handleErrorChange(value: string) {
        switch (value) {
            case "Dev Error":
                setError(-1);
                return;
            case "Error":
                setError(0);
                return;
            case "Success":
                setError(1);
                return;
            case "Warning":
                setError(2);
                return;
            default:
                setError(1);
                return;
        }
    }

    function modifyValue(value: number) {
        switch (value) {
            case -1:
                return "Dev Error";
            case 0:
                return "Error";
            case 1:
                return "Success";
            case 2:
                return "Warning";
            default:
                return "Success";
        }
    }

    return (
        <main>
            <h1>Alert box</h1>
            <p>
                An alert box permits to let the user know about an error, a
                warning or a success.
                <br />
                The alert box has automatically a button to close it, it is
                posible to not provide it
            </p>

            <h2>Basic select menu</h2>
            <div className="inner-component">
                <button
                    type="button"
                    className="button"
                    onClick={() => setVisible(!visible)}
                >
                    {visible ? "Hide Alert Box" : "Show Alert Box"}
                </button>
            </div>

            <h2>Types</h2>
            <p>There is four different types possible</p>
            <ul>
                <li>Dev error</li>
                <li>Error</li>
                <li>Success</li>
                <li>Warning</li>
            </ul>
            <div className="inner-component">
                <MenuSelect
                    id="error-select-type"
                    label="Select Position"
                    selectedOption={modifyValue(error)}
                    floatingLabel
                    onSelect={(value) => handleErrorChange(value)}
                    backgroundColor="var(--bg2)"
                    style={{ width: "150px" }}
                    options={["Dev Error", "Error", "Success", "Warning"]}
                />
            </div>
            <InfoComponent>
                The Dev Error put automatically the contact button in the alert
                box to let the user contact you if needed.
            </InfoComponent>

            <h2>Get information</h2>
            <p>
                It is possible to add a button to let user get further
                information.
            </p>
            <div className="inner-component">
                {getInformation && (
                    <InfoComponent>
                        You can add a button to let user get further
                        information. You can use it to explain the error or give
                        more details about the success.
                    </InfoComponent>
                )}
            </div>

            <h2>Position</h2>
            <p>
                It is possible to place the component at 9 different positions
            </p>
            <div className="inner-component">
                <MenuSelect
                    id="error-select-position"
                    label="Select Position"
                    selectedOption={position}
                    floatingLabel
                    backgroundColor="var(--bg2)"
                    onSelect={(value) =>
                        setPosition(
                            value as unknown as (typeof positionsList)[number],
                        )
                    }
                    options={positionsList as unknown as string[]}
                />
            </div>

            <h2>Variant</h2>
            <p>
                The alert box can have two different views : default and
                compact.
            </p>
            <div className="inner-component">
                <MenuSelect
                    id={"alert-type-select"}
                    label="Select variant"
                    selectedOption={alertType}
                    floatingLabel
                    backgroundColor="var(--bg2)"
                    onSelect={(value) =>
                        setAlertType(value as "default" | "compact")
                    }
                    options={["default", "compact"]}
                    style={{ width: "150px" }}
                />
            </div>
            <h2>Other options</h2>
            <p>
                You can also add a custom message, change the z-index, the
                visibility, the style, and so on.
            </p>
            <AlertBox
                error={error}
                position={position}
                message={"This is an alert box message."}
                visible={visible}
                view={alertType}
                onClose={() => setVisible(false)}
                onInfo={() => setGetInformation(!getInformation)}
                onContact={() => alert("Contacting support...")}
            />
        </main>
    );
}
