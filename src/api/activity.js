import axios from "./axiosInstance";

export const userActivity = () => axios.get("/activity/user");
