import Toast from 'react-native-toast-message';

export const showErrorToast = (message: string, errors: any = {}): void => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: `${message}: ${JSON.stringify(errors)}`,
    position: 'top',
    visibilityTime: 5000,
  });
};

export const showSuccessToast = (message: string): void => {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: message,
    position: 'top',
    visibilityTime: 3000,
  });
};