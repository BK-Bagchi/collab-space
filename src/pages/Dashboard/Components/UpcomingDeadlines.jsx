import { CalendarDays, Clock } from "lucide-react";
import formatDate from "../../../utils/dateFormater";

const UpcomingDeadlines = ({
  upcomingDeadlines,
  selectedRange,
  setSelectedRange,
}) => {
  return (
    // Upcoming Deadlines
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="text-electricBlue" />
          <h3 className="text-lg font-semibold text-charcoalGray">
            Upcoming Deadlines
          </h3>
        </div>
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-softWhite text-charcoalGray focus:outline-none focus:ring-2 focus:ring-electricBlue transition"
        >
          <option value="15">Next 15 Days</option>
          <option value="30">Next 1 Month</option>
          <option value="60">Next 2 Months</option>
          <option value="90">Next 3 Months</option>
          <option value="120">Next 4 Months</option>
        </select>
      </div>

      <ul className="space-y-3">
        {upcomingDeadlines.length > 0 ? (
          <ul className="space-y-3">
            {upcomingDeadlines.map((task, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-softWhite p-3 rounded-lg border border-gray-100 hover:bg-[#F0F4FF] transition"
              >
                <span className="text-sm font-medium text-charcoalGray">
                  {task.title}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDate(task.deadline)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500">
            <Clock className="w-10 h-10 text-electricBlue mb-2" />
            <p className="text-sm font-medium">No upcoming deadlines!</p>
            <p className="text-xs text-gray-400 mt-1">
              Stay on track — new tasks with deadlines will appear here.
            </p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default UpcomingDeadlines;
