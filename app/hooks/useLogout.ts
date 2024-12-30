import { router } from 'expo-router';
import useAuthStore from '../store/authStore';

const useLogout = () => {
  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth(); // Clear authentication state
    router.replace('/login'); // Navigate to the login page
  };

  return handleLogout;
};

export default useLogout;