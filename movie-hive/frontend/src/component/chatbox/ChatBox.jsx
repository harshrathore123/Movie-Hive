import React, { useState, useEffect, useRef } from "react";
import useAskAi from "../../hooks/chatbot/useAskAi";
import ReactMarkdown from 'react-markdown';

export default function ChatBox() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useAskAi();
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-screen container pb-5">
      {/* Header */}
      <div className="txt p-4 text-center font-bold text-2xl">Hive Bot</div>

      {/* Subheading */}
      <div className="txt p-2 text-center text-lg text-gray-500">
        Got a question about movies or series? Ask the Hive Bot!
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((element, id) => (
          <div
            key={id}
            className={`p-3 rounded-lg max-w-xs ${element.sender === "me"
                ? "bg-purple-500 text-white self-end ml-auto"
                : "bg-gray-300 text-black"
              }`}
          >
            <ReactMarkdown>{element.text}</ReactMarkdown>
          </div>
        ))}
        {isLoading && (
          <div className="p-3 rounded-lg max-w-xs bg-gray-300 text-black">
            Generating...
          </div>
        )}
        {/* Invisible div to ensure scroll to bottom */}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Field */}
      <div className="p-4 border-t flex items-center">
        <input
          type="text"
          className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" && sendMessage(input, setInput)
          }
        />
        <button
          onClick={() => sendMessage(input, setInput)}
          className="ml-2 button text-white px-4 py-2 rounded-lg"
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
