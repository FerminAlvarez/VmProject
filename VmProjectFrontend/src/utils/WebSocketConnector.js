import { useState, useEffect } from 'react';

const WebSocketConnector = (token) => {
    const [webSocket, setWebSocket] = useState(null);
    const [webSocketMessages, setWebSocketMessages] = useState([]);
    const [isWebSocketConnected, setWebSocketConnected] = useState(false);

    const WEB_SOCKET_URL = 'ws://localhost:8000/?token=' + encodeURIComponent('Bearer ' + token);

    useEffect(() => {
        if (isWebSocketConnected) {
            const socket = new WebSocket(WEB_SOCKET_URL);

            socket.onopen = () => {
                console.log('WebSocket abierto');
            };

            socket.onmessage = (event) => {
                console.log(event.data);
                setWebSocketMessages((prevMessages) => [...prevMessages, event.data]);
            };

            socket.onclose = () => {
                console.log('WebSocket cerrado');
                setWebSocketConnected(false);
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
