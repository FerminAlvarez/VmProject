import React, { useState } from "react";
import WebSocketConnector from "../services/WebSocketConnector";
import ShellComponent from "./Shell/ShellComponent";

const WindowsComponent = ({ token, title, WEBSOCKET_URL, EXPECTED_TERMINATING_LINES }) => {
    const [isWebSocketConnected, setWebSocketConnected] = useState(false);
    const { webSocketMessages, sendMessage, connectWebSocket, disconnectWebSocket } =
        WebSocketConnector(WEBSOCKET_URL, token);

    const handleToggleWebSocketConnection = () => {
        if (isWebSocketConnected) {
            disconnectWebSocket();
            setWebSocketConnected(false);
        } else {
            connectWebSocket();
            setWebSocketConnected(true);
        }
    };

    const handleSendMessage = (message) => {
        sendMessage(JSON.stringify({ command: message }));
    };

    return (
        <div>
            <h1>{title}</h1>
            <div>
                <button
                    className={isWebSocketConnected ? "bg-red-700" : "bg-green-700"}
                    onClick={() => handleToggleWebSocketConnection()}
                >
                    {isWebSocketConnected ? "Disconnect" : "Connect to VM Terminal"}
                </button>
            </div>
            {isWebSocketConnected && (
                <ShellComponent
                    EXPECTED_TERMINATING_LINES={EXPECTED_TERMINATING_LINES}
                    messages={webSocketMessages}
                    handleSendMessage={handleSendMessage}
                />
            )}
        </div>
    );
};

export default WindowsComponent;
