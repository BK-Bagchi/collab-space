import React, { useState } from "react";
import { Send, X } from "lucide-react";

const NewChatBox = ({
  activeChat,
  setActiveChat,
  messages,
  handleSendMessage,
}) => {
  const [input, setInput] = useState("");
  //   const messagesEndRef = useRef();

  const sendMessage = () => {
    if (!input.trim()) return;
    handleSendMessage(input);
    setInput("");
  };

  return (
    <div className="absolute top-0 right-0 w-100 h-[500px] bg-white border border-gray-200 shadow-lg rounded-xl flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between bg-vibrantPurple text-white px-4 py-2 rounded-t-xl">
        <div className="flex items-center gap-2">
          <img
            src={activeChat.avatar}
            alt={activeChat.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">{activeChat.name}</span>
        </div>
        <button onClick={() => setActiveChat(null)}>
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-2xl text-sm max-w-[70%] ${
                msg.sender === "You"
                  ? "bg-electricBlue text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-[10px] block text-gray-400 mt-1">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex p-2 border-t border-gray-200 gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 rounded-full border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-electricBlue"
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-electricBlue text-white rounded-full hover:bg-[#1E63D1] transition"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default NewChatBox;
