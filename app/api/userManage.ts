import Toast from "react-native-toast-message";
import axiosInstance from "./axiosConfig";
import { router } from "expo-router";
import { Routes } from "../types/routes";

export const createNewUser = async (name: string, email: string, password: string): Promise<void> => {
  try {
    const response = await axiosInstance.post('/users/new', {
      name,
      email,
      password,
    });

    console.log("createNewUser success:", response.data);

    // Show success toast notification
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'User created successfully!',
      position: 'top',
      visibilityTime: 3000,
    });

    // Navigate to the home screen
    router.navigate(Routes.HOME, { relativeToDirectory: true });

  } catch (error: any) {
    console.error("createNewUser error:", error.response?.data);

    // Extract error message and validation errors
    const errorMessage = error.response?.data.message || 'Failed to create user';
    const errors = error.response?.data.errors || {};

    // Show error toast notification
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: `${errorMessage}: ${JSON.stringify(errors)}`,
      position: 'top',
      visibilityTime: 5000,
    });

    // Throw a detailed error message
    throw new Error(`${errorMessage}: ${JSON.stringify(errors)}`);
  }
};




export const fetchUserData = async (id: any): Promise<void> => {
    try {
    const response = await axiosInstance.get(`/users/fetch?id=${id}`);
      console.log("fetchUserData success:", response.data);

      return response.data;
  
    } catch (error: any) {
      console.error("fetchUserData error:", error.response?.data);
      const errorMessage = error.response?.data.message || 'Failed to fetchUserData';
      const errors = error.response?.data.errors || {};

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${errorMessage}: ${JSON.stringify(errors)}`,
        position: 'top',
        visibilityTime: 5000,
      });
      throw new Error(`${errorMessage}: ${JSON.stringify(errors)}`);
    }
  };


  export const updateUserData = async (id : any , name: string, email: string, password: string): Promise<void> => {
    try {
      const response = await axiosInstance.post('/users/update', {
        id ,
        name,
        email,
        password,
      });
  
      console.log("updateUserData success:", response.data);
  
      // Show success toast notification
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'User updated successfully!',
        position: 'top',
        visibilityTime: 3000,
      });
  
      // Navigate to the home screen
      router.navigate(Routes.HOME, { relativeToDirectory: true });
  
    } catch (error: any) {
      console.error("updateUserData error:", error.response?.data);
  
      // Extract error message and validation errors
      const errorMessage = error.response?.data.message || 'Failed to updateUserData';
      const errors = error.response?.data.errors || {};
  
      // Show error toast notification
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${errorMessage}: ${JSON.stringify(errors)}`,
        position: 'top',
        visibilityTime: 5000,
      });
  
      // Throw a detailed error message
      throw new Error(`${errorMessage}: ${JSON.stringify(errors)}`);
    }
  };