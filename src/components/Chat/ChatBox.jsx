import { Send, X } from "lucide-react";
import React from "react";

const ChatBox = ({
  activeChat,
  setActiveChat,
  message,
  setMessage,
  handleSendMessage,
}) => {
  return (
    <div className="absolute right-full top-0 h-[80vh] w-[380px] mr-2 bg-white flex flex-col border-l border-gray-200 rounded-tl-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-vibrantPurple text-white rounded-tl-xl">
        <div className="flex items-center gap-3">
          <img
            src={activeChat.avatar}
            alt="Avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <h4 className="font-medium text-sm">{activeChat.name}</h4>
            <span className="text-xs text-gray-500">{activeChat.time}</span>
          </div>
        </div>
        <button
          onClick={() => setActiveChat(null)}
          className="p-1 rounded-full hover:bg-[#E1BEE7] transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAFAFA]">
        {activeChat.messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                msg.sender === "You"
                  ? "bg-electricBlue text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-[10px] text-gray-300 block mt-1">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-3 bg-white flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-electricBlue focus:border-transparent"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-electricBlue text-white rounded-full hover:bg-[#1E63D1] transition"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
