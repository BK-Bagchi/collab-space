import { MessageSquare } from "lucide-react";
import Avatar from "../../../assets/Default_Avatar.jpg";
const ChatRow = ({ chat, active, onClick }) => {
  const project = chat.project || {};
  const last = chat.preview || "";
  const time = chat.time || chat.updatedAt || "";
  const senderAvatar = (chat.sender && chat.sender.avatar) || Avatar;

  return (
    <div
      onClick={() => onClick(chat)}
      className={`flex items-center gap-3 p-3 cursor-pointer transition ${
        active ? "bg-[#E3F2FD]" : "hover:bg-[#F8F9FA]"
      }`}
    >
      <div
        style={{ backgroundColor: project.color || "#8E24AA" }}
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-sm"
      >
        <MessageSquare size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-sm text-charcoalGray truncate">
            {project.title || chat.title}
          </h4>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {time
              ? new Date(time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <img
            src={senderAvatar}
            alt="sender"
            className="w-5 h-5 rounded-full object-cover"
          />
          <p className="text-xs text-gray-500 truncate">
            {last || "No messages yet"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatRow;
