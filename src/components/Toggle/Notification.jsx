import React, { useEffect, useState } from "react";
import { BellOff, X } from "lucide-react";
import { NotificationAPI } from "../../api";
import { formatDateWithTime } from "../../utils/dateFormater";
import { useNotification } from "../../hooks/useNotification";
import Loading from "../Loading/Loading";

const Notification = ({ open, setOpen }) => {
  const { notification } = useNotification();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await NotificationAPI.getNotifications();
        setNotifications(res.data.notifications);
        await NotificationAPI.markAllAsRead();
      } catch (error) {
        console.warn(
          "Error fetching notifications:",
          error.response.data.message
        );
      } finally {
        setLoading(false);
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
      <div className="absolute right-0 mt-2 w-80 h-screen bg-softWhite dark:bg-darkSlate border border-gray-200 shadow-lg rounded-tl-xl rounded-bl-xl z-50 overflow-y-auto transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-electricBlue dark:bg-darkSlate text-white rounded-tl-xl">
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
          <Loading loading={loading}>
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <div
                  key={n._id}
                  className={`
            p-3 rounded-lg transition border 
            ${
              n.read
                ? "bg-softWhite dark:bg-gray-600 border-gray-200" // READ
                : "bg-electricBlue/10 hover:bg-electricBlue/20 border-electricBlue/40 shadow-sm border-l-4" // UNREAD
            }
            hover:bg-gray-50 dark:hover:bg-gray-500
          `}
                >
                  <p
                    className={`text-sm text-charcoalGray dark:text-softWhite ${
                      n.read ? "font-normal" : "font-semibold"
                    }`}
                  >
                    {n.message}
                  </p>

                  <p
                    className={`text-xs mt-1 dark:text-gray-400 ${
                      n.read ? "text-gray-500" : "text-electricBlue font-medium"
                    }`}
                  >
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
          </Loading>
        </div>
      </div>
    )
  );
};

export default Notification;
