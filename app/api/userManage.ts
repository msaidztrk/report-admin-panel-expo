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

      Toast.show({
        type: 'success', // Type of toast
        text1: 'Success', // Title
        text2: 'User created successfully!', // Message
        position: 'top', // Position of the toast
        visibilityTime: 3000, // Duration in milliseconds
      }); 
      router.navigate( Routes.HOME, { relativeToDirectory: true }) 

    } catch (error: any) {
      // Log the full error response
      console.error("createNewUser error:", error.response.data);

      const errorMessage = error.response.data.message || 'Failed to create user';
      const errors = error.response.data.errors || {}; // Validation errors

      Toast.show({
        type: 'error', // Type of toast
        text1: 'Error', // Title
        text2: `${errorMessage}: ${JSON.stringify(errors)}`, // Message
        position: 'top', // Position of the toast
        visibilityTime: 5000, // Duration in milliseconds
      });
  
      // Extract and throw a meaningful error message
      if (error.response) {
        // Handle validation errors or custom error messages from Laravel
        const errorMessage = error.response.data.message || 'Failed to create user';
        const errors = error.response.data.errors || {}; // Validation errors
  
        // Throw a detailed error message
        throw new Error(`${errorMessage}: ${JSON.stringify(errors)}`);
      } else {
        // Handle network errors or other issues
        throw new Error(error.message || 'An unexpected error occurred');
      }
    }
  };