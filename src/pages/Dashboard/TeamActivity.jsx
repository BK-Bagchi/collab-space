import React, { useEffect, useState } from "react";
// prettier-ignore
import { Users, FolderKanban, CalendarDays, CircleCheckBig } from "lucide-react";
import { ProjectAPI } from "../../api";
import ProjectProgress from "./Components/ProjectProgress";
import { useNavigate } from "react-router-dom";
import formatDate from "../../utils/dateFormater";
import Avatar from "../../assets/Default_Avatar.jpg";
import TaskStatus from "../../charts/TeamActivity/TaskStatus";
import TeamProgress from "../../charts/TeamActivity/TeamProgress";
import DeadlineProgress from "../../charts/TeamActivity/DeadlineProgress";

const TeamActivity = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await ProjectAPI.getUserProjects();
        setProjects(res.data.projects);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* 🔹 Top Section — Project Progress Summary */}
      {projects.length > 0 && (
        <div>
          <ProjectProgress projectList={projects} />
        </div>
      )}

      {/* 🔹 Second Section — Individual Project Activity */}
      <div className="space-y-8">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="grid grid-rows-2 gap-4">
                  {/* 🔸 Top Left — Project Info */}
                  <div className="flex flex-col justify-start p-4 rounded-xl bg-[#F9FAFB] shadow-inner">
                    {/* Header */}
                    <div
                      className="flex justify-between items-center mb-3"
                      onClick={() =>
                        navigate(`/dashboard/manage-projects/${project._id}`)
                      }
                    >
                      <h3 className="font-semibold text-[#263238] text-base truncate hover:text-[#2979ff] hover:underline cursor-pointer">
                        {project.title}
                      </h3>
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: project.color || "#2979FF" }}
                      ></span>
                    </div>

                    {/* Description */}
                    <p
                      className="text-sm text-gray-600 line-clamp-2 mb-3 truncate"
                      title={project.description}
                    >
                      {project.description || "No description provided."}
                    </p>

                    {/* Meta Info */}
                    <div className="flex justify-between gap-2 text-xs text-gray-500 mb-3">
                      {/* Deadline */}
                      <div className="flex items-center gap-1">
                        <CalendarDays
                          size={14}
                          className="text-vibrantPurple"
                        />
                        <span>{formatDate(project.deadline)}</span>
                      </div>

                      {/* Assigned Tasks */}
                      <div className="flex items-center gap-1">
                        <CircleCheckBig
                          size={14}
                          className="text-electricBlue"
                        />
                        <span>{project.tasks?.length || 0} Assigned Tasks</span>
                      </div>
                    </div>

                    {/* Members */}
                    <div className="flex items-center text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-tealGreen" />
                        <span className="font-medium">
                          {project.members?.length || 0} Members
                        </span>
                      </div>

                      {/* Member Avatars */}
                      <div className="flex -space-x-2 ml-2">
                        {project.members && project.members.length > 0 ? (
                          project.members
                            .slice(0, 3)
                            .map((member) => (
                              <img
                                key={member._id}
                                src={member.avatar || Avatar}
                                alt={member.name}
                                title={member.name}
                                className="w-6 h-6 rounded-full border-2 border-white shadow-sm hover:scale-110 hover:z-10 transition-transform duration-200"
                              />
                            ))
                        ) : (
                          <span className="text-gray-400 text-[10px]">
                            No members
                          </span>
                        )}

                        {/* +More Indicator */}
                        {project.members?.length > 3 && (
                          <span className="w-6 h-6 flex items-center justify-center text-[10px] font-medium text-gray-700 bg-gray-200 rounded-full border-2 border-white shadow-sm">
                            +{project.members.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-[#F9FAFB] flex items-center justify-center shadow-inner">
                    <DeadlineProgress project={project} />
                  </div>
                </div>

                {/* 🔸These 2 at right */}
                <div className="grid grid-rows-2 gap-4">
                  <div className="rounded-xl bg-[#F9FAFB] flex items-center justify-center shadow-inner">
                    <TaskStatus project={project} />
                  </div>
                  <div className="rounded-xl bg-[#F9FAFB] flex items-center justify-center shadow-inner">
                    <TeamProgress project={project} />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
            <FolderKanban size={40} className="mb-3 text-gray-300" />
            <p className="text-sm font-medium">No projects found</p>
            <p className="text-xs text-gray-400">
              Once projects are created or assigned, you’ll see their activities
              here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamActivity;
