import React from "react";
import { Plus, CalendarDays, User, Flag } from "lucide-react";

const placeholderTasks = {
  todo: [
    {
      id: 1,
      title: "Design login page UI",
      assignee: "Golu",
      dueDate: "2025-10-30",
      priority: "High",
    },
    {
      id: 2,
      title: "Prepare meeting notes",
      assignee: "Dipto",
      dueDate: "2025-11-02",
      priority: "Medium",
    },
  ],
  inProgress: [
    {
      id: 3,
      title: "Integrate authentication API",
      assignee: "Nusrat",
      dueDate: "2025-10-28",
      priority: "High",
    },
  ],
  completed: [
    {
      id: 4,
      title: "Setup project structure",
      assignee: "Rahim",
      dueDate: "2025-10-18",
      priority: "Low",
    },
  ],
};

const Tasks = () => {
  const columns = [
    { id: "todo", title: "To Do", color: "#2979FF" },
    { id: "inProgress", title: "In Progress", color: "#8E24AA" },
    { id: "completed", title: "Completed", color: "#26A69A" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-charcoalGray">
          🧩 Task Management Board
        </h2>
        <button className="flex items-center gap-2 bg-electricBlue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              {placeholderTasks[col.id].length > 0 ? (
                placeholderTasks[col.id].map((task) => (
                  <div
                    key={task.id}
                    className="bg-[#F9FAFB] p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
                  >
                    <h4 className="font-medium text-sm text-charcoalGray">
                      {task.title}
                    </h4>

                    <div className="flex justify-between items-center mt-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 text-electricBlue" />
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3 text-vibrantPurple" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mt-2">
                      <Flag
                        className={`w-3 h-3 ${
                          task.priority === "High"
                            ? "text-red-500"
                            : task.priority === "Medium"
                            ? "text-yellow-500"
                            : "text-tealGreen"
                        }`}
                      />
                      <span className="text-xs font-medium">
                        {task.priority} Priority
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
