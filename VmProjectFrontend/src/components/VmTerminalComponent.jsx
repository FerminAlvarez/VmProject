import React, { useState } from 'react';
import WebSocketConnector from '../utils/WebSocketConnector';
import InputShellComponent from './InputShellComponent';

const WEBSOCKET_URL = "ws://localhost:8000/vm/"

const VmTerminalComponent = ({ token }) => {
    const [isWebSocketConnected, setWebSocketConnected] = useState(false);
    const { webSocketMessages, sendMessage, connectWebSocket, disconnectWebSocket } = WebSocketConnector(WEBSOCKET_URL, token);

    const handleToggleWebSocketConnection = () => {
        if (isWebSocketConnected) {
            disconnectWebSocket();
            setWebSocketConnected(false);
        } else {
            connectWebSocket();
            setWebSocketConnected(true);
        }
    };

    const handleSendMessage = () => {
        sendMessage(JSON.stringify({ "command": event.target.value }))
    };

    return (
        <div>
            <h1>Vm Terminal</h1>
            <div>
                <button className={isWebSocketConnected ? "bg-red-700" : "bg-green-700"} onClick={() => handleToggleWebSocketConnection()}>
                    {isWebSocketConnected ? "Disconnect" : "Connect to VM Terminal"}
                </button>
            </div>
            {isWebSocketConnected &&
                <code className="grid grid-flow-row text-sm sm:text-base text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-4 pl-6 overflow-auto h-96">
                    {webSocketMessages.map((message, index) => (
                        message.includes('vm@vmproject:~') || message.includes('Y/n')  ?
                            <span key={index} className='whitespace-pre-wrap text-green-600 inline-flex'>{message}
                                <InputShellComponent sendMessage={handleSendMessage}/>
                            </span>
                            :
                            <span key={index} className='whitespace-pre-wrap'>{message}</span>
                            
                    ))}
                </code>
            }
        </div>
    );
};

export default VmTerminalComponent;