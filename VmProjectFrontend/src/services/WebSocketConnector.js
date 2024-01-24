import { useState, useEffect } from "react";

const WebSocketConnector = (url, token) => {
    const [webSocket, setWebSocket] = useState(null);
    const [webSocketMessages, setWebSocketMessages] = useState([]);
    const [isWebSocketConnected, setWebSocketConnected] = useState(false);

    const WEB_SOCKET_URL = `${url}?token=${encodeURIComponent("Bearer " + token)}`;

    const processWebSocketMessage = (data) => {
        // Split incoming data into an array of messages based on newline
        let newMessages = data.split(/\r\r|\n/);
        // Filter out empty and whitespace-only lines
        newMessages = newMessages.filter((line) => line.trim() !== "" && line.trim() !== "\r");
        return newMessages;
    };

    const handleWebSocketMessage = (event) => {
        setWebSocketMessages((prevMessages) => [
            ...prevMessages,
            ...processWebSocketMessage(event.data),
        ]);
    };

    const handleWebSocketClose = () => {
        setWebSocketConnected(false);
        setWebSocketMessages((prevMessages) => [...prevMessages, "Connection lost."]);
    };

    useEffect(() => {
        if (isWebSocketConnected) {
            const socket = new WebSocket(WEB_SOCKET_URL);
            socket.onmessage = (event) => handleWebSocketMessage(event);
            socket.onclose = handleWebSocketClose;

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
        setWebSocketMessages([]);
    };

    const sendMessage = (message) => {
        if (webSocket) {
            webSocket.send(message);
        }
    };

    return { webSocketMessages, connectWebSocket, disconnectWebSocket, sendMessage };
};

export default WebSocketConnector;
