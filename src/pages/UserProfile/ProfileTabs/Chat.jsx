import { useState } from "react";
import { toast } from "react-toastify";
import { MessageCircle } from "lucide-react";
import confirmToast from "../../../components/ConfirmToast/ConfirmToast";
import { ChatAPI, UserAPI } from "../../../api";
import Waiting from "../../../components/Loading/Waiting";
import { useAuth } from "../../../hooks/useAuth";

const ChatTab = () => {
  const { user, setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [typingLoading, setTypingLoading] = useState(false);
  const [activeStatusLoading, setActiveStatusLoading] = useState(false);

  const handleClearChat = async () => {
    const confirm = await confirmToast(
      "Are you sure you want to clear your chat history?"
    );
    if (!confirm) return;
    setLoading(true);

    try {
      const res = await ChatAPI.clearChatHistory();
      toast.success(res.data.message);
    } catch (error) {
      console.error(
        "Error clearing chat history:",
        error.response.data.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTypingIndicator = async () => {
    setTypingLoading(true);

    try {
      const res = await UserAPI.toggleUserTypingIndicator();
      toast.success(res.data.message);
      setUser(res.data.user);
    } catch (error) {
      console.error(
        "Error toggling typing indicator:",
        error.response.data.message
      );
    } finally {
      setTypingLoading(false);
    }
  };

  const handleActiveStatus = async () => {
    setActiveStatusLoading(true);

    try {
      const res = await UserAPI.toggleUserActiveStatus();
      toast.success(res.data.message);
      setUser(res.data.user);
    } catch (error) {
      console.error("Error toggling active status:", error);
    } finally {
      setActiveStatusLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-4 animate-fadeIn">
      {/* Title */}
      <h3 className="text-lg font-semibold text-charcoalGray dark:text-softWhite flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-electricBlue" />
        Chat Settings
      </h3>

      {/* Card */}
      <div className="bg-softWhite dark:bg-gray-900 border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between">
        <div className="flex gap-2">
          <p className="font-medium text-charcoalGray dark:text-softWhite">
            Typing Indicator
          </p>
          {typingLoading && <Waiting />}
        </div>

        <div className="flex items-center gap-3">
          {/* Off label */}
          <p
            className={`text-sm font-medium transition ${
              !user?.typingIndicator ? "text-electricBlue" : "text-gray-400"
            }`}
          >
            Off
          </p>
          {/* Toggle Switch Typing Indicator */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={user?.typingIndicator}
              onChange={handleTypingIndicator}
            />
            <div className="w-11 h-6 bg-tealGreen rounded-full peer peer-checked:bg-electricBlue transition-all" />
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-all" />
          </label>
          {/* On label */}
          <p
            className={`text-sm font-medium transition ${
              user?.typingIndicator ? "text-electricBlue" : "text-gray-400"
            }`}
          >
            On
          </p>
        </div>
      </div>
      <div className="bg-softWhite dark:bg-gray-900 border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between">
        <div className="flex gap-2">
          <p className="font-medium text-charcoalGray dark:text-softWhite">
            Active Status
          </p>
          {activeStatusLoading && <Waiting />}
        </div>
        <div className="flex items-center gap-3">
          {/* Off label */}
          <p
            className={`text-sm font-medium transition ${
              !user?.activeStatus ? "text-electricBlue" : "text-gray-400"
            }`}
          >
            Off
          </p>
          {/* Toggle Switch Active Status */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={user?.activeStatus}
              onChange={handleActiveStatus}
            />
            <div className="w-11 h-6 bg-vibrantPurple rounded-full peer peer-checked:bg-electricBlue transition-all" />
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-all" />
          </label>
          {/* On label */}
          <p
            className={`text-sm font-medium transition ${
              user?.activeStatus ? "text-electricBlue" : "text-gray-400"
            }`}
          >
            On
          </p>
        </div>
      </div>
      <div className="bg-softWhite dark:bg-gray-900 border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-between">
        <p className="font-medium text-charcoalGray dark:text-softWhite">
          Clear Chat History
        </p>

        <button
          className="px-6 py-2 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow-sm"
          onClick={() => handleClearChat()}
        >
          {loading ? <Waiting color="#FFFF" /> : "Clear"}
        </button>
      </div>
    </div>
  );
};

export default ChatTab;
