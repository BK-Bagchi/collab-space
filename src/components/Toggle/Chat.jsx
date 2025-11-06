import { X, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { ChatAPI } from "../../api";
import { useAuth } from "../../hooks/useAuth";
import { useActive } from "../../hooks/useActive";
import NewChatBox from "../Chat/NewChatBox";
import Avatar from "../../assets/Default_Avatar.jpg";
import ActiveNow from "../ActiveNow/ActiveNow";
import formatTime from "../../utils/formatTime";

const Chat = ({ open, setOpen }) => {
  const { user } = useAuth();
  const { activeUsers } = useActive();
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const res = await ChatAPI.getAllChats();
        setMessages(res.data.chats);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchChatMessages();
  }, []);
  // console.log(messages);

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

  const chats = Array.from(latestMessagesMap.values())
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
      };
    })
    .sort((a, b) => new Date(b.time) - new Date(a.time));

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
          {messages.length > 0 ? (
            <>
              <div className="space-y-2">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setActiveChatUser(chat)}
                    className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 shadow-sm border border-transparent ${
                      activeChatUser?.id === chat.id
                        ? "bg-[#EEE4F8] border-vibrantPurple shadow-md"
                        : "bg-white hover:bg-[#F4F1FA] hover:border-gray-200"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative">
                      <img
                        src={chat.avatar || Avatar}
                        alt={chat.name}
                        className="w-11 h-11 rounded-full object-cover border border-gray-200 shadow-sm"
                      />
                      {chat.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>

                    {/* Chat Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-[15px] text-charcoalGray truncate">
                            {chat.name}
                          </h4>
                          {activeUsers.includes(chat._id) && <ActiveNow />}
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {formatTime(chat.time)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {chat.role === "sender"
                          ? "You: " + chat.preview
                          : chat.preview}
                      </p>
                    </div>

                    {/* Unread indicator */}
                    {chat.unreadCount > 0 && (
                      <span className="bg-electricBlue text-white text-xs px-2 py-[2px] rounded-full">
                        {chat.unreadCount}
                      </span>
                    )}
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
            </>
          ) : (
            <div className="text-center py-4 text-sm text-gray-500">
              No Messages
            </div>
          )}
          {/* Active Chat Panel */}
          {activeChatUser && (
            <NewChatBox
              activeChatUser={activeChatUser}
              setActiveChatUser={setActiveChatUser}
            />
          )}
        </div>
      </div>
    )
  );
};

export default Chat;
