import { useState, useEffect } from 'react';

const WebSocketConnector = (url, token) => {
    const [webSocket, setWebSocket] = useState(null);
    const [webSocketMessages, setWebSocketMessages] = useState([]);
    const [isWebSocketConnected, setWebSocketConnected] = useState(false);

    const WEB_SOCKET_URL = url + '?token=' + encodeURIComponent('Bearer ' + token);

    useEffect(() => {
        if (isWebSocketConnected) {
            const socket = new WebSocket(WEB_SOCKET_URL);

            socket.onopen = () => {
                console.log('WebSocket abierto');
            };

            socket.onmessage = (event) => {
                let newMessages = event.data.split(/\r\r|\n/);
                newMessages = newMessages.filter(line => line.trim() !== '' && line.trim() !== '\r');
                setWebSocketMessages((prevMessages) => [...prevMessages,...newMessages]);
            };

            socket.onclose = () => {
                setWebSocketConnected(false);
                setWebSocketMessages((prevMessages) => [...prevMessages, "Connection lost."]);
            };

            setWebSocket(socket);
        } else {
            if (webSocket) {
                webSocket.close();
            }
        }

        return () => {
            if (webSocket) {
                webSocket.close();
            }
        };
    }, [WEB_SOCKET_URL, isWebSocketConnected]);

    const connectWebSocket = () => {
        setWebSocketConnected(true);
    };

    const disconnectWebSocket = () => {
        setWebSocketConnected(false);
        setWebSocketMessages([])
    };

    const sendMessage = (message) => {
        if (webSocket) {
            webSocket.send(message);
        }
    };

    return { webSocket, webSocketMessages, connectWebSocket, disconnectWebSocket, sendMessage };
};

export default WebSocketConnector;
