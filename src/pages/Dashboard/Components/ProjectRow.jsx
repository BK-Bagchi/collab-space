import { Folder } from "lucide-react";
import React from "react";

const ProjectRow = ({ project, active, onClick }) => (
  <div
    onClick={() => onClick(project)}
    className={`flex items-center gap-3 p-3 mx-2 mb-3 rounded-xl border border-gray-200 cursor-pointer transition bg-softWhite ${
      active
        ? "bg-[#E3F2FD] dark:bg-gray-400"
        : "hover:bg-[#F8F9FA] dark:bg-gray-500"
    }`}
  >
    <div
      style={{
        backgroundColor: project.color || "#2979FF",
      }}
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-sm"
    >
      <Folder size={18} />
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-sm text-charcoalGray dark:text-softWhite truncate">
          {project.title || project.name}
        </h4>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-300 truncate">
        {project.description || "No description"}
      </p>
    </div>
  </div>
);

export default ProjectRow;
