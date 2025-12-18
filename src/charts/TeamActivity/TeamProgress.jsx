// prettier-ignore
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const TeamProgress = ({ project }) => {
  const colors = ["#26A69A", "#8E24AA"]; //["Completed", "Remaining"];

  const teamProgress = project.members.map((member) => {
    const assignedTasks = project.tasks.filter((t) =>
      t.assignees?.some((a) => a._id === member._id)
    );

    if (assignedTasks.length === 0) {
      return {
        name: member.name.split(" ")[0],
        Completed: 0,
        Remaining: 0,
      };
    }

    const totalSubtasks = assignedTasks.reduce(
      (acc, t) => acc + (t.subtasks?.length || 0),
      0
    );

    const completedSubtasks = assignedTasks.reduce(
      (acc, t) => acc + (t.subtasks?.filter((s) => s.done).length || 0),
      0
    );

    // Handle edge case where totalSubtasks is 0 (tasks exist but have no subtasks)
    const completed =
      totalSubtasks > 0
        ? Math.round((completedSubtasks / totalSubtasks) * 100)
        : 0;

    const remaining = 100 - completed;

    return {
      name: member.name.split(" ")[0],
      Completed: completed,
      Remaining: remaining,
    };
  });

  return (
    <div className="rounded-xl p-4 w-full dark:bg-gray-600">
      <h4 className="text-lg text-charcoalGray dark:text-softWhite mb-3">
        <span className="font-semibold">Team Progress —</span>{" "}
        <span className="text-xs text-gray-500 dark:text-gray-300">
          {project.title}
        </span>
      </h4>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={teamProgress}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar
            dataKey="Completed"
            stackId="a"
            fill={colors[0]}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="Remaining"
            stackId="a"
            fill={colors[1]}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-4 mt-2 text-xs text-gray-600 dark:text-gray-200">
        <div className="flex items-center gap-1">
          <div className={`w-3 h-3 rounded-full bg-[${colors[0]}]`} /> Completed
        </div>
        <div className="flex items-center gap-1">
          <div className={`w-3 h-3 rounded-full bg-[${colors[1]}]`} /> Remaining
        </div>
      </div>
    </div>
  );
};

export default TeamProgress;
