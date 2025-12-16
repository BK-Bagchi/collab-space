import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Download, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useActive } from "../../hooks/useActive";
import { useSettings } from "../../hooks/useSettings";
import Avatar from "../../assets/Default_Avatar.jpg";
import ActiveNow from "../ActiveNow/ActiveNow";
import formatTime from "../../utils/formatTime";
import SentMultiMedia from "./SentMultiMedia";

const NewChatBox = ({
  activeChat,
  setActiveChat,
  setMessages: setUserMessages,
  getUserChat,
}) => {
  const { user } = useAuth();
  const { socket, activeUsers } = useActive();
  const { typingIndicator } = useSettings();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [sender, receiver] = [user._id, activeChat._id];
  const messagesRef = useRef();

  // console.log(sender, receiver);
  // console.log(messages);
  useEffect(() => {
    // scroll to bottom on messages change
    messagesRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  useEffect(() => {
    if (!sender || !receiver) return;

    socket.emit("register", { sender, receiver });
    socket.on("oldMessages", (oldMsgs) => {
      setMessages(oldMsgs);
    });

    return () => socket.off("oldMessages");
  }, [socket, sender, receiver]);

  useEffect(() => {
    if (!sender || !receiver) return;

    socket.on("newMessage", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
      setUserMessages((prev) => [...prev, newMsg]);
      getUserChat();
    });
    socket.on("typing", ({ sender: typingUserId }) => {
      if (typingUserId === receiver) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }
    });

    return () => {
      socket.off("newMessage");
      socket.off("typing");
    };
  }, [socket, sender, receiver, setUserMessages, getUserChat]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMsg = { sender, receiver, content: message };
    socket.emit("newMessage", newMsg);
    // setMessages((prev) => [...prev, newMsg]);
    setMessage("");
  };

  let debounce;
  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (!typingIndicator) return;

    clearTimeout(debounce);
    debounce = setTimeout(() => {
      socket.emit("typing", { sender, receiver });
    }, 500);
  };

  const handleFileUpload = async (e) => {
    const confirmed = window.confirm(
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

        const newMsg = { sender, receiver, attachment, type: "FILE" };
        // console.log(newMsg);
        socket.emit("newMessage", newMsg);
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
    <div className="absolute top-0 right-0 w-96 h-[500px] bg-white border border-gray-200 shadow-lg rounded-xl flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between bg-vibrantPurple text-white px-4 py-2 rounded-t-xl">
        <div className="flex items-center gap-2">
          <img
            src={activeChat?.avatar || Avatar}
            alt={activeChat?.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">{activeChat?.name}</span>
          {activeUsers.includes(activeChat._id) && <ActiveNow />}
          {isTyping && (
            <span className="text-xs text-white/80 mt-0.5">typing...</span>
          )}
        </div>
        <button onClick={() => setActiveChat(null)}>
          <X size={16} />
        </button>
      </div>

      {/* Message Bubble */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
        {messages.map((msg, i) => {
          const isSender = msg.sender._id === sender;
          // console.log(msg);
          return (
            <div
              key={i}
              className={`flex items-end gap-2 ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar (only for others, optional) */}
              {!isSender && (
                <img
                  src={activeChat?.avatar || Avatar}
                  alt={msg.senderName || "User"}
                  className="w-8 h-8 rounded-full object-cover"
                />
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
                    <div className="flex items-center justify-between gap-3">
                      <a
                        href={msg.attachment.url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-2 py-1 text-xs rounded-md transition ${
                          isSender ? "text-white" : "text-electricBlue"
                        }`}
                      >
                        <Download />
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

              {/* Avatar for sender (optional) */}
              {isSender && (
                <img
                  src={user?.avatar || Avatar}
                  alt="You"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
            </div>
          );
        })}
        <div ref={messagesRef} />
      </div>

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
        }}
      />
    </div>
  );
};

export default NewChatBox;
