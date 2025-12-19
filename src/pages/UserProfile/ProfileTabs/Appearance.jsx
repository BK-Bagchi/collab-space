import { useState } from "react";
import { Moon } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";
import { useSettings } from "../../../hooks/useSettings";
import { UserAPI } from "../../../api";
import Waiting from "../../../components/Loading/Waiting";

const Appearance = () => {
  const { setUser } = useAuth();
  const { theme } = useSettings();

  const isDark = theme === "dark";
  const [loading, setLoading] = useState(false);

  const handleThemeToggle = async () => {
    try {
      setLoading(true);
      const res = await UserAPI.toggleUserTheme();
      toast.success(res.data.message);
      setUser(res.data.user);
    } catch (error) {
      console.error("Error toggling theme:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-4 animate-fadeIn">
      {/* Title */}
      <h3 className="text-lg font-semibold text-charcoalGray dark:text-softWhite flex items-center gap-2">
        <Moon className="w-5 h-5 text-electricBlue" />
        Appearance Settings
      </h3>

      {/* Card */}
      <div className="bg-softWhite dark:bg-gray-900 border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between">
        <div className="flex gap-2">
          <p className="font-medium text-charcoalGray dark:text-softWhite">
            Dark Mode
          </p>
          {loading && <Waiting />}
        </div>
        <div className="flex items-center gap-3">
          {/* Off label */}
          <p
            className={`text-sm font-medium transition ${
              !isDark ? "text-electricBlue" : "text-gray-400"
            }`}
          >
            Off
          </p>
          {/* Toggle Switch */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isDark}
              onChange={handleThemeToggle}
            />
            <div className="w-11 h-6 bg-tealGreen rounded-full peer peer-checked:bg-electricBlue transition-all" />
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-all" />
          </label>
          {/* ON label */}
          <p
            className={`text-sm font-medium transition ${
              isDark ? "text-electricBlue" : "text-gray-400"
            }`}
          >
            On
          </p>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
