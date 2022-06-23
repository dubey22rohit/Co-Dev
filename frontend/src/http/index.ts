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
export const logout = async () => api.post("/api/logout");
export const createRoom = async (data: any) => api.post("/api/rooms", data);
export const getAllRooms = async () => api.get("/api/rooms");
export const getRoom = async (roomId: any) => api.get(`/api/rooms/${roomId}`);

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalReq = error.config;
    if (originalReq && error.response.status === 401 && !originalReq._isRetry) {
      originalReq._isRetry = true;
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
          withCredentials: true,
        });

        return api.request(originalReq);
      } catch (error) {
        console.log(error);
      }
    }
    throw error;
  }
);

export default api;
