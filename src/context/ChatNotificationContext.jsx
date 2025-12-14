import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useActive } from "../hooks/useActive";
import { ChatAPI } from "../api";

const ChatNotificationContext = createContext();

export const ChatNotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const { socket } = useActive();
  const [unreadChats, setUnreadChats] = useState([]);
  const [unreadChatsCount, setUnreadChatsCount] = useState(0);
  const [unreadProjectChats, setUnreadProjectChats] = useState([]);
  const [unreadProjectChatsCount, setUnreadProjectChatsCount] = useState(0);

  useEffect(() => {
    if (!user?._id || !socket) return;

    const handleUserChatNotification = (message) => {
      if (message.sender?._id === user._id) return;
      setUnreadChats((prev) => [message, ...prev]);
      setUnreadChatsCount((prev) => prev + 1);
    };

    const handleProjectChatNotification = (message) => {
      setUnreadProjectChats((prev) => [message, ...prev]);
      setUnreadProjectChatsCount((prev) => prev + 1);
    };

    socket.on("userChatNotification", handleUserChatNotification);
    socket.on("projectChatNotification", handleProjectChatNotification);

    return () => {
      socket.off("userChatNotification", handleUserChatNotification);
      socket.off("projectChatNotification", handleProjectChatNotification);
    };
  }, [user?._id, socket]);

  useEffect(() => {
    const fetchUnreadChats = async () => {
      try {
        const res = await ChatAPI.getAllUnreadChats();
        setUnreadChats(res.data.unreadChats);
        setUnreadChatsCount(res.data.unreadChatCount);
        setUnreadProjectChats(res.data.unreadProjectChats);
        setUnreadProjectChatsCount(res.data.unreadProjectChatCount);
      } catch (error) {
        console.warn(
          "Error fetching unread chats:",
          error.response.data.message
        );
      }
    };

    fetchUnreadChats();
  }, []);
  //   console.log(" unreadChats", unreadChats);
  //   console.log(" unreadChatsCount", unreadChatsCount);

  const markChatsAsRead = () => setUnreadChatsCount(0);
  const markProjectChatsAsRead = () => setUnreadProjectChatsCount(0);

  return (
    <ChatNotificationContext.Provider
      value={{
        unreadChats,
        unreadChatsCount,
        unreadProjectChats,
        unreadProjectChatsCount,
        markChatsAsRead,
        markProjectChatsAsRead,
      }}
    >
      {children}
    </ChatNotificationContext.Provider>
  );
};

export default ChatNotificationContext;
