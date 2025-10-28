import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#2979FF", "#8E24AA", "#26A69A", "#FF7043"];

const ChartAnalytics = ({ project }) => {
  const taskStats = [
    { name: "Total", value: project.tasks.length },
    {
      name: "To Do",
      value: project.tasks.filter((t) => t.status === "TODO").length,
    },
    {
      name: "In Progress",
      value: project.tasks.filter((t) => t.status === "IN_PROGRESS").length,
    },
    {
      name: "Completed",
      value: project.tasks.filter((t) => t.status === "COMPLETED").length,
    },
    {
      name: "Overdue",
      value: project.tasks.filter((t) => t.status === "OVERDUE").length,
    },
  ];

  // Mock team performance (to be replaced by real data later)
  const teamProgress = project.members.map((m, i) => ({
    name: `Member ${i + 1}`,
    progress: Math.floor(Math.random() * 100),
  }));

  return (
    <div className="flex flex-col gap-4">
      {/* Task Status Chart */}
      <div className="bg-gray-50 rounded-xl p-3 shadow-inner">
        <h4 className="text-xs text-gray-600 mb-2 font-medium">
          Task Status Overview
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Team Progress Chart */}
      <div className="bg-gray-50 rounded-xl p-3 shadow-inner">
        <h4 className="text-xs text-gray-600 mb-2 font-medium">
          Team Progress
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
