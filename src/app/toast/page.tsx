"use client";

import Button from "@ui/button/Button";
import { useToast } from "@ui/toast/Toast.context";

export default function ToastPage() {
    const toast = useToast();

    const handleClickSuccess = () => {
        toast.success("This is a success toast!");
    };

    const handleClickError = () => {
        toast.error("This is an error toast!");
    };

    const handleClickInfo = () => {
        toast.info("This is an info toast!");
    };

    const handleClickWarning = () => {
        toast.warning("This is a warning toast!");
    };

    const handleClickSuccess1000 = () => {
        toast.success("This is a success toast of 1000ms!", { duration: 1000 });
    };

    const handleClickError5000 = () => {
        toast.error("This is an error toast of 5000ms!", { duration: 5000 });
    };

    const handleClickInfo0 = () => {
        toast.info("This is an info toast that will remain forever!", {
            duration: 0,
        });
    };

    const handleClickButton = () => {
        toast.info(
            <>
                <span>More toast</span>
                <Button
                    variant="danger"
                    onClick={() => {
                        toast.success("This is a success toast!");
                    }}
                >
                    Success
                </Button>
            </>,
            {
                duration: 0,
            },
        );
    };
    return (
        <main>
            <h1>Toast</h1>
            <p>
                A toast allows the user to send a message to the user. If the
                user hover or the focus is in the toast, than the toast will not
                disappear.
            </p>
            <div className="code-view">
                <Button onClick={handleClickSuccess}>Success</Button>
                <Button onClick={handleClickError}>Error</Button>
                <Button onClick={handleClickInfo}>Info</Button>
                <Button onClick={handleClickWarning}>Warning</Button>
            </div>
            <h2>Control time</h2>
            <p>You can control the time the toast last. It can last forever!</p>
            <div className="code-view">
                <Button onClick={handleClickSuccess1000}>1 seconde</Button>
                <Button onClick={handleClickError5000}>5 secondes</Button>
                <Button onClick={handleClickInfo0}>Forever</Button>
            </div>
            <h2>Allow JSX props</h2>
            <p>You can put whatever you want in the toast</p>
            <div className="code-view">
                <Button onClick={handleClickButton}>A button in a toast</Button>
            </div>
            <h2>Other global props</h2>
            <p>
                You can control the position of the toast, the exit duration and
                the number of toasts that can be displayed at the same time.
                <br />
                These elements can but put on the provider but not in the toast
                itself, so it will be the same for all the toasts.
            </p>
        </main>
    );
}
