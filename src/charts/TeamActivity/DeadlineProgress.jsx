import React, { useMemo } from "react";
// prettier-ignore
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const DeadlineProgress = ({ project }) => {
  // 🟢 Memoize static dates so they don't recreate every render
  const startDate = useMemo(
    () => new Date(project.createdAt),
    [project.createdAt]
  );
  const deadlineDate = useMemo(
    () => (project.deadline ? new Date(project.deadline) : null),
    [project.deadline]
  );

  const today = new Date();
  const endDate = deadlineDate && deadlineDate < today ? deadlineDate : today;

  // 🟢 Collect all subtasks and attach completion timestamps
  const { allSubtasks, totalSubtasks } = useMemo(() => {
    const subtasks = [];

    (project.tasks || []).forEach((task) => {
      const taskCreated = task.createdAt ? new Date(task.createdAt) : null;
      const taskUpdated = task.updatedAt ? new Date(task.updatedAt) : null;

      (task.subtasks || []).forEach((s) => {
        const completedAtRaw =
          s.completedAt ||
          s.updatedAt ||
          taskUpdated ||
          taskCreated ||
          project.createdAt;
        const completedAt = s.done ? new Date(completedAtRaw) : null;

        subtasks.push({
          ...s,
          done: Boolean(s.done),
          completedAt,
        });
      });
    });

    return { allSubtasks: subtasks, totalSubtasks: subtasks.length };
  }, [project]);

  // 🟢 Build weekly timeline (instead of daily)
  const chartData = useMemo(() => {
    if (!totalSubtasks) return [];

    const s = startDate <= endDate ? startDate : endDate;
    const daysBetween = Math.max(
      1,
      Math.ceil((endDate - s) / (1000 * 60 * 60 * 24))
    );
    const totalWeeks = Math.ceil(daysBetween / 7);

    const weeks = [];
    for (let i = 0; i <= totalWeeks; i++) {
      const weekStart = new Date(s);
      weekStart.setDate(s.getDate() + i * 7);
      weekStart.setHours(0, 0, 0, 0);
      weeks.push(weekStart);
    }

    const data = weeks.map((weekStart, index) => {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      const completedCount = allSubtasks.reduce((acc, sub) => {
        if (sub.done && sub.completedAt && sub.completedAt <= weekEnd) {
          return acc + 1;
        }
        return acc;
      }, 0);

      const percent = Math.round((completedCount / totalSubtasks) * 100);

      return {
        week: `Week ${index + 1}`,
        completed: completedCount,
        percent,
      };
    });

    return data;
  }, [allSubtasks, startDate, endDate, totalSubtasks]);

  // 🟢 Early return safely (hooks are all above)
  if (totalSubtasks === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-charcoalGray">
            Deadline Progress
          </h3>
          <p className="text-xs text-gray-400">No subtasks</p>
        </div>
        <div className="py-12 text-center text-sm text-gray-500">
          This project has no tasks or subtasks to track progress for.
        </div>
      </div>
    );
  }

  const lastPoint = chartData[chartData.length - 1] || {};
  const finalPercent = lastPoint.percent ?? 0;

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-charcoalGray">
          Deadline Progress
        </h3>
        <div className="text-right">
          <div className="text-xs text-gray-400">Progress</div>
          <div className="text-sm font-medium text-charcoalGray">
            {finalPercent}%
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height={256}>
          <LineChart data={chartData}>
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <Tooltip
              formatter={(v) => `${v}% completed`}
              labelStyle={{ color: "#263238" }}
            />
            <Line
              type="monotone"
              dataKey="percent"
              stroke="#2979FF"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
        <div>
          Start:{" "}
          <span className="font-medium text-charcoalGray">
            {new Date(startDate).toLocaleDateString()}
          </span>
        </div>
        <div>
          End:{" "}
          <span className="font-medium text-charcoalGray">
            {deadlineDate
              ? new Date(deadlineDate).toLocaleDateString()
              : "No deadline"}
          </span>
        </div>
        <div>
          Subtasks:{" "}
          <span className="font-medium text-charcoalGray">{totalSubtasks}</span>
        </div>
      </div>
    </div>
  );
};

export default DeadlineProgress;
