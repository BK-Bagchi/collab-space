import axios from "./axiosInstance";

export const getProjectDashboard = (projectId) =>
  axios.get(`/dashboard/project/${projectId}`);
export const getTeamDashboard = () => axios.get("/dashboard/team");
export const getOverdueTasks = () => axios.get("/dashboard/overdue-tasks");
