import React, { useEffect, useState } from "react";
import { FileClock, MessageSquare } from "lucide-react";
import { ActivityAPI } from "../../../api";
import { formatDateWithTime } from "../../../utils/dateFormater";
import Loading from "../../../components/Loading/Loading";

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await ActivityAPI.userActivity();
        setActivities(res.data.activities);
      } catch (error) {
        console.warn("Error fetching activity:", error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  }, []);
  //   console.log(activities);
  const recentActivities = activities.slice(0, 10);

  return (
    <div className="bg-white dark:bg-darkSlate p-6 rounded-xl shadow-md border border-gray-100 max-h-[480px] overflow-y-auto scrollbar-hide">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="text-vibrantPurple" />
        <h3 className="text-lg font-semibold dark:text-softWhite">
          Activity Log
        </h3>
      </div>
      <Loading loading={loading}>
        {recentActivities.length > 0 ? (
          <ul className="space-y-3">
            {recentActivities.map((a, i) => (
              <li
                key={i}
                className="bg-softWhite dark:bg-gray-600 p-3 rounded-lg border border-gray-100 hover:bg-[#F9F0FF] dark:hover:bg-gray-500 transition"
              >
                <p className="text-sm dark:text-softWhite">{a.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
      </Loading>
    </div>
  );
};

export default ActivityLog;
