import { useState } from 'react';
import { login as loginApi, logout as logoutApi } from '../api/auth';
import useAuthStore from '../store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const useAuth = () => {
  const { setToken, setUser, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { token, user } = await loginApi(email, password);
      setToken(token);
      setUser(user);
      await AsyncStorage.setItem('token', token);
    } catch (err : any) {
      setError(err.message || 'Login failed');
    //   throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await logoutApi();
      clearAuth();
      await AsyncStorage.removeItem('token'); // Remove token from AsyncStorage
    } catch (err : any) {
      setError(err.message || 'Logout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, logout, loading, error };
};

export default useAuth;