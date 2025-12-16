import axios from "./axiosInstance";

export const getLoggedInUser = () => axios.get("/user/me");
export const updateUserProfile = (data) => axios.put("/user/me", data);
export const updatePassword = (data) => axios.patch("/user/me/password", data);
export const toggleUserTheme = (data) => axios.patch("/user/me/theme", data);
export const toggleUserTypingIndicator = (data) =>
  axios.patch("/user/me/typing-indicator", data);
export const toggleUserActiveStatus = (data) =>
  axios.patch("/user/me/active-status", data);
export const getAllUsers = () => axios.get("/user");
export const getUserById = (id) => axios.get(`/user/${id}`);
export const updateUserRole = (id, data) => axios.put(`/user/${id}/role`, data);
export const deleteUser = (id) => axios.delete(`/user/${id}`);
