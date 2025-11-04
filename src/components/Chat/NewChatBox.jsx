import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Send, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const socket = io(import.meta.env.VITE_BASE_URL, {
  transports: ["websocket"],
  reconnection: true,
});

const NewChatBox = ({ activeChatUser, setActiveChatUser }) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sender = user?._id;
  const receiver = activeChatUser?._id;
  // console.log(sender, receiver);

  useEffect(() => {
    if (!sender || !receiver) return;

    // Register user chat session
    socket.emit("register", { sender, receiver });

    // Load old messages
    socket.on("oldMessages", (oldMsgs) => {
      setMessages(oldMsgs);
    });

    // Listen for new messages
    socket.on("newMessage", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    // Cleanup listeners when chat user changes or unmounts
    return () => {
      socket.off("oldMessages");
      socket.off("newMessage");
    };
  }, [sender, receiver]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMsg = { sender, receiver, content: message };
    socket.emit("newMessage", newMsg);
    setMessages((prev) => [...prev, newMsg]);
    setMessage("");
  };

  return (
    <div className="absolute top-0 right-0 w-96 h-[500px] bg-white border border-gray-200 shadow-lg rounded-xl flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between bg-vibrantPurple text-white px-4 py-2 rounded-t-xl">
        <div className="flex items-center gap-2">
          <img
            src={activeChatUser?.avatar}
            alt={activeChatUser?.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">{activeChatUser?.name}</span>
        </div>
        <button onClick={() => setActiveChatUser(null)}>
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === sender ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-2xl text-sm max-w-[70%] ${
                msg.sender === sender
                  ? "bg-electricBlue text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex p-2 border-t border-gray-200 gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 rounded-full border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-electricBlue text-charcoalGray"
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
