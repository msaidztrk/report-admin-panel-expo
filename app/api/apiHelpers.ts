import axiosInstance from './axiosConfig';
import { showErrorToast, showSuccessToast } from '../helpers/toastHelpers';
import { navigateTo } from '../helpers/navigationHelpers';
import { RouteValues  } from '../types/routes';

export const makeApiRequest = async (
  method: 'get' | 'post',
  url: string,
  data?: any,
  successMessage?: string,
  navigateToRoute?: RouteValues 
): Promise<any> => {
  try {
    const response = await axiosInstance[method](url, data);
    console.log(`${url} success:`, response.data);

    if (successMessage) {
      showSuccessToast(successMessage);
    }

    if (navigateToRoute) {
      navigateTo(navigateToRoute);
    }

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data.message || `Failed to ${method === 'get' ? 'fetch' : 'update'} data`;
    const errors = error.response?.data.errors || {};
    showErrorToast(errorMessage, errors);
    throw new Error(`${errorMessage}: ${JSON.stringify(errors)}`);
  }
};