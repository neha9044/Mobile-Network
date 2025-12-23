// utils/toast.ts
import Toast from 'react-native-toast-message';

export const showToast = {
  registration: () =>
    Toast.show({
      type: 'success',
      text1: 'Account created!',
      text2: 'Please verify your email.',
    }),

  verification: () =>
    Toast.show({
      type: 'success',
      text1: 'Email verified!',
      text2: 'You can now login.',
    }),

  login: () =>
    Toast.show({
      type: 'success',
      text1: 'Welcome back!',
      text2: 'Logging you in...',
    }),

  email: () =>
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Password reset link sent successfully!',
    }),

  reset: () =>
    Toast.show({
      type: 'success',
      text1: 'Reset Successful',
      text2: 'Password reset successfully!',
    }),

  error: (message?: string) =>
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message || 'Something went wrong.',
    }),
};