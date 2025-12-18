import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// prettier-ignore
import { CalendarDays, User, Flag, ChevronRight, ChevronLeft, FolderKanban, AlertCircle } from "lucide-react";
import { TaskAPI } from "../../api";
import formatDate from "../../utils/dateFormater";
import formatText from "../../utils/textFormater";
import StatusSlider from "./Components/StatusSlider";
import SubTasks from "./Components/SubTasks";
import Loading from "../../components/Loading/Loading";

const ManageUsersTaskList = () => {
  const { projectId } = useParams();
  const columns = [
    { id: "todo", title: "To Do", color: "#2979FF", tasks: [] },
    { id: "inProgress", title: "In Progress", color: "#8E24AA", tasks: [] },
    { id: "completed", title: "Completed", color: "#26A69A", tasks: [] },
  ];
  const [task, setTask] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => col.id)
  );
  const [openSubtasks, setOpenSubtasks] = useState({});
  const [loading, setLoading] = useState(true);
  // console.log(openSubtasks);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await TaskAPI.getProjectTasks(projectId);
        setTask(res.data.tasks);
      } catch (error) {
        console.warn("Error fetching tasks:", error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);
  // console.log(task);

  // include tasks in each column
  columns[0].tasks = task?.filter((t) => t.status === "TODO");
  columns[1].tasks = task?.filter((t) => t.status === "IN_PROGRESS");
  columns[2].tasks = task?.filter((t) => t.status === "DONE");
  // console.log(columns);

  const toggleColumn = (id) => {
    setVisibleColumns((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleSubtaskView = (taskId) => {
    setOpenSubtasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  return (
    <div className="flex gap-6 overflow-x-auto transition-all duration-300">
      {columns.map((col) => {
        const isVisible = visibleColumns.includes(col.id);

        return (
          <div
            key={col.id}
            className="relative transition-all duration-500 ease-in-out bg-white dark:bg-darkSlate rounded-xl p-3 border-t-4 shadow-sm shrink-0"
            style={{
              borderTopColor: col.color,
              width: isVisible ? "calc(33.333% - 1.5rem)" : "2.5rem",
              maxHeight: !isVisible && "200px",
            }}
          >
            {/* Collapse / Expand Button */}
            <button
              onClick={() => toggleColumn(col.id)}
              className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white dark:bg-darkSlate border border-gray-200 dark:border-gray-700  rounded-full p-1 shadow hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              {isVisible ? (
                <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {isVisible ? (
              <>
                {/* Column Header */}
                <h3
                  className="text-lg font-semibold mb-4 flex items-center gap-2"
                  style={{ color: col.color }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: col.color }}
                  />
                  {col.title}
                </h3>

                {/* Task List */}
                <Loading loading={loading}>
                  <div className="space-y-3">
                    {col.tasks.length > 0 ? (
                      col.tasks.map((task) => (
                        <div
                          key={task._id}
                          className={`bg-[#F9FAFB] dark:bg-gray-700 
                                    p-4 rounded-lg shadow-sm border 
                                    ${
                                      new Date(task.dueDate) < new Date()
                                        ? "border-red-600"
                                        : "border-gray-100 dark:border-gray-600"
                                    } 
                                    hover:shadow-md transition`}
                        >
                          <h4 className="font-medium text-lg text-charcoalGray dark:text-softWhite">
                            {task.title}
                          </h4>

                          <div className="flex justify-between items-center mt-3 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center gap-1">
                              {task.assignees.length > 0 && (
                                <User className="w-4 h-4 text-electricBlue" />
                              )}
                              {task.assignees.map((a, i) => (
                                <span key={i}>{a.name}</span>
                              ))}
                            </div>

                            <div className="flex items-center gap-1">
                              {new Date(task.dueDate) < new Date() ? (
                                <>
                                  <AlertCircle className="w-4 h-4 text-red-600" />
                                  <span className="text-red-600">
                                    {formatDate(task.dueDate)}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <CalendarDays className="w-4 h-4 text-vibrantPurple" />
                                  <span>{formatDate(task.dueDate)}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-3 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center gap-1">
                              <FolderKanban className="w-4 h-4 text-vibrantPurple" />
                              <span>{task.project.title}</span>
                            </div>

                            <div className="flex items-center gap-1">
                              <Flag
                                className={`w-4 h-4 ${
                                  task.priority === "HIGH"
                                    ? "text-red-500"
                                    : task.priority === "MEDIUM"
                                    ? "text-yellow-500"
                                    : "text-tealGreen"
                                }`}
                              />
                              <span className="font-medium">
                                {formatText(task.priority)} Priority
                              </span>
                            </div>
                          </div>

                          {/* Subtasks Section */}
                          {task.subtasks.length > 0 && (
                            <SubTasks
                              task={task}
                              updating={null}
                              transparentWall={true}
                              openSubtasks={openSubtasks}
                              toggleSubtaskView={toggleSubtaskView}
                              toggleSubtaskStatus={null}
                            />
                          )}

                          <div className="w-full py-2 relative">
                            <StatusSlider value={task.status} />
                            <div className="absolute inset-0 bg-transparent pointer-events-auto" />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center py-10 text-gray-400 dark:text-gray-500">
                        <p className="text-sm font-medium">
                          No tasks here yet.
                        </p>
                        <p className="text-xs mt-1">
                          Drag or create a new task.
                        </p>
                      </div>
                    )}
                  </div>
                </Loading>
              </>
            ) : (
              // Collapsed column
              <div className="flex items-center justify-center h-full rotate-180 [writing-mode:vertical-rl]  text-gray-600 dark:text-gray-300  text-sm font-semibold tracking-wider">
                {col.title}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ManageUsersTaskList;
