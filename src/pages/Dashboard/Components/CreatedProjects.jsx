import { useState } from "react";
// prettier-ignore
import { Calendar, CheckSquare, ChevronDown, ChevronRight, ListChecks, Trash2, Users } from "lucide-react";
import formatDate from "../../../utils/dateFormater";
import Avatar from "../../../assets/Default_Avatar.jpg";

const CreatedProjects = ({
  createdProjects,
  setSelectedProject,
  handleDeleteProject,
}) => {
  const [openProjects, setOpenProjects] = useState({});
  const [openTasks, setOpenTasks] = useState({});

  const toggleProject = (projectId) => {
    setOpenProjects((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  const toggleTask = (projectId, taskId) => {
    setOpenTasks((prev) => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        [taskId]: !prev[projectId]?.[taskId],
      },
    }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-lg font-semibold text-vibrantPurple mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-vibrantPurple rounded-full"></span>
        Created Projects
      </h2>

      {createdProjects.length > 0 ? (
        <div className="space-y-4">
          {createdProjects.map((project) => (
            <div
              key={project._id}
              className="p-4 rounded-xl border border-gray-200 bg-softWhite hover:shadow-md transition"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {/* Project Title */}
                  <h3
                    className="text-base font-semibold text-electricBlue hover:underline cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </h3>
                  {/* Color Dot */}
                  <span
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: project.color || "#2979FF" }}
                  ></span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProject(project._id);
                  }}
                  className="text-gray-500 hover:text-red-500 transition cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <p
                className="text-xs text-gray-600 mt-1 line-clamp-2 truncate"
                title={project.description}
              >
                {project.description}
              </p>

              {/* PROJECT META */}
              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                {/* Deadline */}
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{formatDate(project.deadline)}</span>
                </div>

                {/* Members */}
                <div className="flex items-center gap-1">
                  <Users size={14} className="text-tealGreen" />
                  <span>{project.members.length} members</span>

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

                    {/* + More indicator */}
                    {project.members?.length > 3 && (
                      <span className="w-6 h-6 flex items-center justify-center text-[10px] font-medium text-gray-700 bg-gray-200 rounded-full border-2 border-white shadow-sm">
                        +{project.members.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* ✅ COLLAPSIBLE TASKS SECTION */}
              <div className="mt-3 border-t border-gray-200 pt-2">
                <button
                  onClick={() => toggleProject(project._id)}
                  className="flex items-center gap-2 text-sm text-gray-700 font-medium hover:text-electricBlue transition"
                >
                  {openProjects[project._id] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                  {project.tasks.length} Assigned Task(s)
                </button>

                {openProjects[project._id] && (
                  <div className="mt-2 space-y-2">
                    {project.tasks.map((task) => {
                      const assignedMembers = project.members.filter((m) =>
                        task.assignees?.some((a) => a._id === m._id)
                      );

                      return (
                        <div
                          key={task._id}
                          className="border border-gray-200 rounded-lg bg-white p-2 shadow-sm"
                        >
                          {/* TASK HEADER */}
                          <div
                            onClick={() => toggleTask(project._id, task._id)}
                            className="flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md transition"
                          >
                            <div className="flex items-center gap-2">
                              {openTasks[project._id]?.[task._id] ? (
                                <ChevronDown
                                  size={14}
                                  className="text-electricBlue"
                                />
                              ) : (
                                <ChevronRight
                                  size={14}
                                  className="text-electricBlue"
                                />
                              )}
                              <span className="font-medium text-sm text-charcoalGray">
                                {task.title}
                              </span>

                              {/* 👤 Assigned Members */}
                              <div className="flex -space-x-2 ml-1">
                                {assignedMembers.length > 0 ? (
                                  assignedMembers.map((member) => (
                                    <img
                                      key={member._id}
                                      src={
                                        member.avatar ||
                                        `https://ui-avatars.com/api/?name=${member.name}&background=random`
                                      }
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

                            <span className="text-xs text-gray-400">
                              {task.subtasks?.length || 0} subtasks
                            </span>
                          </div>

                          {/* SUBTASKS */}
                          {openTasks[project._id]?.[task._id] &&
                            task.subtasks?.length > 0 && (
                              <div className="ml-6 mt-1 border-l border-gray-100 pl-3 space-y-1">
                                {task.subtasks.map((subtask) => (
                                  <div
                                    key={subtask._id}
                                    className="flex justify-between items-center py-1 px-2 rounded-md hover:bg-gray-50 cursor-pointer transition"
                                  >
                                    <div className="flex items-center gap-2">
                                      {subtask.done ? (
                                        <CheckSquare
                                          size={12}
                                          className="text-tealGreen"
                                        />
                                      ) : (
                                        <ListChecks
                                          size={12}
                                          className="text-gray-400"
                                        />
                                      )}
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
                                      {subtask.status || "Pending"}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No created projects yet.</p>
      )}
    </div>
  );
};

export default CreatedProjects;
