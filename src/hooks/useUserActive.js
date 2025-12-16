import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useActive } from "./useActive";
import { useSettings } from "./useSettings";

const useUserActive = () => {
  const { user, loggedIn } = useAuth();
  const { activeStatus } = useSettings();
  const { socket } = useActive();

  useEffect(() => {
    if (socket && user?._id && activeStatus && loggedIn)
      socket?.emit("becomeActive", { userId: user._id });
  }, [socket, user, activeStatus, loggedIn]);
};

export default useUserActive;
