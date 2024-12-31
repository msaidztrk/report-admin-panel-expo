import axios from "axios";
import useAuthStore from "../store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: "http://bcrain.site/api/mobile", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token"); // Or use your state management
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log("no token found");
      }
    } catch (error) {
      console.error("Error retrieving token from AsyncStorage:", error);
    }

    return config;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired, clear authentication
      const { clearAuth } = useAuthStore.getState();
      clearAuth();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
