import axios from "./axiosInstance";

export const userActivity = () => axios.get("/activity/user");
export const clearActivityLog = () => axios.delete("/activity/delete");
