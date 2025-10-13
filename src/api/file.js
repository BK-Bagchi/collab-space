import axios from "./axiosInstance";

export const uploadFile = (data) =>
  axios.post("/file", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getFileById = (id) => axios.get(`/file/${id}`);
export const deleteFile = (id) => axios.delete(`/file/${id}`);
