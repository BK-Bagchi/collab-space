import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "../hooks/useAuth";

const ActiveContext = createContext();

export const ActiveProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    const newSocket = io(import.meta.env.VITE_BASE_URL, {
      transports: ["websocket"],
      reconnection: true,
    });
    setSocket(newSocket);

    newSocket.on("activeUsers", (userIds) => {
      setActiveUsers(userIds);
    });
    newSocket.on("connect", () => {
      newSocket.emit("becomeActive", { userId: user._id });
      newSocket.emit("setup", user._id);
    });

    return () => newSocket.disconnect();
  }, [user]);

  return (
    <ActiveContext.Provider value={{ socket, activeUsers }}>
      {children}
    </ActiveContext.Provider>
  );
};

export default ActiveContext;
