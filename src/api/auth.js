import axios from "./axiosInstance";

export const signup = (data) => axios.post("/auth/signup", data);
export const login = (data) => axios.post("/auth/login", data);
export const oauthLogin = (data) => axios.post("/auth/oauth", data);
export const verifyToken = () => axios.get("/auth/verify");
