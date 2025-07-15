import React, { useEffect, useRef } from "react";
import Input from "./Input";

const Chat = ({ messages, setMessages, currentChatId, saveChat }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen justify-center w-screen mx-auto p-4 pb-24 lg:pb-4 lg:ml-72 items-center">
      <div className="flex-grow w-full overflow-y-auto mb-4 space-y-3 lg:px-20 pt-10">
        {messages.length === 0 && (
          <p className="text-3xl text-center text-gray-200 mt-50">
            Start the conversation...
          </p>
        )}
        {messages.map(({ id, sender, text, loading }) => (
          <div
            key={id}
            className={`flex ${
              sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs rounded-lg p-3 ${
                sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-[#2a2d50] text-white"
              }`}
            >
              {loading ? (
                <div className="bouncing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                text
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <Input
        messages={messages}
        setMessages={setMessages}
        currentChatId={currentChatId}
        saveChat={saveChat}
      />
    </div>
  );
};

export default Chat;
