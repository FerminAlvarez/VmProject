import { useState } from "react";

const InputShellComponent = ({ sendMessage }) => {
    const [inputEnabled, setInputEnabled] = useState(true);
    const [inputText, setInputText] = useState("");

    const handleEnterKey = (event) => {
        if (event.key === "Enter") {
            setInputEnabled(false);
            setInputText(event.target.value);
            sendMessage(event.target.value);
        }
    };

    const renderInput = () => (
        <input
            className="caret-white bg-gray-800 focus:outline-none w-full"
            autoFocus
            onKeyDown={handleEnterKey}
        />
    );

    const renderText = () => <p>{inputText}</p>;

    return inputEnabled ? renderInput() : renderText();
};

export default InputShellComponent;
