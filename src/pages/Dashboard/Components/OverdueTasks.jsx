import { AlertTriangle, CircleCheckBig } from "lucide-react";
import formatDate from "../../../utils/dateFormater";
import formatText from "../../../utils/textFormater";

const OverdueTasks = ({ overdueTasks }) => {
  return (
    // Overdue Tasks
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-electricBlue" />
        <h3 className="text-lg font-semibold text-charcoalGray">
          Overdue Tasks
          {overdueTasks.length > 0 && ` : Found (${overdueTasks.length})`}
        </h3>
      </div>

      {/* Task List */}
      {overdueTasks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white rounded-lg">
            <thead className="bg-[#F9FAFB] border-b">
              <tr className="text-left text-sm text-gray-600">
                <th className="py-3 px-4 font-semibold">Task</th>
                <th className="py-3 px-4 font-semibold">Project</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {overdueTasks.map((task) => {
                const { _id, title, status, dueDate } = task;
                return (
                  <tr
                    key={_id}
                    className="border-b hover:bg-[#FFF0F0] transition text-sm text-charcoalGray"
                  >
                    <td className="py-3 px-4 font-medium">{title}</td>
                    <td className="py-3 px-4">
                      {task.project?.title || "Dummy Project"}
                    </td>
                    <td className="py-3 px-4">{formatText(status)}</td>
                    <td className="py-3 px-4 text-red-500 font-medium">
                      {formatDate(dueDate)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500">
          <CircleCheckBig className="w-10 h-10 text-electricBlue mb-2" />
          <p className="text-sm font-medium">No overdue tasks!</p>
          <p className="text-xs text-gray-400 mt-1">
            You’re all caught up — stay consistent to keep it that way.
          </p>
        </div>
      )}
    </div>
  );
};

export default OverdueTasks;
