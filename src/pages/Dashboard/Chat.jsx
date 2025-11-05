import React, { useEffect, useState } from "react";
//prettier-ignore
import { Search, MoreVertical, Folder, MessageSquare, Clock } from "lucide-react";
import Avatar from "../../assets/Default_Avatar.jpg";
import { ChatAPI, ProjectAPI } from "../../api";
import ProjectRow from "./Components/ProjectRow";
import ProjectChatBox from "../../components/Chat/ProjectChatBox";
import ChatRow from "./Components/ChatRow";
import formatText from "../../utils/textFormater";

const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-2 text-sm font-medium transition-all ${
      active
        ? "border-b-2 border-electricBlue text-electricBlue"
        : "text-gray-500 hover:text-electricBlue"
    }`}
  >
    {children}
  </button>
);
const Chat = () => {
  const [projects, setProjects] = useState([]);
  const [lastChats, setLastChats] = useState([]);
  const [activeTab, setActiveTab] = useState("projects"); // "projects" | "chats"
  const [activeProject, setActiveProject] = useState(null); // the project object currently open

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await ProjectAPI.getUserProjects();
        setProjects(res.data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    const fetchProjectChats = async () => {
      try {
        const res = await ChatAPI.getLastProjectChats();
        setLastChats(res.data.chats || []);
      } catch (error) {
        console.error("Error fetching project chats:", error);
      }
    };

    fetchProjects();
    fetchProjectChats();
  }, []);

  // when user clicks a project row
  const openProjectChat = (project) => {
    setActiveProject(project);
    setActiveTab("projects");
  };

  // when user clicks a chat row
  const openChatFromLast = (chat) => {
    const project = chat.project || null;
    setActiveProject(project);
    setActiveTab("chats");
  };

  return (
    <div className="flex h-full bg-[#F5F7FB] rounded-lg overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-1/3 md:w-1/4 border-r border-gray-200 bg-white flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-charcoalGray">
            {formatText(activeTab)}
          </h2>
          <MoreVertical size={18} className="text-gray-500 cursor-pointer" />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <TabButton
            active={activeTab === "projects"}
            onClick={() => setActiveTab("projects")}
          >
            <div className="flex items-center justify-center gap-2">
              <Folder size={14} />
              Projects
            </div>
          </TabButton>
          <TabButton
            active={activeTab === "chats"}
            onClick={() => setActiveTab("chats")}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageSquare size={14} />
              Chats
            </div>
          </TabButton>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute top-2.5 left-3 text-gray-400"
            />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-electricBlue"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "projects" ? (
            projects.length > 0 ? (
              projects.map((project) => (
                <ProjectRow
                  key={project._id || project.id}
                  project={project}
                  active={
                    activeProject &&
                    (activeProject._id || activeProject.id) ===
                      (project._id || project.id)
                  }
                  onClick={openProjectChat}
                />
              ))
            ) : (
              <div className="text-center text-gray-400 text-sm py-10">
                <Clock size={36} className="mx-auto mb-2 text-gray-300" />
                No projects found
              </div>
            )
          ) : lastChats.length > 0 ? (
            lastChats.map((chat) => (
              <ChatRow
                key={chat._id || chat.id || (chat.project && chat.project._id)}
                chat={chat}
                active={
                  activeProject &&
                  chat.project &&
                  (activeProject._id || activeProject.id) ===
                    (chat.project._id || chat.project.id)
                }
                onClick={openChatFromLast}
              />
            ))
          ) : (
            <div className="text-center text-gray-400 text-sm py-10">
              <Clock size={36} className="mx-auto mb-2 text-gray-300" />
              No recent chats
            </div>
          )}
        </div>
      </div>

      {/* Right Chat Window */}
      <div className="flex-1 flex flex-col">
        {activeProject ? (
          <ProjectChatBox project={activeProject} />
        ) : (
          <div className="flex-1 flex flex-col items-center text-center text-gray-400 mt-10">
            <MessageSquare size={48} className="mb-3 text-gray-300" />
            <h3 className="text-lg font-semibold">Select a project or chat</h3>
            <p className="text-sm text-gray-400 mt-1">
              Pick a project on the left to open its chat.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
