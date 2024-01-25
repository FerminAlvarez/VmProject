const ShellViewerComponent = ({ messages }) => {
    return (
        <>
            {messages && (
                <code className="flex flex-col text-sm sm:text-base text-left items-start bg-gray-800 text-white rounded-lg p-4 pl-6 overflow-auto h-96">
                    {messages.map((message, index) => (
                        <span key={index} className="whitespace-pre-wrap">
                            {message}
                        </span>
                    ))}
                </code>
            )}
        </>
    );
};
export default ShellViewerComponent;
