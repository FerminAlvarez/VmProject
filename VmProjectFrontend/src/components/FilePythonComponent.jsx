import React, { useState } from "react";
import PythonHttpService from "../services/PythonHttpService";
import ShellViewerComponent from "./Shell/ShellViewerComponent";

const FilePythonComponent = ({ token }) => {
    const [file, setFile] = useState(null);
    const { sendFile } = PythonHttpService();
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleOutput = (newMessages) => {
        setMessages((prevMessages) => [...prevMessages, ...newMessages.output]);
    };

    const handleUpload = async () => {
        try {
            setMessages([]);
            setIsLoading(true);
            const newMessages = await sendFile(file, token);
            handleOutput(newMessages);
        } catch (error) {
            console.error("Error en la carga del archivo:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-items-center">
            <input type="file" onChange={handleFileChange} />
            {file && (
                <button onClick={handleUpload} disabled={isLoading}>
                    {isLoading ? "Cargando..." : "Ejecutar"}
                </button>
            )}

            <ShellViewerComponent messages={messages} />
        </div>
    );
};

export default FilePythonComponent;
