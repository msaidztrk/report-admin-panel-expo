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
   
      const response = await axiosInstance.post<LoginResponse>('/login', {
        email,
        password,
      });
  
      console.log("Axios response : " , response.data);
      // Ensure the response contains the expected data
      if (response.data.token && response.data.user) {
        return response.data;
      } else {
        console.log(response.data);
        throw new Error('Invalid response from server');
      }
   
  };

export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post('/logout');
  } catch (error : any) {
    throw error.response?.data || error.message;
  }
};