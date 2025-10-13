import axios from "./axiosInstance";

export const createProject = (data) => axios.post("/project", data);
export const getUserProjects = () => axios.get("/project/user");
export const getProjectById = (id) => axios.get(`/project/${id}`);
export const updateProject = (id, data) => axios.put(`/project/${id}`, data);
export const deleteProject = (id) => axios.delete(`/project/${id}`);
export const inviteMember = (id, data) =>
  axios.post(`/project/${id}/invite`, data);
export const getProjectMembers = (id) => axios.get(`/project/${id}/members`);
