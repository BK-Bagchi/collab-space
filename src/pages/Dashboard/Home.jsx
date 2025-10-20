import React from "react";
import { useOutletContext } from "react-router-dom";
// prettier-ignore
import { CalendarDays, ClipboardList, MessageSquare, FolderKanban } from "lucide-react";

const DashboardHome = () => {
  const projectId = useOutletContext();
  console.log("Dashboard Home", projectId);
  const stats = [
    { label: "Total Projects", value: 8, color: "#2979FF" },
    { label: "Total Tasks", value: 42, color: "#8E24AA" },
    { label: "Completed Tasks", value: 27, color: "#26A69A" },
  ];

  const upcomingDeadlines = [
    { title: "Submit Design Review", date: "Oct 21, 2025" },
    { title: "Finalize API Integration", date: "Oct 23, 2025" },
    { title: "Team Demo", date: "Oct 25, 2025" },
  ];

  const activities = [
    { message: "You created a new project “Team Hub”", time: "2h ago" },
    { message: "Task “Set up backend” marked as completed", time: "5h ago" },
    { message: "You invited Alex to “Collab Space”", time: "1d ago" },
  ];

  return (
    <div className="p-6 md:p-10 bg-softWhite text-charcoalGray">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6 text-charcoalGray">
        Welcome back, <span className="text-electricBlue">Dipto 👋</span>
      </h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {stats.map((item, i) => (
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
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="flex flex-col items-center justify-center bg-[#E3F2FD] p-6 rounded-xl cursor-pointer hover:bg-[#D0E4FF] transition">
          <FolderKanban size={36} className="text-electricBlue" />
          <p className="mt-2 font-medium text-charcoalGray">Projects</p>
        </div>

        <div className="flex flex-col items-center justify-center bg-[#F3E5F5] p-6 rounded-xl cursor-pointer hover:bg-[#E3CCE9] transition">
          <ClipboardList size={36} className="text-vibrantPurple" />
          <p className="mt-2 font-medium text-charcoalGray">Tasks</p>
        </div>

        <div className="flex flex-col items-center justify-center bg-[#E0F2F1] p-6 rounded-xl cursor-pointer hover:bg-[#CDE6E4] transition">
          <MessageSquare size={36} className="text-tealGreen" />
          <p className="mt-2 font-medium text-charcoalGray">Chat</p>
        </div>
      </div>

      {/* Upcoming Deadlines + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Deadlines */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="text-electricBlue" />
            <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
          </div>
          <ul className="space-y-3">
            {upcomingDeadlines.map((task, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-[#FAFAFA] p-3 rounded-lg border border-gray-100 hover:bg-[#F0F4FF] transition"
              >
                <span className="text-sm font-medium">{task.title}</span>
                <span className="text-xs text-gray-500">{task.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="text-vibrantPurple" />
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          <ul className="space-y-3">
            {activities.map((a, i) => (
              <li
                key={i}
                className="bg-[#FAFAFA] p-3 rounded-lg border border-gray-100 hover:bg-[#F9F0FF] transition"
              >
                <p className="text-sm">{a.message}</p>
                <p className="text-xs text-gray-500 mt-1">{a.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
