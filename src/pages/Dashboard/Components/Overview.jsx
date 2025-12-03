import { useNavigate } from "react-router-dom";

const Overview = ({ stats }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
      {stats.slice(0, 2).map((item, i) => (
        <div
          key={i}
          className="rounded-xl shadow-md bg-white p-5 border border-gray-100 hover:shadow-lg transition"
        >
          <h3 className="text-sm text-gray-500">{item.label}</h3>
          <p
            className="text-3xl font-semibold mt-2"
            style={{ color: item.color }}
          >
            {item.value}
          </p>
          {item.value > 0 && (
            <span
              className="text-xs text-[#263238] hover:underline hover:text-electricBlue cursor-pointer"
              onClick={() => navigate("/dashboard/projects")}
            >
              View All
            </span>
          )}
        </div>
      ))}
      {stats.slice(2, 4).map((item, i) => (
        <div
          key={i}
          className="rounded-xl shadow-md bg-white p-5 border border-gray-100 hover:shadow-lg transition"
        >
          <h3 className="text-sm text-gray-500">{item.label}</h3>
          <p
            className="text-3xl font-semibold mt-2"
            style={{ color: item.color }}
          >
            {item.value}
          </p>
          {item.value > 0 && (
            <span
              className="text-xs text-[#263238] hover:underline hover:text-electricBlue cursor-pointer"
              onClick={() => navigate("/dashboard/tasks")}
            >
              View All
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Overview;
