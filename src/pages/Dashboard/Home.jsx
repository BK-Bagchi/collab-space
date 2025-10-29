import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// prettier-ignore
import { ClipboardList, MessageSquare, FolderKanban} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { ProjectAPI, TaskAPI } from "../../api";
import UpcomingDeadlines from "./Components/UpcomingDeadlines";
import OverdueTasks from "./Components/OverdueTasks";
import TaskCalendar from "./TaskCalender";
import TaskProgressInProject from "./Components/TaskProgressInProject";
import ProjectProgress from "./Components/ProjectProgress";

const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [projectList, setProjectList] = useState([]);
  const [projects, setProjects] = useState({ totalCreated: 0, totalMember: 0 });
  const [tasks, setTasks] = useState([]);
  const [selectedRange, setSelectedRange] = useState(15);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const projectRes = await ProjectAPI.getUserProjects();
        setProjectList(projectRes.data.projects);
        setProjects({
          totalCreated: projectRes.data.totalCreated,
          totalMember: projectRes.data.totalMember,
        });
      } catch (error) {
        console.warn(
          "Error fetching project details:",
          error.response.data.message
        );
      }

      try {
        const taskRes = await TaskAPI.assignedTaskToUser();
        setTasks(taskRes.data.tasks);
      } catch (error) {
        console.warn(
          "Error fetching task details:",
          error.response.data.message
        );
      }
    };
    fetchDetails();
  }, []);
  // console.log(projectList);
  // console.log(projects);
  // console.log(tasks);
  const upcomingDeadlines = projectList
    .filter((project) => {
      const deadlineDate = new Date(project.deadline);
      const today = new Date();

      // Calculate difference in days
      const diffInDays = (deadlineDate - today) / (1000 * 60 * 60 * 24);
      return diffInDays >= 0 && diffInDays <= selectedRange; // within next days
    })
    .map((project) => ({
      title: project.title,
      deadline: project.deadline,
    }));
  // console.log(upcomingDeadline);

  const completedTasks = tasks.filter((task) => task.status === "DONE");

  const stats = [
    {
      label: "Total Created Projects",
      value: projects.totalCreated,
      color: "#2979FF",
    },
    {
      label: "Total Assigned Projects",
      value: projects.totalMember,
      color: "#26A69A",
    },
    {
      label: "Total Tasks",
      value: tasks.length,
      color: "#8E24AA",
    },
    {
      label: "Completed Tasks",
      value: completedTasks.length,
      color: "#26A69A",
    },
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
        Welcome back, <span className="text-electricBlue">{user?.name} 👋</span>
      </h1>
      {/* Stats Overview */}
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
                className="text-xs text-[#263238] hover:underline hover:text-[#2979ff] cursor-pointer"
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
                className="text-xs text-[#263238] hover:underline hover:text-[#2979ff] cursor-pointer"
                onClick={() => navigate("/dashboard/tasks")}
              >
                View All
              </span>
            )}
          </div>
        ))}
      </div>
      {/* Quick Access */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div
          className="flex flex-col items-center justify-center bg-[#E3F2FD] p-6 rounded-xl cursor-pointer hover:bg-[#D0E4FF] transition"
          onClick={() => navigate("/dashboard/projects")}
        >
          <FolderKanban size={36} className="text-electricBlue" />
          <p className="mt-2 font-medium text-charcoalGray">Projects</p>
        </div>

        <div
          className="flex flex-col items-center justify-center bg-[#F3E5F5] p-6 rounded-xl cursor-pointer hover:bg-[#E3CCE9] transition"
          onClick={() => navigate("/dashboard/tasks")}
        >
          <ClipboardList size={36} className="text-vibrantPurple" />
          <p className="mt-2 font-medium text-charcoalGray">Tasks</p>
        </div>

        <div
          className="flex flex-col items-center justify-center bg-[#E0F2F1] p-6 rounded-xl cursor-pointer hover:bg-[#CDE6E4] transition"
          onClick={() => navigate("/dashboard/chat")}
        >
          <MessageSquare size={36} className="text-tealGreen" />
          <p className="mt-2 font-medium text-charcoalGray">Chat</p>
        </div>
      </div>
      {/* Project progress chart in assigned or created projects */}
      <ProjectProgress {...{ projectList }} />
      {/* Task progress chart in assigned projects */}
      <TaskProgressInProject {...{ projectList, tasks }} />;
      {/* Upcoming Deadlines + Overdue Tasks + Task Calendar + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Deadlines */}
        <UpcomingDeadlines
          {...{ upcomingDeadlines, selectedRange, setSelectedRange }}
        />

        {/* Overdue tasks */}
        <OverdueTasks tasks={tasks} />

        {/* Task Calendar */}
        <TaskCalendar />

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
