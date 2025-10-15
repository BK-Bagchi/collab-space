import { X, MessageSquare } from "lucide-react";

const Chat = ({ open, setOpen }) => {
  return (
    open && (
      <div className="absolute right-0 mt-2 w-80 h-[100vh] bg-[#FAFAFA] border border-gray-200 shadow-lg rounded-tl-xl rounded-bl-xl z-50 overflow-y-auto transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-[#8E24AA] text-white rounded-tl-xl">
          <h3 className="font-semibold text-base flex items-center gap-2">
            <MessageSquare size={18} />
            Messages
          </h3>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-full hover:bg-[#751C8E] transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Message List */}
        <div className="p-4 space-y-4 text-[#263238]">
          {/* Example message */}
          <div className="flex items-start gap-3 p-3 bg-[#EDE7F6] rounded-lg hover:bg-[#D1C4E9] transition cursor-pointer">
            <img
              src="/default-avatar.png"
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">Golu Bagchi</h4>
                <span className="text-xs text-gray-500">2m ago</span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                Hey! Have you checked the latest update on Collab Space?
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#E3F2FD] rounded-lg hover:bg-[#BBDEFB] transition cursor-pointer">
            <img
              src="/default-avatar.png"
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">Alex Turner</h4>
                <span className="text-xs text-gray-500">10m ago</span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                Can we discuss the new design changes today?
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#E0F2F1] rounded-lg hover:bg-[#B2DFDB] transition cursor-pointer">
            <img
              src="/default-avatar.png"
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">Team Alpha</h4>
                <span className="text-xs text-gray-500">1h ago</span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                Project status updated. Check your dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-softWhite px-4 py-3 text-center">
          <button
            onClick={() => setOpen(false)}
            className="text-[#2979FF] font-medium hover:underline text-sm"
          >
            View All Messages
          </button>
        </div>
      </div>
    )
  );
};

export default Chat;
