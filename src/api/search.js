import axios from "./axiosInstance";

export const searchTasks = (params) => axios.get("/search/tasks", { params });
export const searchProjects = (params) =>
  axios.get("/search/projects", { params });
export const searchMessages = (params) =>
  axios.get("/search/messages", { params });
