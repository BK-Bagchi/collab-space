import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// prettier-ignore
import { Users, CalendarDays, BadgePlus, PenLine, CircleCheckBig, ChevronDown, ChevronRight, CheckSquare, ListChecks } from "lucide-react";
import formatDate, { formatDateWithTime } from "../../utils/dateFormater";
import Avatar from "../../assets/Default_Avatar.jpg";
import ChartAnalytics from "../../pages/Dashboard/Components/ChartAnalytics";

const ProjectDetailsCard = ({ projects, navigateURL = false }) => {
  const navigate = useNavigate();

  const [openTasks, setOpenTasks] = useState({});
  const toggleTask = (taskId) => {
    setOpenTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  return (
    <>
      {projects.map((project) => (
        <div
          key={project._id}
          className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 transition p-5 flex gap-6"
        >
          {/* Project Info section */}
          <div className="w-full">
            {/* Header */}
            <div
              className="flex justify-between items-center mb-3"
              onClick={
                navigateURL
                  ? () => navigate(`/dashboard/manage-projects/${project._id}`)
                  : undefined
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
                <CircleCheckBig size={14} className="text-electricBlue" />
                <span>{project.tasks?.length || 0} Assigned Tasks</span>
              </div>
            </div>

            {/* Total Members */}
            <div className="flex items-center text-xs text-gray-500 mb-3">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-tealGreen" />
                <span className="font-medium">
                  {project.members?.length || 0} Members{" "}
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
                  <span className="text-gray-400 text-[10px]">No members</span>
                )}

                {/* + More indicator */}
                {project.members?.length > 3 && (
                  <span className="w-6 h-6 flex items-center justify-center text-[10px] font-medium text-gray-700 bg-gray-200 rounded-full border-2 border-white shadow-sm">
                    +{project.members.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Collapsible List of task with subtasks */}
            {navigateURL && (
              <div className="space-y-2">
                {project.tasks && project.tasks.length > 0 ? (
                  project.tasks.map((task) => {
                    // find which members are assigned to this task
                    const assignedMembers = project.members?.filter((member) =>
                      task.assignees?.some(
                        (assignee) => assignee._id === member._id
                      )
                    );

                    return (
                      <div
                        key={task._id}
                        className="border border-gray-200 rounded-lg p-2 bg-white shadow-sm"
                      >
                        {/* Task Header */}
                        <div
                          onClick={() => toggleTask(task._id)}
                          className="flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md transition"
                        >
                          <div className="flex items-center gap-2">
                            {openTasks[task._id] ? (
                              <ChevronDown
                                size={16}
                                className="text-electricBlue"
                              />
                            ) : (
                              <ChevronRight
                                size={16}
                                className="text-electricBlue"
                              />
                            )}
                            <span className="font-medium text-sm text-charcoalGray">
                              {task.title}
                            </span>

                            {/* ✅ Assigned Members (avatars + hover name) */}
                            <div className="flex -space-x-2 ml-2">
                              {assignedMembers?.length > 0 ? (
                                assignedMembers.map((member) => (
                                  <img
                                    key={member._id}
                                    src={member.avatar || Avatar}
                                    title={member.name}
                                    alt={member.name}
                                    className="w-5 h-5 rounded-full border border-white hover:scale-110 transition-transform"
                                  />
                                ))
                              ) : (
                                <span className="text-[10px] text-gray-400 ml-1">
                                  Unassigned
                                </span>
                              )}
                            </div>
                          </div>

                          <span className="text-xs text-gray-500">
                            {task.subtasks?.length || 0} subtasks
                          </span>
                        </div>

                        {/* Subtasks */}
                        {openTasks[task._id] && task.subtasks?.length > 0 && (
                          <div className="ml-6 mt-2 border-l border-gray-200 pl-3 space-y-1">
                            {task.subtasks.map((subtask) => (
                              <div
                                key={subtask._id}
                                className="flex justify-between items-center py-1 px-2 rounded-md hover:bg-gray-50 cursor-pointer transition"
                              >
                                <div className="flex items-center gap-2">
                                  <CheckSquare
                                    size={14}
                                    className="text-tealGreen"
                                  />
                                  <span
                                    className={`text-xs ${
                                      subtask.done
                                        ? "line-through text-gray-400"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    {subtask.title}
                                  </span>
                                </div>
                                <span className="text-[10px] text-gray-400">
                                  {subtask.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-gray-500">No assigned tasks.</p>
                )}
              </div>
            )}

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

          {/* Charts Section */}
          {!navigateURL && (
            <div className="w-full">
              <ChartAnalytics project={project} />
              {/* <p>this is chart section</p> */}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ProjectDetailsCard;
