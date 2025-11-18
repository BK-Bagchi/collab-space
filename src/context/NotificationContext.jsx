import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { useActive } from "../hooks/useActive";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const { socket } = useActive();
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!user?._id || !socket) return;

    const handler = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnread((prev) => prev + 1);
      toast(notification.message, { icon: "🔔" });
    };

    socket.on("notification", handler);

    return () => socket.off("notification", handler);
  }, [user, socket]);

  const markAsRead = () => setUnread(0);

  return (
    <NotificationContext.Provider value={{ notifications, unread, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
