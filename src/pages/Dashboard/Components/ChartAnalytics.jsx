import React from "react";
// prettier-ignore
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

//prettier-ignore
const COLORS = ["#2979FF", "#8E24AA", "#26A69A", "#FF7043", "#F44336", "#263238"];

const ChartAnalytics = ({ project }) => {
  const now = new Date();

  const overdueTasks = project.tasks.filter((t) => new Date(t.dueDate) < now);

  const nonOverdueTasks = project.tasks.filter(
    (t) => new Date(t.dueDate) >= now
  );

  const taskStats = [
    {
      name: "To Do",
      value: nonOverdueTasks.filter((t) => t.status === "TODO").length,
    },
    {
      name: "In Progress",
      value: nonOverdueTasks.filter((t) => t.status === "IN_PROGRESS").length,
    },
    {
      name: "Completed",
      value: nonOverdueTasks.filter((t) => t.status === "DONE").length,
    },
    {
      name: "Overdue",
      value: overdueTasks.length,
    },
  ];

  // console.log("project", project.title);
  // console.log("taskStats", taskStats);

  // Team performance
  const teamProgress = project.members.map((m) => ({
    name: m.name.split(" ")[0],
    progress: Math.floor(Math.random() * 100),
  }));

  return (
    <div className="flex flex-col gap-4">
      {/* Task Status Chart */}
      <div className="bg-gray-50 rounded-xl p-3 shadow-inner">
        <h4 className="text-sm text-gray-600 mb-2 font-medium">
          Task Status Overview:{" "}
          <span className="text-xs text-gray-600 mb-2 font-medium">
            Total {project.tasks.length} tasks
          </span>
        </h4>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={taskStats}
              cx="50%"
              cy="50%"
              outerRadius={55}
              dataKey="value"
              labelLine={false}
            >
              {taskStats.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Team Progress Chart */}
      <div className="bg-gray-50 rounded-xl p-3 shadow-inner">
        <h4 className="text-sm text-gray-600 mb-2 font-medium">
          Team Progress:{" "}
          <span className="text-xs text-gray-600 mb-2 font-medium">
            Total {project.members.length} members
          </span>
        </h4>

        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={teamProgress}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="progress" fill="#2979FF" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartAnalytics;
