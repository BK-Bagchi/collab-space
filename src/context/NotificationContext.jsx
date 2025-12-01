import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useActive } from "../hooks/useActive";
import { NotificationAPI } from "../api";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const { socket } = useActive();
  const [notification, setNotification] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!user?._id || !socket) return;

    const handler = (notification) => {
      setNotification(notification[0]);
      setUnread((prev) => prev + 1);
    };

    socket.on("notification", handler);

    return () => socket.off("notification", handler);
  }, [user, socket]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await NotificationAPI.getNotifications();
        setNotifications(res.data.notifications);
      } catch (error) {
        console.warn(
          "Error fetching notifications:",
          error.response.data.message
        );
      }
    };

    fetchNotifications();
  }, []);
  // console.log(notifications);
  useEffect(() => {
    const unreadNotifications = notifications.filter((n) => n.read === false);
    setUnread(unreadNotifications.length);
  }, [notifications]);

  const markAsRead = () => setUnread(0);

  return (
    <NotificationContext.Provider value={{ notification, unread, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
