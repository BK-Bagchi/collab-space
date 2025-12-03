import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarIcon } from "lucide-react";
import { ProjectAPI, TaskAPI } from "../../api";
import Loading from "../../components/Loading/Loading";

const TaskCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const [projectRes, taskRes] = await Promise.allSettled([
        ProjectAPI.getUserProjects(),
        TaskAPI.assignedTaskToUser(),
      ]);

      if (projectRes.status === "fulfilled")
        setProjects(projectRes.value.data.projects);
      else {
        console.warn(
          "Projects fetch failed:",
          projectRes.reason?.response?.data?.message
        );
        setProjects([]);
      }

      if (taskRes.status === "fulfilled") setTasks(taskRes.value.data.tasks);
      else {
        console.warn(
          "Tasks fetch failed:",
          taskRes.reason?.response?.data?.message
        );
        setTasks([]);
      }

      setLoading(false);
    };

    fetchDetails();
  }, []);
  // console.log(projects);
  // console.log(tasks);

  const deadlines = {};
  projects.forEach((project) => {
    if (project.deadline)
      deadlines[project.deadline.split("T")[0]] = `Project: ${project.title}`;
  });

  tasks.forEach((task) => {
    if (task.dueDate)
      deadlines[task.dueDate.split("T")[0]] = `Task: ${task.title}`;
  });
  // console.log(deadlines);

  return (
    <div className="bg-gradient-to-br from-white via-softWhite to-[#F0F4FF] rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col items-center">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 bg-vibrantPurple/10 rounded-lg">
          <CalendarIcon className="text-vibrantPurple w-5 h-5" />
        </div>
        <h2 className="text-lg font-semibold text-charcoalGray">
          Calendar View
        </h2>
      </div>

      <Loading loading={loading}>
        {/* Calendar */}
        <div className="w-full bg-white rounded-xl border border-gray-100 shadow-inner overflow-hidden flex justify-center">
          <Calendar
            onChange={setValue}
            value={value}
            className="w-full p-3 border-none"
            tileClassName={({ date }) => {
              const dateStr = date.toISOString().split("T")[0];
              return deadlines[dateStr]
                ? "bg-vibrantPurple/10 rounded-md font-semibold text-vibrantPurple"
                : "";
            }}
            tileContent={({ date, view }) => {
              const dateStr = date.toISOString().split("T")[0];
              const label = deadlines[dateStr];
              return (
                view === "month" &&
                label && (
                  <div className="mt-1 text-[10px] font-medium text-vibrantPurple hover:scale-110 transition-transform">
                    {label}
                  </div>
                )
              );
            }}
          />
        </div>

        {/* Selected Date */}
        <div className="mt-5 text-center">
          <p className="text-sm text-gray-600">
            Selected Date:
            <span className="ml-1 font-semibold text-electricBlue">
              {value.toDateString()}
            </span>
          </p>

          {/* Tip / Info */}
          <p className="text-xs text-gray-400 mt-2 italic">
            Hover over highlighted days to see upcoming tasks ✨
          </p>
        </div>
      </Loading>
    </div>
  );
};

export default TaskCalendar;
