import { useEffect, useState } from "react";
import { X, MessageSquare, MessageSquareOff } from "lucide-react";
import { ChatAPI } from "../../api";
import { useAuth } from "../../hooks/useAuth";
import { useActive } from "../../hooks/useActive";
import NewChatBox from "../Chat/NewChatBox";
import Avatar from "../../assets/Default_Avatar.jpg";
import ActiveNow from "../ActiveNow/ActiveNow";
import formatTime from "../../utils/formatTime";
import Loading from "../Loading/Loading";

const Chat = ({ open, setOpen }) => {
  const { user } = useAuth();
  const { activeUsers } = useActive();
  const [activeChat, setActiveChat] = useState(null);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const res = await ChatAPI.getAllChats();
        setMessages(res.data.chats);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatMessages();
  }, []);
  // console.log(messages);

  const getUserChat = () => {
    const latestMessagesMap = new Map();
    messages.forEach((msg) => {
      if (!msg?.sender?._id || !msg?.receiver?._id) return;

      const key =
        msg.sender._id < msg.receiver._id
          ? `${msg.sender._id}-${msg.receiver._id}`
          : `${msg.receiver._id}-${msg.sender._id}`;

      const existing = latestMessagesMap.get(key);
      if (!existing || new Date(msg.createdAt) > new Date(existing.createdAt)) {
        latestMessagesMap.set(key, msg);
      }
    });

    return Array.from(latestMessagesMap.values())
      .filter((msg) => msg?.receiver && msg?.sender) // double-check before mapping
      .map((msg) => {
        const isSender = msg.sender._id === user._id;
        const chatPartner = isSender ? msg.receiver : msg.sender;

        return {
          id: msg._id,
          name: chatPartner?.name ?? "Unknown",
          avatar: chatPartner?.avatar ?? "",
          time: msg.createdAt,
          preview: msg.content,
          _id: chatPartner?._id, // partner id — used for socket/chatbox
          role: isSender ? "sender" : "receiver",
          isRead: msg?.isRead,
          isSender,
        };
      })
      .sort((a, b) => new Date(b.time) - new Date(a.time));
  };
  const chats = getUserChat();
  // console.log(chats);

  return (
    open && (
      <div className="absolute right-0 top-0 h-screen flex border-l border-gray-200 shadow-xl rounded-tl-xl rounded-bl-xl z-50 transition-all duration-300">
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
          <Loading loading={loading}>
            {chats.length > 0 ? (
              <>
                <div className="space-y-2">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setActiveChat(chat)}
                      className={`
    flex items-center gap-4 p-3 mt-3 mx-3 rounded-lg cursor-pointer 
    transition-all duration-200 shadow-sm border 
    ${
      activeChat?.id === chat.id
        ? "bg-[#EEE4F8] border-vibrantPurple shadow-md"
        : chat.isRead || chat.isSender
        ? "bg-white hover:bg-[#F4F1FA] border-transparent hover:border-gray-200"
        : "bg-vibrantPurple/10 hover:bg-vibrantPurple/20 border-vibrantPurple/40 shadow-sm border-l-4"
    }
  `}
                    >
                      {/* Avatar */}
                      <div className="relative">
                        <img
                          src={chat.avatar || Avatar}
                          alt={chat.name}
                          className="w-11 h-11 rounded-full object-cover border border-gray-200 shadow-sm"
                        />
                      </div>

                      {/* Chat Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <div className="flex items-center gap-2">
                            <h4
                              className={`font-medium text-[15px] text-charcoalGray truncate ${
                                chat.isRead
                                  ? ""
                                  : "font-semibold text-vibrantPurple"
                              }`}
                            >
                              {chat.name}
                            </h4>
                            {activeUsers.includes(chat._id) && <ActiveNow />}
                          </div>
                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {formatTime(chat.time)}
                          </span>
                        </div>

                        <p
                          className={`text-sm truncate ${
                            chat.isRead
                              ? "text-gray-600"
                              : "text-charcoalGray font-medium"
                          }`}
                        >
                          {`${chat.role === "sender" ? "You: " : ""}${
                            chat.preview || "📎 Attachment"
                          }`}
                        </p>
                      </div>

                      {/* Unread indicator */}
                      {!chat.isRead && chat.unreadCount > 0 && (
                        <span className="bg-electricBlue text-white text-xs px-2 py-0.5 rounded-full">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 py-6 text-gray-500">
                <MessageSquareOff className="w-6 h-6 text-gray-400" />
                <p className="text-sm">No messages yet</p>
              </div>
            )}
          </Loading>

          {/* Active Chat Panel */}
          {activeChat && (
            <NewChatBox
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              setMessages={setMessages}
              getUserChat={getUserChat}
            />
          )}
        </div>
      </div>
    )
  );
};

export default Chat;
