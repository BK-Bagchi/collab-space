import { Moon } from "lucide-react";
import { useSettings } from "../../../hooks/useSettings";

const Appearance = () => {
  const { theme, toggleTheme } = useSettings();
  const isDark = theme === "dark";

  return (
    <div className="mt-6 space-y-4 animate-fadeIn">
      {/* Title */}
      <h3 className="text-lg font-semibold text-charcoalGray flex items-center gap-2">
        <Moon className="w-5 h-5 text-electricBlue" />
        Appearance Settings
      </h3>

      {/* Card */}
      <div
        onClick={toggleTheme}
        className="bg-softWhite border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between"
      >
        <div>
          <p className="font-medium text-charcoalGray">Dark Mode</p>
        </div>

        {/* Toggle Switch */}
        <label
          onClick={(e) => e.stopPropagation()}
          className="relative inline-flex items-center cursor-pointer"
        >
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isDark}
            onChange={toggleTheme}
          />
          <div className="w-11 h-6 bg-tealGreen rounded-full peer peer-checked:bg-electricBlue transition-all" />
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-all" />
        </label>
      </div>
    </div>
  );
};

export default Appearance;
