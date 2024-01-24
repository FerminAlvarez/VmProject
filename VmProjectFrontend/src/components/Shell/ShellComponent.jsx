import InputShellComponent from "./InputShellComponent";

const ShellComponent = ({ EXPECTED_TERMINATING_LINES, messages, handleSendMessage }) => {
    const includesExpectedTerminatingLine = (str) =>
        EXPECTED_TERMINATING_LINES.some((value) => str.includes(value));

    return (
        <code className="flex flex-col text-sm sm:text-base text-left items-start bg-gray-800 text-white rounded-lg p-4 pl-6 overflow-auto h-96">
            {messages.map((message, index) =>
                includesExpectedTerminatingLine(message) ? (
                    <span
                        key={index}
                        className="whitespace-pre-wrap text-green-600 inline-flex w-full"
                    >
                        {message}
                        <InputShellComponent sendMessage={handleSendMessage} />
                    </span>
                ) : (
                    <span key={index} className="whitespace-pre-wrap">
                        {message}
                    </span>
                )
            )}
        </code>
    );
};
export default ShellComponent;
