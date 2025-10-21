import React, { useEffect, useState } from "react";
import { CalendarDays, User, Flag } from "lucide-react";
import { TaskAPI } from "../../api";
import formatDate from "../../utils/dateFormater";
import formatText from "../../utils/textFormater";

const Tasks = () => {
  const columns = [
    { id: "todo", title: "To Do", color: "#2979FF", tasks: [] },
    { id: "inProgress", title: "In Progress", color: "#8E24AA", tasks: [] },
    { id: "completed", title: "Completed", color: "#26A69A", tasks: [] },
  ];
  const [task, setTask] = useState([]);

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
  columns[2].tasks = task?.filter((t) => t.status === "COMPLETED");
  // console.log(columns);

  return (
    <div className="bg-softWhite p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-charcoalGray">
          🧩 Task Management Board
        </h2>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div
            key={col.id}
            className="bg-white rounded-xl p-4 border-t-4 shadow-sm"
            style={{ borderTopColor: col.color }}
          >
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
                        {task.assignees.map((assignee) => (
                          <span>{assignee.name}</span>
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
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-10 text-gray-400">
                  <p className="text-sm font-medium">No tasks here yet.</p>
                  <p className="text-xs mt-1">Drag or create a new task.</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
