// hooks/useTokenCheck.ts
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode'; // Correct import
import useAuthStore from '../store/authStore'; // Adjust the path as needed

const useTokenCheck = () => {
  const { token, clearAuth } = useAuthStore();

  const decodeJWT = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Failed to decode JWT:', error);
      return null;
    }
  };

  const checkTokenExpiry = () => {
    if (token) {
      const decodedToken: any = decodeJWT(token);
      const currentTime = Date.now() / 1000;

      console.log('Checking token expiry:', decodedToken.exp, currentTime);

      if (decodedToken.exp < currentTime) {
        // Token has expired, clear authentication
        console.log('Token expired, clearing authentication');
        // clearAuth();
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(checkTokenExpiry, 30000); // Check every 30 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [token]); // Re-run effect if the token changes
};

export default useTokenCheck;