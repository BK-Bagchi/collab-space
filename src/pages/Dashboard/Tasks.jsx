import { useEffect, useState } from "react";
// prettier-ignore
import { CalendarDays, User, Flag, ChevronRight, ChevronLeft, ChevronUp, ChevronDown } from "lucide-react";
import { TaskAPI } from "../../api";
import formatDate from "../../utils/dateFormater";
import formatText from "../../utils/textFormater";
import StatusSlider from "./Components/StatusSlider";

const Tasks = () => {
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
  const [updating, setUpdating] = useState(null);
  // console.log(openSubtasks);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await TaskAPI.assignedTaskToUser();
        setTask(res.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error.response);
      }
    };

    fetchTasks();
  }, []);
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

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const res = await TaskAPI.updateTaskStatus(taskId, { status: newStatus });
      setTask((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
      );
      alert(res.data.message);
    } catch (err) {
      console.error("Error updating status:", err.response);
    }
  };

  const toggleSubtaskView = (taskId) => {
    setOpenSubtasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const toggleSubtaskStatus = async (taskId, subtask) => {
    const newStatus = !subtask.done;
    setUpdating(subtask._id);
    const id = taskId;
    const data = {
      action: "update",
      subtasks: { ...subtask, done: newStatus },
      subTaskId: subtask._id,
    };
    // console.log(data, id);

    try {
      const res = await TaskAPI.updateSubtasks(id, data);
      alert(res.data.message);

      // Updating UI state instead of full refresh
      setTask((prev) =>
        prev.map((t) =>
          t._id === taskId
            ? {
                ...t,
                subtasks: t.subtasks.map((s) =>
                  s._id === subtask._id ? { ...s, done: newStatus } : s
                ),
              }
            : t
        )
      );
      setUpdating(null);
    } catch (err) {
      console.error("Failed updating subtask:", err.response);
    }
  };

  return (
    <div className="flex gap-6 overflow-x-auto transition-all duration-300">
      {columns.map((col) => {
        const isVisible = visibleColumns.includes(col.id);

        return (
          <div
            key={col.id}
            // className={`relative transition-all duration-500 ease-in-out ${
            //   isVisible ? "opacity-100" : "opacity-70"
            // } bg-white rounded-xl p-3 border-t-4 shadow-sm flex-shrink-0`}
            className={`relative transition-all duration-500 ease-in-out bg-white rounded-xl p-3 border-t-4 shadow-sm flex-shrink-0`}
            style={{
              borderTopColor: col.color,
              width: isVisible ? "calc(33.333% - 1.5rem)" : "2.5rem",
              maxHeight: isVisible ? "auto" : "200px",
            }}
          >
            {/* Collapse / Expand Button */}
            <button
              onClick={() => toggleColumn(col.id)}
              className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1 shadow hover:shadow-md hover:bg-gray-50 transition"
            >
              {isVisible ? (
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
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
                  ></span>
                  {col.title}
                </h3>

                {/* Task List */}
                <div className="space-y-3">
                  {col.tasks.length > 0 ? (
                    col.tasks.map((task) => (
                      <div
                        key={task._id}
                        className="bg-[#F9FAFB] p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
                      >
                        <h4 className="font-medium text-sm text-charcoalGray">
                          {task.title}
                        </h4>

                        <div className="flex justify-between items-center mt-3 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            {task.assignees.length > 0 && (
                              <User className="w-3 h-3 text-electricBlue" />
                            )}
                            {task.assignees.map((a, i) => (
                              <span key={i}>{a.name}</span>
                            ))}
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarDays className="w-3 h-3 text-vibrantPurple" />
                            <span>{formatDate(task.dueDate)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 mt-2">
                          <Flag
                            className={`w-3 h-3 ${
                              task.priority === "HIGH"
                                ? "text-red-500"
                                : task.priority === "MEDIUM"
                                ? "text-yellow-500"
                                : "text-tealGreen"
                            }`}
                          />
                          <span className="text-xs font-medium">
                            {formatText(task.priority)} Priority
                          </span>
                        </div>

                        {/* Subtasks Section */}
                        {task.subtasks.length > 0 && (
                          <div className="mt-2">
                            {/* Toggle Open */}
                            <button
                              onClick={() => toggleSubtaskView(task._id)}
                              className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 transition"
                            >
                              {openSubtasks[task._id] ? (
                                <ChevronUp className="w-3 h-3" />
                              ) : (
                                <ChevronDown className="w-3 h-3" />
                              )}
                              <span className="cursor-pointer hover:underline my-3">
                                {openSubtasks[task._id]
                                  ? "Hide Subtasks"
                                  : `View Subtasks (${task.subtasks.length})`}
                              </span>
                            </button>

                            {/* Collapsible List */}
                            {openSubtasks[task._id] && (
                              <ul className="mt-2 pl-3 border-l border-gray-200 space-y-1">
                                {task.subtasks.map((subtask) => (
                                  <li
                                    key={subtask._id}
                                    className="flex justify-between items-center text-xs text-gray-700"
                                    onClick={() =>
                                      toggleSubtaskStatus(task._id, subtask)
                                    }
                                  >
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="checkbox"
                                        checked={subtask.done === true}
                                        disabled={updating === subtask._id}
                                        onChange={() =>
                                          toggleSubtaskStatus(task._id, subtask)
                                        }
                                        className="w-3 h-3 accent-electricBlue cursor-pointer"
                                      />
                                      <span
                                        className={`transition ${
                                          subtask.done === true
                                            ? "line-through text-gray-400"
                                            : "text-gray-700"
                                        } cursor-pointer`}
                                      >
                                        {subtask.title}
                                      </span>
                                    </div>
                                    <span className="text-gray-400">
                                      {subtask.done === true ? "Done" : "To Do"}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}

                        <div className="w-full py-2">
                          <StatusSlider
                            value={task.status}
                            onChange={(newStatus) =>
                              handleStatusChange(task._id, newStatus)
                            }
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-10 text-gray-400">
                      <p className="text-sm font-medium">No tasks here yet.</p>
                      <p className="text-xs mt-1">Drag or create a new task.</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // When Collapsed: Just show vertical text
              <div className="flex items-center justify-center h-full rotate-180 [writing-mode:vertical-rl] text-gray-600 text-sm font-semibold tracking-wider">
                {col.title}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Tasks;
