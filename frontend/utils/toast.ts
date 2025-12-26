// utils/toast.ts
import Toast from 'react-native-toast-message';

export const showToast = {
  registration: () =>
    Toast.show({
      type: 'success',
      text1: 'Account created successfully',
      autoHide: true,
      visibilityTime: 3500,
    }),

  verification: () =>
    Toast.show({
      type: 'success',
      text1: 'Email verified successfully',
      autoHide: true,
      visibilityTime: 3500,
    }),

  login: () =>
    Toast.show({
      type: 'success',
      text1: 'Welcome back! Logging you in...',
      autoHide: true,
      visibilityTime: 3500,
    }),

  email: () =>
    Toast.show({
      type: 'success',
      text1: 'Password reset link sent to your email',
      autoHide: true,
      visibilityTime: 3500,
    }),

  reset: () =>
    Toast.show({
      type: 'success',
      text1: 'Password updated successfully',
      autoHide: true,
      visibilityTime: 3500,
    }),

  error: (message?: string) =>
    Toast.show({
      type: 'error',
      text1: message || 'Something went wrong. Please try again.',
      autoHide: true,
      visibilityTime: 3500,
    }),
};