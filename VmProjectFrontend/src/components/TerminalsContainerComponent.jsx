import WindowsComponent from "./WindowsComponent";

const WEBSOCKET_URL_PYTHON = "ws://localhost:8000/python/";
const EXPECTED_TERMINATING_LINES_PYTHON = [">>>"];

const WEBSOCKET_URL_VM = "ws://localhost:8000/vm/";
const EXPECTED_TERMINATING_LINES_VM = ["vm@vmproject:", "Y/n"];

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
