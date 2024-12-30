import axiosInstance from './axiosConfig';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<LoginResponse>('/login', {
        email,
        password,
      });
  
      // Ensure the response contains the expected data
      if (response.data.token && response.data.user) {
        return response.data;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      // Handle the error
      if (error.response) {
        // The request was made and the server responded with a status code
        throw error.response.data || error.response.statusText;
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response from server');
      } else {
        // Something happened in setting up the request
        throw new Error(error.message);
      }
    }
  };

export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post('/logout');
  } catch (error : any) {
    throw error.response?.data || error.message;
  }
};