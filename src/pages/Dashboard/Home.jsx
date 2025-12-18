import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// prettier-ignore
import { ClipboardList, MessageSquare, FolderKanban} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { ProjectAPI, TaskAPI } from "../../api";
import UpcomingDeadlines from "./Components/UpcomingDeadlines";
import OverdueTasks from "../../charts/OverdueTasks";
import TaskCalendar from "./TaskCalender";
import TaskProgressInProject from "./Components/TaskProgressInProject";
import ProjectProgress from "./Components/ProjectProgress";
import ActivityLog from "./Components/ActivityLog";
import Overview from "./Components/Overview";
import Loading from "../../components/Loading/Loading";

const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [projectList, setProjectList] = useState([]);
  const [projects, setProjects] = useState({ totalCreated: 0, totalMember: 0 });
  const [tasks, setTasks] = useState([]);
  const [selectedRange, setSelectedRange] = useState(15);
  const [projectLoading, setProjectLoading] = useState(true);
  const [taskLoading, setTaskLoading] = useState(true);

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
      } finally {
        setProjectLoading(false);
      }

      try {
        const taskRes = await TaskAPI.assignedTaskToUser();
        setTasks(taskRes.data.tasks);
      } catch (error) {
        console.warn(
          "Error fetching task details:",
          error.response.data.message
        );
      } finally {
        setTaskLoading(false);
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

  return (
    <div className="p-6 md:p-10 bg-softWhite dark:bg-darkSlate text-charcoalGray rounded-lg">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6 text-charcoalGray dark:text-white">
        Welcome back, <span className="text-electricBlue">{user?.name} 👋</span>
      </h1>

      {/* Stats Overview */}
      <Loading loading={projectLoading}>
        <Overview stats={stats} />
      </Loading>

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
      <Loading loading={projectLoading}>
        <ProjectProgress {...{ projectList }} />
      </Loading>

      {/* Task progress chart in assigned projects */}
      <Loading loading={projectLoading || taskLoading}>
        <TaskProgressInProject {...{ projectList, tasks }} />;
      </Loading>

      {/* Upcoming Deadlines + Overdue Tasks + Task Calendar + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Loading loading={projectLoading}>
          {/* Upcoming Deadlines */}
          <UpcomingDeadlines
            {...{ upcomingDeadlines, selectedRange, setSelectedRange }}
          />
        </Loading>

        <Loading loading={taskLoading}>
          {/* Overdue tasks */}
          <OverdueTasks tasks={tasks} />
        </Loading>

        {/* Task Calendar */}
        <TaskCalendar />

        {/* Recent Activity */}
        <ActivityLog />
      </div>
    </div>
  );
};

export default DashboardHome;
