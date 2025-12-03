import { MessageCircle } from "lucide-react";

const Chat = () => {
  return (
    <div className="mt-6 space-y-4 animate-fadeIn">
      {/* Title */}
      <h3 className="text-lg font-semibold text-charcoalGray flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-electricBlue" />
        Chat Settings
      </h3>

      {/* Card */}
      <div className="bg-softWhite border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between">
        <div>
          <p className="font-medium text-charcoalGray">Typing Indicator</p>
        </div>

        {/* Toggle Switch */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-[#26a69a] rounded-full peer peer-checked:bg-electricBlue transition-all"></div>
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-all"></div>
        </label>
      </div>
      <div className="bg-softWhite border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between">
        <div>
          <p className="font-medium text-charcoalGray">Active Status</p>
        </div>

        {/* Toggle Switch */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-[#8e24aa] rounded-full peer peer-checked:bg-electricBlue transition-all"></div>
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-all"></div>
        </label>
      </div>
      <div className="bg-softWhite border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-between">
        <p className="font-medium text-charcoalGray">Clear Chat History</p>

        <button className="px-6 py-2 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow-sm">
          Clear
        </button>
      </div>
    </div>
  );
};

export default Chat;
