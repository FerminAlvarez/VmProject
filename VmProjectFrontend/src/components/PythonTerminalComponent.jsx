import React, { useState } from 'react';
import WebSocketConnector from '../utils/WebSocketConnector';
import InputShellComponent from './InputShellComponent';

const url = "ws://localhost:8000/python/"

const PythonTerminalComponent = ({ token }) => {
    const [isWebSocketConnected, setWebSocketConnected] = useState(false);
    const { webSocketMessages, sendMessage, connectWebSocket, disconnectWebSocket } = WebSocketConnector(url , token);

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
        sendMessage(JSON.stringify({ "python_command": event.target.value }))
    };


    return (
        <div>
            <h1>Python Terminal</h1>
            <div>
                <button className={isWebSocketConnected ? "bg-red-700" : "bg-green-700"} onClick={() => handleToggleWebSocketConnection()}>
                    {isWebSocketConnected ? "Disconnect" : "Connect to VM Terminal"}
                </button>
            </div>
            {isWebSocketConnected &&
                <code className="flex flex-col text-sm sm:text-base text-left items-start space-x-4 bg-gray-800 text-white rounded-lg p-4 pl-6 overflow-auto h-96">
                    {webSocketMessages.map((message, index) => (
                        message.includes('>>>') ?
                            <span key={index} className='whitespace-pre-wrap text-green-600 inline-flex w-full'>{message}
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

export default PythonTerminalComponent;