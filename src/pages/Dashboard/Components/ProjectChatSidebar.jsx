import React, { useState } from "react";
import { MoreVertical, Search, Folder, MessageSquare } from "lucide-react";

const ProjectChatSidebar = ({
  projects,
  lastChats,
  activeProject,
  setActiveProject,
  activeChat,
  setActiveChat,
}) => {
  const [activeTab, setActiveTab] = useState("projects"); // "projects" | "chats"
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered lists based on search
  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredChats = lastChats.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-1/4 border-r border-gray-200 bg-white flex flex-col rounded-l-2xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-charcoalGray">
          Collab Space
        </h2>
        <MoreVertical
          size={18}
          className="text-gray-500 cursor-pointer hover:text-electricBlue"
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex-1 py-2 text-sm font-medium transition-all ${
            activeTab === "projects"
              ? "border-b-2 border-electricBlue text-electricBlue"
              : "text-gray-500 hover:text-electricBlue"
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab("chats")}
          className={`flex-1 py-2 text-sm font-medium transition-all ${
            activeTab === "chats"
              ? "border-b-2 border-electricBlue text-electricBlue"
              : "text-gray-500 hover:text-electricBlue"
          }`}
        >
          Chats
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-3">
        <div className="relative">
          <Search size={16} className="absolute top-2.5 left-3 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-electricBlue"
          />
        </div>
      </div>

      {/* List Section */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "projects" ? (
          filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project._id}
                onClick={() => setActiveProject(project)}
                className={`flex items-center gap-3 p-3 cursor-pointer transition-all ${
                  activeProject?._id === project._id
                    ? "bg-[#E3F2FD]"
                    : "hover:bg-[#F8F9FA]"
                }`}
              >
                {/* Project Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-sm"
                  style={{ backgroundColor: project.color || "#2979FF" }}
                >
                  <Folder size={18} />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-charcoalGray truncate">
                    {project.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {project.description || "No description"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 text-sm py-10">
              No projects found
            </div>
          )
        ) : filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => setActiveChat(chat)}
              className={`flex items-center gap-3 p-3 cursor-pointer transition-all ${
                activeChat?._id === chat._id
                  ? "bg-[#E3F2FD]"
                  : "hover:bg-[#F8F9FA]"
              }`}
            >
              {/* Chat Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-sm"
                style={{ backgroundColor: chat.project?.color || "#8E24AA" }}
              >
                <MessageSquare size={18} />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-sm text-charcoalGray truncate">
                    {chat.name}
                  </h4>
                  <span className="text-xs text-gray-400">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {chat.lastMessage || "No messages yet"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 text-sm py-10">
            No chats found
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectChatSidebar;
