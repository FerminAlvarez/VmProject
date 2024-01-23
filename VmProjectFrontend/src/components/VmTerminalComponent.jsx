import React, { useState } from 'react';
import WebSocketConnector from '../utils/WebSocketConnector';

const VmTerminalComponent = ({ token }) => {
    const [isWebSocketConnected, setWebSocketConnected] = useState(false);
    const { webSocketMessages, sendMessage, connectWebSocket, disconnectWebSocket } = WebSocketConnector(token);

    const handleToggleWebSocketConnection = () => {
        if (isWebSocketConnected) {
            disconnectWebSocket();
            setWebSocketConnected(false);
        } else {
            connectWebSocket();
            setWebSocketConnected(true);
        }
    };

    return (
        <div>
            <h1>Vm Terminal</h1>
            <button onClick={() => handleToggleWebSocketConnection()}>{isWebSocketConnected ? "Disconnect" : "Connect to VM Terminal"}</button>
            <button onClick={() => sendMessage(JSON.stringify({ "command": "sudo apt-get install python3" }))}>Enviar Mensaje</button>
            <div>
                <ul>
                    {webSocketMessages && webSocketMessages.map((message, index) => (
                        <li key={index} style={{ whiteSpace: 'pre-wrap' }}>{message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VmTerminalComponent;