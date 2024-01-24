import WindowsComponent from "./WindowsComponent";

const WEBSOCKET_URL_VM = import.meta.env.VITE_WEBSOCKET_URL_VM;
const WEBSOCKET_URL_PYTHON = import.meta.env.VITE_WEBSOCKET_URL_PYTHON;

const EXPECTED_TERMINATING_LINES_VM = ["vm@vmproject:", "Y/n"];
const EXPECTED_TERMINATING_LINES_PYTHON = [">>>"];

const TerminalsContainerComponent = ({ token }) => {
    return (
        <div className="flex justify-center w-screen">
            <div className="w-1/2 mx-16">
                {
                    <WindowsComponent
                        token={token}
                        title={"VM Terminal"}
                        WEBSOCKET_URL={WEBSOCKET_URL_VM}
                        EXPECTED_TERMINATING_LINES={EXPECTED_TERMINATING_LINES_VM}
                    />
                }
            </div>
            <div className="w-1/2 mx-16">
                {
                    <WindowsComponent
                        token={token}
                        title={"Python Terminal"}
                        WEBSOCKET_URL={WEBSOCKET_URL_PYTHON}
                        EXPECTED_TERMINATING_LINES={EXPECTED_TERMINATING_LINES_PYTHON}
                    />
                }
            </div>
        </div>
    );
};
export default TerminalsContainerComponent;
