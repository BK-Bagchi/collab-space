import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Download, Folder, Inbox, MoreVertical } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useActive } from "../../hooks/useActive";
import { useSettings } from "../../hooks/useSettings";
import Avatar from "../../assets/Default_Avatar.jpg";
import formatTime from "../../utils/formatTime";
import SentMultiMedia from "./SentMultiMedia";
import confirmToast from "../ConfirmToast/ConfirmToast";

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
  const { user } = useAuth();
  const { socket, activeUsers } = useActive();
  const { typingIndicator } = useSettings();

  const [projectId, sender] = [project._id, user._id];
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const messagesRef = useRef();
  const blockRef = useRef();
  // console.log(typingUsers);

  useEffect(() => {
    // scroll to bottom on messages change
    messagesRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    blockRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  useEffect(() => {
    if (!projectId || !sender) return;

    socket.emit("joinProject", { projectId, sender });
    socket.on("oldProjectMessages", (oldMsgs) => {
      setMessages(oldMsgs);
    });

    return () => {
      socket.off("oldProjectMessages");
    };
  }, [projectId, sender, socket]);

  useEffect(() => {
    if (!projectId || !sender) return;

    socket.on("projectMessage", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
      setProjectMessages((prev) => [...prev, newMsg]);
      getProjectChats();
    });
    socket.on("typing", (user) => {
      setTypingUsers((prev) => {
        if (prev.find((u) => u._id === user._id)) return prev;
        return [...prev, user];
      });
      setTimeout(
        () => setTypingUsers((prev) => prev.filter((u) => u._id !== user._id)),
        3000
      );
    });

    return () => {
      socket.off("projectMessage");
      socket.off("typing");
    };
  }, [socket, projectId, sender, getProjectChats, setProjectMessages]);
  // console.log(messages);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMsg = { projectId, sender, content: message };
    socket.emit("projectMessage", newMsg);
    // setMessages((prev) => [...prev, newMsg]);
    setMessage("");
  };

  // Typing event emit
  let debounce;
  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (!typingIndicator) return;

    clearTimeout(debounce);
    debounce = setTimeout(() => {
      socket.emit("typing", { projectId, user });
    }, 500);
  };

  const handleFileUpload = async (e) => {
    const confirmed = await confirmToast(
      "Are you sure you want to upload this file?"
    );
    if (!confirmed) {
      e.target.value = "";
      setShowUploadMenu(false);
      return;
    }

    setUploading(true);
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

      const res = await axios.post(
        //prettier-ignore
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/raw/upload`,
        formData
      );

      if (res.data.secure_url) {
        // console.log("Cloudinary Link:", res.data.secure_url);
        const attachment = {
          name: file.name,
          url: res.data.secure_url,
          uploadedBy: sender,
        };
        const newMsg = { projectId, sender, attachment, type: "FILE" };
        socket.emit("projectMessage", newMsg);
      }
    } catch (error) {
      console.error("File upload error:", error);
    } finally {
      e.target.value = "";
      setShowUploadMenu(false);
      setUploading(false);
    }
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
      <div className="flex-1 overflow-y-auto p-4 bg-[#EFF3F9] space-y-3 scrollbar-hide">
        {(!messages || messages.length === 0) && (
          <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500">
            <Inbox size={36} className="mb-2 text-gray-300" />
            <p className="text-sm font-medium">No messages yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Start the conversation with your team.
            </p>
          </div>
        )}

        {/* Message Bubble */}
        {messages.map((msg, i) => {
          const isSender = msg.sender._id === sender;
          return (
            <div
              key={i}
              className={`flex items-end gap-2 mb-3 ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar (for others on left, for you on right) */}
              {!isSender && (
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

              {/* Message and time */}
              <div className="flex flex-col max-w-[70%]">
                <div
                  className={`px-4 py-2 rounded-2xl shadow-sm text-sm ${
                    isSender
                      ? "bg-electricBlue text-white rounded-br-none self-end"
                      : "bg-white text-charcoalGray rounded-bl-none"
                  }`}
                >
                  {msg.attachment ? (
                    <div className="flex items-center gap-3">
                      <a
                        href={msg.attachment.url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-1 rounded-md transition ${
                          isSender ? "text-white" : "text-electricBlue"
                        }`}
                      >
                        <Download size={16} />
                      </a>
                      <div className="flex-1 truncate">
                        <p className="font-medium truncate">
                          {msg.attachment.name}
                        </p>
                        <p className="text-xs opacity-70">Attachment</p>
                      </div>
                    </div>
                  ) : (
                    <p>{msg.content}</p>
                  )}
                </div>

                {/* Time below bubble */}
                <div
                  className={`text-[10px] text-gray-400 mt-1 ${
                    isSender ? "text-right" : "text-left"
                  }`}
                >
                  {msg.createdAt ? formatTime(msg.createdAt) : ""}
                </div>
              </div>

              {/* Avatar (for you on right) */}
              {isSender && (
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
          );
        })}

        <div ref={messagesRef} />
      </div>

      {/* Typing indicator */}
      {typingUsers.length > 0 && (
        <div className="px-3 py-1 text-xs text-gray-500 italic bg-gray-100 border-t border-gray-200">
          {typingUsers.map((u) => u.name).join(", ")}{" "}
          {typingUsers.length > 1 ? "are typing..." : "is typing..."}
        </div>
      )}
      {/* Input */}
      <SentMultiMedia
        {...{
          message,
          uploading,
          handleTyping,
          sendMessage,
          handleFileUpload,
          showUploadMenu,
          setShowUploadMenu,
          project,
        }}
      />
      <div ref={blockRef} />
    </div>
  );
};

export default ProjectChatBox;
