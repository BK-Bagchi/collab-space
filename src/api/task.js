import axios from "./axiosInstance";

export const createTask = (data) => axios.post("/tasks", data);
export const getTaskById = (id) => axios.get(`/tasks/${id}`);
export const updateTask = (id, data) => axios.put(`/tasks/${id}`, data);
export const deleteTask = (id) => axios.delete(`/tasks/${id}`);
export const getProjectTasks = (id, params = {}) =>
  axios.get(`/projects/${id}/tasks`, { params });
export const updateSubtasks = (id, data) =>
  axios.patch(`/tasks/${id}/subtasks`, data);
export const updateTaskStatus = (id, data) =>
  axios.patch(`/tasks/${id}/status`, data);
export const uploadTaskAttachment = (id, formData) =>
  axios.post(`/tasks/${id}/attachments`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getTaskFiles = (id) => axios.get(`/task/${id}/files`);
