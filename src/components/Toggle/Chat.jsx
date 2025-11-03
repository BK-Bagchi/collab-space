import { X, MessageSquare } from "lucide-react";
import { useState } from "react";
import ChatBox from "../Chat/ChatBox";

const Chat = ({ open, setOpen }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");

  const chats = [
    {
      id: 1,
      name: "Debosree Bagchi",
      avatar: "/default-avatar.png",
      time: "2m ago",
      preview: "Hey! Have you checked the latest update on Collab Space?",
      messages: [
        {
          sender: "Debosree",
          text: "Hey love! Have you checked Collab Space?",
          time: "2:35 PM",
        },
        { sender: "You", text: "Not yet, doing it now 😄", time: "2:36 PM" },
      ],
    },
    {
      id: 2,
      name: "Alex Turner",
      avatar: "/default-avatar.png",
      time: "10m ago",
      preview: "Can we discuss the new design changes today?",
      messages: [
        {
          sender: "Alex",
          text: "Can we discuss the new design today?",
          time: "12:10 PM",
        },
        { sender: "You", text: "Sure! Let’s do it at 3 PM.", time: "12:12 PM" },
      ],
    },
    {
      id: 3,
      name: "Team Alpha",
      avatar: "/default-avatar.png",
      time: "1h ago",
      preview: "Project status updated. Check your dashboard.",
      messages: [
        { sender: "Team", text: "Project status updated.", time: "10:00 AM" },
        { sender: "You", text: "Nice! I'll check it out.", time: "10:05 AM" },
      ],
    },
  ];

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    setMessage("");
  };

  return (
    open && (
      <div className="absolute right-0 top-0 h-[100vh] flex border-l border-gray-200 shadow-xl rounded-tl-xl rounded-bl-xl z-50 transition-all duration-300">
        {/* Chat List Panel */}
        <div className="relative w-80 bg-softWhite border-r border-gray-200 flex flex-col rounded-tl-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-vibrantPurple text-white rounded-tl-xl w-full">
            <h3 className="font-semibold text-base flex items-center gap-2">
              <MessageSquare size={18} />
              Messages
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-full hover:bg-[#751C8E] transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-charcoalGray">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition ${
                  activeChat?.id === chat.id
                    ? "bg-[#EDE7F6]"
                    : "bg-[#F9FAFB] hover:bg-[#EDE7F6]"
                }`}
              >
                <img
                  src={chat.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-sm">{chat.name}</h4>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {chat.preview}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-softWhite px-4 py-3 text-center">
            <button
              onClick={() => setOpen(false)}
              className="text-[#2979FF] font-medium hover:underline text-sm"
            >
              View All Messages
            </button>
          </div>

          {/* Active Chat Panel */}
          {activeChat && (
            <ChatBox
              {...{
                activeChat,
                setActiveChat,
                message,
                setMessage,
                handleSendMessage,
              }}
            />
          )}
        </div>
      </div>
    )
  );
};

export default Chat;
