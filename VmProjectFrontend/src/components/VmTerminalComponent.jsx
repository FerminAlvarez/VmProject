import { useState, useEffect } from 'react';
export default function VmTerminalComponent({ token }) {
    const [webSocket, setWebSocket] = useState(null);
    const [webSocketMessages, setWebSocketMessages] = useState('');

    const websocketUrl = 'ws://localhost:8000/?token=' + encodeURIComponent('Bearer ' + token);

    useEffect(() => {
        const socket = new WebSocket(websocketUrl);

        socket.onopen = () => {
            console.log('WebSocket abierto');
        };

        socket.onmessage = (event) => {
            console.log(event.data)
            setWebSocketMessages((prevMessages) => [...prevMessages, event.data]);
        };

        socket.onclose = () => {
            console.log('WebSocket cerrado');
        };

        setWebSocket(socket);

        return () => {
            if (webSocket) {
                webSocket.close();
            }
        };
    }, []);

    const sendMessage = (message) => {
        if (webSocket) {
            webSocket.send(message);
        }
    };

    return (
        <div>
            <h1>Vm Terminal</h1>
            <button onClick={() => sendMessage(JSON.stringify({ "command": "sudo apt-get install python3" }))}>Enviar Mensaje</button>
            <div>
                <ul>
                    {webSocketMessages && webSocketMessages.map((message, index) => (
                        <li key={index} style={{ whiteSpace: 'pre-wrap' }}>{message}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}