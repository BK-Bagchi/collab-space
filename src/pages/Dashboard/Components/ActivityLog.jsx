import React, { useEffect, useState } from "react";
import { FileClock, MessageSquare } from "lucide-react";
import { ActivityAPI } from "../../../api";
import { formatDateWithTime } from "../../../utils/dateFormater";

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await ActivityAPI.userActivity();
        setActivities(res.data.activities);
      } catch (error) {
        console.warn("Error fetching activity:", error.response.data.message);
      }
    };
    fetchActivity();
  }, []);
  //   console.log(activities);
  const recentActivities = activities.slice(0, 10);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 max-h-[480px] overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="text-vibrantPurple" />
        <h3 className="text-lg font-semibold">Activity Log</h3>
      </div>
      {recentActivities.length > 0 ? (
        <ul className="space-y-3">
          {recentActivities.map((a, i) => (
            <li
              key={i}
              className="bg-[#FAFAFA] p-3 rounded-lg border border-gray-100 hover:bg-[#F9F0FF] transition"
            >
              <p className="text-sm">{a.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDateWithTime(a.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
          <FileClock className="w-10 h-10 text-vibrantPurple mb-2 opacity-80" />
          <p className="text-sm font-medium">No recent activity</p>
          <p className="text-xs text-gray-400">
            Activity updates will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
