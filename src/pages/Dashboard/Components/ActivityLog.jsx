import React, { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
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

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="text-vibrantPurple" />
        <h3 className="text-lg font-semibold">Recent Activity</h3>
      </div>
      {activities.length > 0 && (
        <ul className="space-y-3">
          {activities.map((a, i) => (
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
      )}
    </div>
  );
};

export default ActivityLog;
