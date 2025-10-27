import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderKanban,
  Users,
  CalendarDays,
  Clock,
  BadgePlus,
  PenLine,
  CircleCheckBig,
} from "lucide-react";
import { ProjectAPI } from "../../api";
import formatDate, { formatDateWithTime } from "../../utils/dateFormater";
import Avatar from "../../assets/Default_Avatar.jpg";
import { useAuth } from "../../hooks/useAuth";

const ManageUsers = () => {
  const { user } = useAuth();
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
  // console.log(projects);
  // console.log(user);

  const createdProject = projects.filter(
    (project) => project.createdBy._id === user._id
  );

  return (
    <div className="min-h-screen bg-softWhite p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-charcoalGray flex items-center gap-2">
          <FolderKanban className="text-electricBlue" size={22} />
          All Projects
          <span className="text-sm text-gray-500 italic hover:text-[#2979FF] hover:underline cursor-pointer">
            Click to see details
          </span>
        </h2>
      </div>

      {/* Project Grid */}
      {createdProject.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {createdProject.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 transition p-5"
            >
              {/* Header */}
              <div
                className="flex justify-between items-center mb-3"
                onClick={() =>
                  navigate(`/dashboard/manage-projects/${project._id}`)
                }
              >
                <h3 className="font-semibold text-[#263238] text-base truncate hover:text-[#2979FF] hover:underline cursor-pointer">
                  {project.title}
                </h3>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.color || "#2979FF" }}
                ></span>
              </div>

              {/* Description */}
              <p
                className="text-sm text-gray-600 line-clamp-2 mb-4 truncate"
                title={project.description}
              >
                {project.description || "No description provided."}
              </p>

              {/* Info Section */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <CalendarDays size={14} className="text-vibrantPurple" />
                  <span>{formatDate(project.deadline)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={14} className="text-tealGreen" />
                  <span>{project.members?.length || 0} Members</span>
                </div>
              </div>

              {/* Total Tasks */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <CircleCheckBig size={14} className="text-electricBlue" />
                  <span>{project.tasks?.length || 0} Assigned Tasks</span>
                </div>
              </div>

              {/* Project Meta Info */}
              <div className="mt-4 space-y-3 bg-gray-50/60 rounded-xl p-3 border border-gray-100">
                {/* Created Date */}
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <BadgePlus size={14} className="text-electricBlue" />
                  <span>
                    <span className="font-medium text-charcoalGray">
                      Created:
                    </span>{" "}
                    {formatDateWithTime(project.createdAt)}
                  </span>
                </div>

                {/* Updated Date */}
                {project.updatedAt !== project.createdAt && (
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <PenLine size={14} className="text-tealGreen" />
                    <span>
                      <span className="font-medium text-charcoalGray">
                        Updated:
                      </span>{" "}
                      {formatDateWithTime(project.updatedAt)}
                    </span>
                  </div>
                )}

                {/* Creator Info */}
                {project.createdBy && (
                  <div className="flex items-center gap-2 text-xs text-gray-600 pt-1 border-t border-gray-200">
                    <img
                      src={project.createdBy.avatar || Avatar}
                      alt={project.createdBy.name}
                      className="w-6 h-6 rounded-full border border-gray-200"
                    />
                    <span>
                      <span className="font-medium text-charcoalGray">By</span>{" "}
                      {project.createdBy.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
          <FolderKanban size={40} className="mb-3 text-gray-300" />
          <p className="text-sm">No projects available yet.</p>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
