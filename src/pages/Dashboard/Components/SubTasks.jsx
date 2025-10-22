import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

const SubTasks = ({
  task,
  updating,
  openSubtasks,
  toggleSubtaskView,
  toggleSubtaskStatus,
}) => {
  return (
    // Subtasks section
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
              onClick={() => toggleSubtaskStatus(task._id, subtask)}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={subtask.done === true}
                  disabled={updating === subtask._id}
                  onChange={() => toggleSubtaskStatus(task._id, subtask)}
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
  );
};

export default SubTasks;
