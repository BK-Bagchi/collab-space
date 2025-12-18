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

  // console.log("project", project);
  // console.log("taskStats", taskStats);

  // Team performance — only members assigned to at least one task
  const teamProgress = project.members
    .filter((m) =>
      project.tasks.some((t) => t.assignees?.some((a) => a._id === m._id))
    )
    .map((m) => {
      const assignedTasks = project.tasks.filter((t) =>
        t.assignees?.some((a) => a._id === m._id)
      );

      const totalSubtasks = assignedTasks.reduce(
        (acc, t) => acc + (t.subtasks?.length || 0),
        0
      );

      const completedSubtasks = assignedTasks.reduce(
        (acc, t) => acc + (t.subtasks?.filter((s) => s.done).length || 0),
        0
      );

      const progress =
        totalSubtasks > 0
          ? Math.round((completedSubtasks / totalSubtasks) * 100)
          : 0;

      return {
        name: m.name.split(" ")[0],
        progress,
      };
    });

  return (
    <div className="flex flex-col gap-4">
      {/* Task Status Chart */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 shadow-inner">
        <h4 className="text-sm text-gray-600 dark:text-gray-200 mb-2 font-medium">
          Task Status Overview:{" "}
          <span className="text-xs text-gray-600 dark:text-gray-300 mb-2 font-medium">
            Total {project.tasks.length} tasks
          </span>
        </h4>

        {/* Pie Chart */}
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

        {/* Legend Section */}
        <div className="flex flex-wrap justify-center gap-3 mt-3 text-xs">
          {taskStats.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-gray-600 dark:text-gray-200">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Team Progress Chart */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 shadow-inner">
        <h4 className="text-sm text-gray-600 dark:text-gray-200 mb-2 font-medium">
          Team Progress:{" "}
          <span className="text-xs text-gray-600 dark:text-gray-300 mb-2 font-medium">
            Total {project.members.length} members
          </span>
        </h4>

        {/* Bar Chart */}
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={teamProgress}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="progress" fill="#2979FF" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartAnalytics;
