import React, { useMemo } from "react";
// prettier-ignore
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const DeadlineProgress = ({ project }) => {
  // normalize dates
  const startDate = new Date(project.createdAt);
  const deadlineDate = project.deadline ? new Date(project.deadline) : null;
  const today = new Date();
  const endDate = deadlineDate && deadlineDate < today ? deadlineDate : today;

  // collect all subtasks and attach a resolved completion timestamp (if done)
  const { allSubtasks, totalSubtasks } = useMemo(() => {
    let subtasks = [];
    (project.tasks || []).forEach((task) => {
      const taskCreated = task.createdAt ? new Date(task.createdAt) : null;
      const taskUpdated = task.updatedAt ? new Date(task.updatedAt) : null;

      (task.subtasks || []).forEach((s) => {
        // resolve completion timestamp if available
        // prefer explicit completedAt (common), then subtask.updatedAt, then task.updatedAt, then task.createdAt, then project.createdAt
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
          completedAt, // null if not done
          taskTitle: task.title,
        });
      });
    });

    return { allSubtasks: subtasks, totalSubtasks: subtasks.length };
  }, [project]);

  // if no subtasks -> show small empty card (so caller can render fallback if needed)
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

  // build daily timeline from startDate to endDate (inclusive)
  const chartData = useMemo(() => {
    // clamp start to not be after end
    const s = startDate <= endDate ? startDate : endDate;
    const days = Math.max(1, Math.ceil((endDate - s) / (1000 * 60 * 60 * 24)));

    // create array of dates (as Date objects) for each day
    const dates = [];
    for (let i = 0; i <= days; i++) {
      const d = new Date(s);
      d.setDate(s.getDate() + i);
      // normalize time to midnight for comparisons
      d.setHours(0, 0, 0, 0);
      dates.push(d);
    }

    // for each date, count completed subtasks whose completedAt <= dateEnd
    const data = dates.map((date) => {
      // dateEnd = end of day
      const dateEnd = new Date(date);
      dateEnd.setHours(23, 59, 59, 999);

      const completedCount = allSubtasks.reduce((acc, sub) => {
        if (sub.done && sub.completedAt) {
          // compare completedAt <= dateEnd
          if (sub.completedAt <= dateEnd) return acc + 1;
          return acc;
        }
        return acc;
      }, 0);

      const pct = Math.round((completedCount / totalSubtasks) * 100);

      // label: use short date like "08/13" or "Day 1" if many days
      const dayDiff = Math.ceil((date - s) / (1000 * 60 * 60 * 24)) + 1;
      const label =
        dates.length <= 14
          ? `${date.getDate().toString().padStart(2, "0")}/${(
              date.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}`
          : `D${dayDiff}`;

      return {
        date: date.toISOString().slice(0, 10),
        label,
        completedCount,
        percent: pct,
      };
    });

    return data;
  }, [allSubtasks, startDate, endDate, totalSubtasks]);

  // last point percent
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
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 6, right: 12, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fontSize: 11 }}
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === "percent") return [`${value}%`, "Completed"];
                if (name === "completedCount")
                  return [value, "Completed subtasks"];
                return [value, name];
              }}
              labelFormatter={(lab) => {
                const point = chartData.find((d) => d.label === lab);
                return point ? `${point.date}` : lab;
              }}
              contentStyle={{ borderRadius: 8 }}
            />
            <Line
              type="monotone"
              dataKey="percent"
              stroke="#26A69A"
              strokeWidth={2.2}
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
