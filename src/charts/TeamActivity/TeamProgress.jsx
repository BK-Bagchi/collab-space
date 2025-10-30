// prettier-ignore
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const TeamProgress = ({ project }) => {
  const teamProgress = project.members.map((member) => {
    const assignedTasks = project.tasks.filter((t) =>
      t.assignees?.some((a) => a._id === member._id)
    );

    const totalSubtasks = assignedTasks.reduce(
      (acc, t) => acc + (t.subtasks?.length || 0),
      0
    );

    const completedSubtasks = assignedTasks.reduce(
      (acc, t) => acc + (t.subtasks?.filter((s) => s.done).length || 0),
      0
    );

    const completed =
      Math.round((completedSubtasks / totalSubtasks) * 100) || 0;
    const remaining = 100 - completed;

    return {
      name: member.name.split(" ")[0],
      Completed: completed,
      Remaining: remaining,
    };
  });

  return (
    <div className="rounded-xl p-4 w-full">
      <h4 className="text-sm font-medium text-gray-700 mb-3">
        Team Progress —{" "}
        <span className="text-xs text-gray-500">{project.title}</span>
      </h4>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={teamProgress}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar
            dataKey="Completed"
            stackId="a"
            fill="#26A69A"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="Remaining"
            stackId="a"
            fill="#F44336"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-4 mt-2 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#26A69A]" /> Completed
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#F44336]" /> Remaining
        </div>
      </div>
    </div>
  );
};

export default TeamProgress;
