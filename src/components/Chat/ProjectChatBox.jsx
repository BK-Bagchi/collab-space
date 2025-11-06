import { useEffect, useRef, useState } from "react";
import { Folder, Inbox, MoreVertical, Send } from "lucide-react";
import { useActive } from "../../hooks/useActive";
import { useAuth } from "../../hooks/useAuth";
import Avatar from "../../assets/Default_Avatar.jpg";

const ActiveStatusDot = () => {
  return (
    <span className="absolute bottom-0 right-0 block w-1.5 h-1.5 bg-electricBlue rounded-full ring-2 ring-white"></span>
  );
};

const ProjectChatBox = ({
  project,
  setMessages: setProjectMessages,
  getProjectChats,
}) => {
  const { socket, activeUsers } = useActive();
  const { user } = useAuth();
  const [projectId, userId] = [project._id, user._id];

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesRef = useRef();

  useEffect(() => {
    // scroll to bottom on messages change
    messagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!projectId || !userId) return;

    //Join chatroom
    socket.emit("joinProject", { projectId, userId });

    // Load old messages
    socket.on("oldProjectMessages", (oldMsgs) => {
      setMessages(oldMsgs);
    });

    // Listen for new messages
    socket.on("projectMessage", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
      setProjectMessages((prev) => [...prev, newMsg]);
      getProjectChats();
    });

    // Cleanup listeners when chat user changes or unmounts
    return () => {
      socket.off("oldProjectMessages");
      socket.off("projectMessage");
    };
  }, [socket, projectId, userId, getProjectChats, setProjectMessages]);
  // console.log(messages);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMsg = { projectId, sender: userId, content: message };
    socket.emit("projectMessage", newMsg);
    // setMessages((prev) => [...prev, newMsg]);
    setMessage("");
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-vibrantPurple text-white px-4 py-3">
        <div className="flex items-center gap-3">
          {project ? (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-sm"
              style={{ backgroundColor: project.color || "#2979FF" }}
            >
              <Folder size={18} />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200" />
          )}

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">
                {project?.title || "Project Chat"}
              </h3>
              {project?.isActive && (
                <span className="w-2 h-2 rounded-full bg-electricBlue" />
              )}
            </div>
            <p className="text-xs text-white/85">
              {project?.subtitle || "Project chat channel"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MoreVertical className="cursor-pointer" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#EFF3F9] space-y-3">
        {(!messages || messages.length === 0) && (
          <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500">
            <Inbox size={36} className="mb-2 text-gray-300" />
            <p className="text-sm font-medium">No messages yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Start the conversation with your team.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 mb-3 ${
              msg.sender._id === user._id ? "justify-end" : "justify-start"
            }`}
          >
            {/* Avatar (for others on left, for you on right) */}
            {msg.sender._id !== user._id && (
              <div className="relative">
                <img
                  src={msg.sender.avatar || Avatar}
                  alt={msg.sender.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                {/* Active Status Dot */}
                {activeUsers.includes(msg.sender._id) && <ActiveStatusDot />}
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm text-sm ${
                msg.sender._id === user._id
                  ? "bg-electricBlue text-white rounded-br-none"
                  : "bg-white text-charcoalGray rounded-bl-none"
              }`}
            >
              <p>{msg.content}</p>
              <div className="text-[10px] text-gray-300 mt-1 text-right">
                {msg.time ??
                  (msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "")}
              </div>
            </div>

            {/* Avatar (for you on right) */}
            {msg.sender._id === user._id && (
              <div className="relative">
                <img
                  src={user.avatar || Avatar}
                  alt="You"
                  className="w-8 h-8 rounded-full object-cover"
                />
                {/* Active Status Dot */}
                {activeUsers.includes(msg.sender._id) && <ActiveStatusDot />}
              </div>
            )}
          </div>
        ))}

        <div ref={messagesRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={project ? `Message ${project.title}` : "Type a message"}
          className="flex-1 px-4 py-2 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-electricBlue"
        />
        <button
          onClick={sendMessage}
          className="bg-electricBlue hover:bg-[#1E63D1] text-white p-2 rounded-full transition"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProjectChatBox;
