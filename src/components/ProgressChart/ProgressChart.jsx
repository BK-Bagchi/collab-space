// prettier-ignore
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const ProgressChart = ({ projectProgressData }) => {
  return (
    <div className="grid grid-cols-1 gap-6 mb-8 p-4 rounded-xl bg-white shadow-sm">
      <h3 className="text-lg font-semibold text-charcoalGray mb-4">
        Task progress in assigned projects
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={projectProgressData} barGap={10}>
          <XAxis dataKey="project" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip
            contentStyle={{
              fontSize: "12px",
              borderRadius: "8px",
            }}
            formatter={(value, name) =>
              name === "completed"
                ? [`${value}`, "Completed"]
                : [`${value}`, "Remaining"]
            }
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />

          {/* Green for completed */}
          <Bar
            dataKey="completed"
            stackId="a"
            fill="#2ECC71"
            radius={[0, 0, 4, 4]}
          />

          {/* Red for remaining */}
          <Bar
            dataKey="remaining"
            stackId="a"
            fill="#2979ff"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
