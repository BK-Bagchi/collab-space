// prettier-ignore
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#2979FF", "#8E24AA", "#26A69A", "#FF7043"];

const TaskStatus = ({ project }) => {
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
    { name: "Overdue", value: overdueTasks.length },
  ];

  return (
    <div className="rounded-xl p-4 w-full dark:bg-gray-600">
      <h4 className="text-lg text-charcoalGray mb-3">
        <span className="font-semibold dark:text-softWhite">
          {" "}
          Task Status —
        </span>{" "}
        <span className="text-xs text-gray-500 dark:text-gray-300">
          {project.title} —{" "}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-300">
          Total Tasks: {project.tasks.length}
        </span>
      </h4>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={taskStats}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            dataKey="value"
            labelLine={false}
          >
            {taskStats.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap justify-center gap-3 mt-3 text-xs">
        {taskStats.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-gray-600 dark:text-gray-200">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStatus;
