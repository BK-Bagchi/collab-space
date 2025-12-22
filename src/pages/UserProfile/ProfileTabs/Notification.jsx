import { useState } from "react";
import { Bell } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";
import Waiting from "../../../components/Loading/Waiting";
import { UserAPI } from "../../../api";

const NotificationTab = () => {
  const { user, setUser } = useAuth();

  const [pushLoading, setPushLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const togglePushNotifications = async () => {
    setPushLoading(true);
    try {
      const res = await UserAPI.togglePushNotifications();
      toast.success(res.data.message);
      setUser(res.data.user);
    } catch (error) {
      console.error("Error toggling push notifications:", error);
    } finally {
      setPushLoading(false);
    }
  };
  const toggleEmailNotifications = async () => {
    setEmailLoading(true);
    try {
      const res = await UserAPI.toggleEmailNotifications();
      toast.success(res.data.message);
      setUser(res.data.user);
    } catch (error) {
      console.error("Error toggling email notifications:", error);
    } finally {
      setEmailLoading(false);
    }
  };
  return (
    <div className="mt-6 space-y-4 animate-fadeIn">
      {/* Title */}
      <h3 className="text-lg font-semibold text-charcoalGray dark:text-softWhite flex items-center gap-2">
        <Bell className="w-5 h-5 text-vibrantPurple" />
        Notification Settings
      </h3>

      {/* Card */}
      <div className="bg-softWhite dark:bg-gray-900 border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between">
        <div className="flex gap-2">
          <p className="font-medium text-charcoalGray dark:text-softWhite">
            Push Notifications
          </p>
          {pushLoading && <Waiting />}
        </div>

        <div className="flex items-center gap-3">
          {/* Off label */}
          <p
            className={`text-sm font-medium transition ${
              !user?.pushNotifications ? "text-electricBlue" : "text-gray-400"
            }`}
          >
            Off
          </p>
          {/* Toggle Switch */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={user?.pushNotifications}
              onChange={togglePushNotifications}
            />
            <div className="w-11 h-6 bg-tealGreen rounded-full peer peer-checked:bg-electricBlue transition-all"></div>
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-all"></div>
          </label>
          {/* On label */}
          <p
            className={`text-sm font-medium transition ${
              user?.pushNotifications ? "text-electricBlue" : "text-gray-400"
            }`}
          >
            On
          </p>
        </div>
      </div>
      <div className="bg-softWhite dark:bg-gray-900 border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between">
        <div className="flex gap-2">
          <p className="font-medium text-charcoalGray dark:text-softWhite">
            Email Notifications
          </p>
          {emailLoading && <Waiting />}
        </div>

        <div className="flex items-center gap-3">
          {/* Off label */}
          <p
            className={`text-sm font-medium transition ${
              !user?.emailNotifications ? "text-electricBlue" : "text-gray-400"
            }`}
          >
            Off
          </p>
          {/* Toggle Switch */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={user?.emailNotifications}
              onChange={toggleEmailNotifications}
            />
            <div className="w-11 h-6 bg-vibrantPurple rounded-full peer peer-checked:bg-electricBlue transition-all"></div>
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-all"></div>
          </label>
          {/* On label */}
          <p
            className={`text-sm font-medium transition ${
              user?.emailNotifications ? "text-electricBlue" : "text-gray-400"
            }`}
          >
            On
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationTab;
