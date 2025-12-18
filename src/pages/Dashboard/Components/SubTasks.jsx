import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

const SubTasks = ({
  task,
  updating,
  transparentWall = false,
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
          <ChevronUp className="w-3 h-3 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-3 h-3 dark:text-gray-400" />
        )}
        <span className="cursor-pointer hover:underline my-3 dark:text-gray-400">
          {openSubtasks[task._id]
            ? "Hide Subtasks"
            : `View Subtasks (${task.subtasks.length})`}
        </span>
      </button>

      {/* Collapsible List */}
      {openSubtasks[task._id] && (
        <ul
          className={`mt-2 pl-3 border-l border-gray-200 space-y-1 ${
            transparentWall && "relative"
          }`}
        >
          {task.subtasks.map((subtask) => (
            <li
              key={subtask._id}
              className="flex justify-between items-center text-xs text-gray-700"
              onClick={() => toggleSubtaskStatus(task._id, subtask)}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={subtask.done}
                  disabled={updating === subtask._id}
                  onChange={() => toggleSubtaskStatus(task._id, subtask)}
                  className="w-3 h-3 accent-electricBlue cursor-pointer"
                />
                <span
                  className={`transition ${
                    subtask.done
                      ? "line-through text-gray-400"
                      : "text-gray-700 dark:text-gray-200"
                  } cursor-pointer`}
                >
                  {subtask.title}
                </span>
              </div>
              <span className="text-gray-400">
                {subtask.done ? "Done" : "To Do"}
              </span>
            </li>
          ))}
          {transparentWall && (
            //  Transparent overlay (blocks clicks)
            <div className="absolute inset-0 bg-transparent pointer-events-auto"></div>
          )}
        </ul>
      )}
    </div>
  );
};

export default SubTasks;
