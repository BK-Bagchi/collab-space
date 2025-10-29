import { useState } from "react";
import { AlertTriangle, CircleCheckBig, BarChart3, List } from "lucide-react";
// prettier-ignore
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import formatDate from "../../../utils/dateFormater";
import formatText from "../../../utils/textFormater";

//prettier-ignore
const COLORS = ["#2979FF", "#8E24AA", "#26A69A", "#FF7043", "#F44336", "#263238"];

const OverdueTasks = ({ tasks }) => {
  // console.log(tasks);

  const totalTasks = tasks.length;
  const todoCount = tasks.filter((t) => t.status === "TODO").length;
  const inProgressCount = tasks.filter(
    (t) => t.status === "IN_PROGRESS"
  ).length;
  const doneCount = tasks.filter((t) => t.status === "DONE").length;

  // Count overdue tasks
  const overdueTasks = tasks.filter(
    (t) => t.status !== "DONE" && new Date(t.dueDate) < new Date()
  );
  const overdueCount = overdueTasks.length;

  const [activeTab, setActiveTab] = useState(
    totalTasks > 0 ? "chart" : "table"
  );
  const data = [
    { name: "To Do", value: todoCount },
    { name: "In Progress", value: inProgressCount },
    { name: "Done", value: doneCount },
    { name: "Overdue", value: overdueCount },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-charcoalGray flex items-center gap-2">
          <AlertTriangle className="text-electricBlue" />
          Task Overview
        </h3>

        {/* Tabs */}
        {totalTasks > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("chart")}
              className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition ${
                activeTab === "chart"
                  ? "bg-electricBlue text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <BarChart3 size={16} />
              Summary
            </button>
            <button
              onClick={() => setActiveTab("table")}
              className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition ${
                activeTab === "table"
                  ? "bg-electricBlue text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <List size={16} />
              Overdue List
            </button>
          </div>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === "chart" ? (
        totalTasks > 0 && (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Total summary */}
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>
                Total Tasks:{" "}
                <span className="font-semibold text-charcoalGray">
                  {totalTasks}
                </span>
              </p>
            </div>
          </div>
        )
      ) : (
        // Table view
        <>
          {overdueTasks.length > 0 ? (
            <div className="overflow-x-auto mt-2">
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
                          {task.project?.title || "Untitled Project"}
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
        </>
      )}
    </div>
  );
};

export default OverdueTasks;
