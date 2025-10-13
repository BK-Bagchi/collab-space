import axios from "./axiosInstance";

export const getProjectMessages = (id) => axios.get(`/chat/${id}`);
export const sendMessage = (id, data) => axios.post(`/chat/${id}`, data);
export const uploadChatAttachment = (id, data) =>
  axios.post(`/chat/${id}/attachment`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
