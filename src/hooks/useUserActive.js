import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useActive } from "./useActive";

const useUserActive = () => {
  const { user, loggedIn } = useAuth();
  const { socket } = useActive();

  useEffect(() => {
    if (socket && user?._id && loggedIn)
      socket?.emit("becomeActive", { userId: user._id });
  }, [socket, user, loggedIn]);
};

export default useUserActive;
