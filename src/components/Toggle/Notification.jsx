import React, { useEffect, useState } from "react";
import { BellOff, X } from "lucide-react";
import { NotificationAPI } from "../../api";
import { formatDateWithTime } from "../../utils/dateFormater";
import { useNotification } from "../../hooks/useNotification";

const Notification = ({ open, setOpen }) => {
  const { notification } = useNotification();
  const [notifications, setNotifications] = useState([]);

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
  // console.log(notification);
  // console.log(notifications);

  useEffect(() => {
    if (notification._id) {
      setNotifications((prev) => {
        const alreadyExists = prev.some(
          (item) => item._id === notification._id
        );
        if (alreadyExists) return prev;

        return [notification, ...prev];
      });
    }
  }, [notification]);

  return (
    open && (
      <div className="absolute right-0 mt-2 w-80 h-[100vh] bg-softWhite border border-gray-200 shadow-lg rounded-tl-xl rounded-bl-xl z-50 overflow-y-auto transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-electricBlue text-white rounded-tl-xl">
          <h3 className="font-semibold text-base">Notifications</h3>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-full hover:bg-[#1E63D0] transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Notification Items */}
        <div className="p-4 space-y-3 text-charcoalGray">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n._id}
                className="p-3 rounded-lg bg-softWhite border border-gray-200 hover:bg-gray-50 transition"
              >
                <p className="text-sm font-medium">{n.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDateWithTime(n.createdAt)}
                </p>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center gap-2 py-6 text-gray-500">
              <BellOff className="w-6 h-6 text-gray-400" />
              <p className="text-sm">No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Notification;
