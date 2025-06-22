import { useEffect } from 'react';
import { Alert } from 'react-native';
import axiosInstance from '../api/axiosConfig';

const useServerHealth = () => {
  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        console.log('Checking server health...');
        const response = await axiosInstance.get('/ping');
        console.log('Server health response:', response.data);
      } catch (error : any) {
        console.error('Server health check failed:', error);
        const errorMessage = error.response
          ? `Server Error: ${error.response.status} - ${error.response.statusText}`
          : error instanceof Error
          ? `Network Error: ${error.message}`
          : 'An unknown error occurred';
        Alert.alert(
          'Server Error',
          errorMessage,
          [{ text: 'OK' }]
        );
      }
    };

    checkServerHealth();
  }, []); // Run only once when component mounts
};

export default useServerHealth;