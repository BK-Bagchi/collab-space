import { Folder, Inbox, MoreVertical, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ProjectChatBox = ({ project }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesRef = useRef();

  useEffect(() => {
    // scroll to bottom on messages change
    messagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!text.trim()) return;
    // onSend(text.trim());
    console.log(text);
    setMessages((prev) => [...prev, text]);
    setText("");
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

        {messages.map((m, i) => (
          <div
            key={m.id ?? i}
            className={`flex ${
              m.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm text-sm ${
                m.sender === "You"
                  ? "bg-electricBlue text-white"
                  : "bg-white text-charcoalGray"
              }`}
            >
              <p>{m.text || m.message || "(no text)"}</p>
              <div className="text-[10px] text-gray-300 mt-1 text-right">
                {m.time ??
                  (m.createdAt
                    ? new Date(m.createdAt).toLocaleTimeString()
                    : "")}
              </div>
            </div>
          </div>
        ))}

        <div ref={messagesRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={project ? `Message ${project.title}` : "Type a message"}
          className="flex-1 px-4 py-2 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-electricBlue"
        />
        <button
          onClick={send}
          className="bg-electricBlue hover:bg-[#1E63D1] text-white p-2 rounded-full transition"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProjectChatBox;
