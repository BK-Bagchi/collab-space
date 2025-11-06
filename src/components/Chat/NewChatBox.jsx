import React, { useEffect, useState } from "react";
import { Send, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useActive } from "../../hooks/useActive";
import Avatar from "../../assets/Default_Avatar.jpg";
import ActiveNow from "../ActiveNow/ActiveNow";
import formatTime from "../../utils/formatTime";

const NewChatBox = ({ activeChatUser, setActiveChatUser }) => {
  const { user } = useAuth();
  const { socket, activeUsers } = useActive();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sender, receiver] = [user._id, activeChatUser._id];
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

    socket.on("typing", ({ sender: typingUserId }) => {
      if (typingUserId === receiver) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }
    });

    // Cleanup listeners when chat user changes or unmounts
    return () => {
      socket.off("oldMessages");
      socket.off("newMessage");
      socket.off("typing");
    };
  }, [socket, sender, receiver]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMsg = { sender, receiver, content: message };
    socket.emit("newMessage", newMsg);
    // setMessages((prev) => [...prev, newMsg]);
    setMessage("");
  };

  let debounce;
  const handleTyping = (e) => {
    setMessage(e.target.value);

    clearTimeout(debounce);
    debounce = setTimeout(() => {
      socket.emit("typing", { sender, receiver });
    }, 500);
  };

  return (
    <div className="absolute top-0 right-0 w-96 h-[500px] bg-white border border-gray-200 shadow-lg rounded-xl flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between bg-vibrantPurple text-white px-4 py-2 rounded-t-xl">
        <div className="flex items-center gap-2">
          <img
            src={activeChatUser?.avatar || Avatar}
            alt={activeChatUser?.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">{activeChatUser?.name}</span>
          {activeUsers.includes(activeChatUser._id) && <ActiveNow />}
          {isTyping && (
            <span className="text-xs text-white/80 mt-0.5">typing...</span>
          )}
        </div>
        <button onClick={() => setActiveChatUser(null)}>
          <X size={16} />
        </button>
      </div>

      {/* Message Bubble */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
        {messages.map((msg, i) => {
          const isSender = msg.sender === sender;
          // console.log(msg);
          return (
            <div
              key={i}
              className={`flex items-end gap-2 ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar (only for others, optional) */}
              {!isSender && (
                <img
                  src={activeChatUser?.avatar || Avatar}
                  alt={msg.senderName || "User"}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}

              {/* Message and time */}
              <div className="flex flex-col max-w-[70%]">
                <div
                  className={`px-4 py-2 rounded-2xl shadow-sm text-sm ${
                    isSender
                      ? "bg-electricBlue text-white rounded-br-none self-end"
                      : "bg-white text-charcoalGray rounded-bl-none"
                  }`}
                >
                  <p>{msg.content}</p>
                </div>

                {/* Time below bubble */}
                <div
                  className={`text-[10px] text-gray-400 mt-1 ${
                    isSender ? "text-right" : "text-left"
                  }`}
                >
                  {msg.createdAt ? formatTime(msg.createdAt) : ""}
                </div>
              </div>

              {/* Avatar for sender (optional) */}
              {isSender && (
                <img
                  src={user?.avatar || Avatar}
                  alt="You"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex p-2 border-t border-gray-200 gap-2">
        <input
          type="text"
          value={message}
          onChange={handleTyping}
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
