import axios from "./axiosInstance";

export const createTask = (data) => axios.post("/task", data);
export const assignedTaskToUser = () => axios.get("/task/user");
export const getTaskById = (id) => axios.get(`/task/${id}`);
export const updateTask = (id, data) => axios.put(`/task/${id}`, data);
export const deleteTask = (id) => axios.delete(`/task/${id}`);
export const getProjectTasks = (id, params = {}) =>
  axios.get(`/project/${id}/tasks`, { params });
export const updateSubtasks = (id, data) =>
  axios.patch(`/task/${id}/subtask`, data);
export const updateTaskStatus = (id, data) =>
  axios.patch(`/task/${id}/status`, data);
export const uploadTaskAttachment = (id, formData) =>
  axios.post(`/task/${id}/attachments`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getTaskFiles = (id) => axios.get(`/task/${id}/files`);
