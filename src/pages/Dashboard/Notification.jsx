import React, { useEffect, useState } from "react";
import { NotificationAPI } from "../../api";
import { useNotification } from "../../hooks/useNotification";
import { formatDateWithTime } from "../../utils/dateFormater";
import { Bell, BellOff } from "lucide-react";
import Loading from "../../components/Loading/Loading";

const Notification = () => {
  const { notification } = useNotification();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="p-5 bg-white rounded-xl shadow-md border border-gray-100 max-h-full overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="text-electricBlue w-5 h-5" />
          <h2 className="text-lg font-semibold text-charcoalGray">
            Notifications
          </h2>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        <Loading loading={loading}>
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n._id}
                className="p-4 bg-[#FAFAFA] rounded-lg border border-gray-200 hover:bg-blue-50 transition"
              >
                <p className="text-sm font-medium text-charcoalGray">
                  {n.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDateWithTime(n.createdAt)}
                </p>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center py-14 text-gray-500">
              <BellOff className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-sm">No notifications available</p>
            </div>
          )}
        </Loading>
      </div>
    </div>
  );
};

export default Notification;
