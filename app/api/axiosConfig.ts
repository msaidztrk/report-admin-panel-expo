import axios from "axios";
import useAuthStore from "../store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
  // baseURL: "http://bcrain.site/api/mobile", 
const axiosInstance = axios.create({

  baseURL : "http://192.168.1.3:8000/api/mobile",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const fullURL = `${config.baseURL}${config.url}${config.params ? '?' + new URLSearchParams(config.params).toString() : ''}`;
      console.log('Request URL:', fullURL); 
      
      // const token = await AsyncStorage.getItem("token"); // Or use your state management
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // } else {
      //   console.log("no token found");
      // }

      // Log the full URL including baseURL and any query parameters
     
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
