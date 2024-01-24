import { useState } from "react";

const InputShellComponent = ({sendMessage}) => {
    const [enabled, setEnabled] = useState(true)
    const [text, setText] = useState("")

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setEnabled(false)
            setText(event.target.value)
            sendMessage()
        }
    }

    return (
        enabled ? 
            <input className="caret-white bg-gray-800 focus:outline-none"autoFocus onKeyDown={handleKeyDown} />
        :
            <p>{text}</p>
    );
};

export default InputShellComponent;