import { X } from "lucide-react";
import React from "react";

const Notification = ({ open, setOpen }) => {
  return (
    open && (
      <div className="absolute right-0 mt-2 w-80 h-[100vh] bg-[#FAFAFA] border border-gray-200 shadow-lg rounded-tl-xl rounded-bl-xl z-50 overflow-y-auto transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-[#2979FF] text-white rounded-tl-xl">
          <h3 className="font-semibold text-base">Notifications</h3>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-full hover:bg-[#1E63D0] transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Notification Items */}
        <div className="p-4 space-y-3 text-[#263238]">
          <div className="p-3 rounded-lg bg-[#E3F2FD]">
            <p className="text-sm font-medium">Project “Team Alpha” updated.</p>
            <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
          </div>
          <div className="p-3 rounded-lg bg-[#F3E5F5]">
            <p className="text-sm font-medium">New task assigned to you.</p>
            <p className="text-xs text-gray-500 mt-1">10 minutes ago</p>
          </div>
          <div className="p-3 rounded-lg bg-[#E0F2F1]">
            <p className="text-sm font-medium">
              You were mentioned in a comment.
            </p>
            <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Notification;
