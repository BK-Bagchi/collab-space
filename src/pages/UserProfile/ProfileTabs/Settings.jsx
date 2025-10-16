import React from "react";

const Settings = () => {
  return (
    <div className="mt-6 space-y-4 animate-fadeIn">
      <h3 className="text-lg font-semibold text-charcoalGray">App Settings</h3>
      <div className="flex items-center justify-between bg-softWhite border p-3 rounded-lg">
        <span>Dark Mode</span>
        <input type="checkbox" className="w-5 h-5 accent-[#2979FF]" />
      </div>
      <div className="flex items-center justify-between bg-softWhite border p-3 rounded-lg">
        <span>Notifications</span>
        <input type="checkbox" className="w-5 h-5 accent-[#26A69A]" />
      </div>
    </div>
  );
};

export default Settings;
