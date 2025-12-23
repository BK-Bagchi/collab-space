import { MessageSquare } from "lucide-react";
import Avatar from "../../../assets/Default_Avatar.jpg";
import formatTime from "../../../utils/formatTime";
import { useAuth } from "../../../hooks/useAuth";
const ChatRow = ({ chat, active, onClick }) => {
  const { user } = useAuth();

  const project = chat.project || {};
  const last = chat.content || "";
  const attachment = chat.content ? null : "📎 Attachment";
  const time = chat.createdAt || "";
  const isRead =
    Array.isArray(chat.isRead) && user?._id
      ? chat.isRead.includes(user._id)
      : false;
  const senderAvatar = (chat.sender && chat.sender.avatar) || Avatar;

  return (
    <div
      onClick={() => onClick(chat)}
      className={`flex items-center gap-3 p-3 mx-2 mt-2 cursor-pointer transition-all duration-200 rounded-lg
        ${
          isRead
            ? "bg-softWhite dark:bg-gray-500 hover:bg-[#F4F1FA] border border-gray-200 hover:border-gray-200"
            : "bg-electricBlue/10 hover:bg-electricBlue/20 border border-electricBlue/40 shadow-sm border-l-4"
        }
        ${active && "bg-softWhite border border-electricBlue/30"}
      `}
    >
      {/* Icon Circle */}
      <div
        style={{ backgroundColor: project.color || "#8E24AA" }}
        className="w-10 h-10 rounded-full hidden lg:flex items-center justify-center text-white font-semibold shadow-sm"
      >
        <MessageSquare size={18} />
      </div>

      {/* Chat Content */}
      <div className="flex-1 min-w-0">
        {/* Title + Time */}
        <div className="flex justify-between items-center">
          <h4
            className={`font-medium text-sm ${
              isRead
                ? "text-charcoalGray dark:text-softWhite"
                : "font-semibold text-electricBlue"
            } truncate`}
          >
            {project.title || chat.title}
          </h4>
          <span className="text-xs text-gray-400 dark:text-gray-300 whitespace-nowrap">
            {time ? formatTime(time) : ""}
          </span>
        </div>

        {/* Sender + Preview */}
        <div className="flex items-center gap-2 mt-0.5">
          <img
            src={senderAvatar}
            alt="sender"
            className="w-5 h-5 rounded-full object-cover"
          />

          <p
            className={`text-xs truncate dark:text-gray-300 ${
              isRead ? "text-gray-600" : "text-charcoalGray font-medium"
            }`}
          >
            {last ? last : attachment ? attachment : "No messages yet"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatRow;
