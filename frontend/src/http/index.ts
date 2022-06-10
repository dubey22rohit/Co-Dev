import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const sendOtp = async (data: any) => api.post("/api/send-otp", data);
export const verifyOtp = async (data: any) => api.post("/api/verify-otp", data);
export const activate = async (data: any) => api.post("/api/activate", data);

export default api;
