import axios from "./axiosInstance";

export const getNotifications = () => axios.get("/notification");
export const getSingleNotification = (id) => axios.get(`/notification/${id}`);
export const markAsRead = (id) => axios.patch(`/notification/${id}/read`);
export const createNotification = (data) => axios.post("/notification", data);
