// app/_layout.tsx
import "../global.css";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, InstrumentSerif_400Regular } from '@expo-google-fonts/instrument-serif';
import { useEffect } from "react";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ 
        backgroundColor: '#ffffff',
        borderRadius: 12,
        height: 'auto',
        paddingVertical: 16,
        paddingHorizontal: 4,
        borderLeftWidth: 5,
        borderLeftColor: '#10b981',
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
      }}
      contentContainerStyle={{ 
        paddingHorizontal: 16,
        paddingVertical: 2,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 2,
      }}
      text2Style={{
        fontSize: 13,
        color: '#6b7280',
        fontWeight: '400',
        lineHeight: 18,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ 
        backgroundColor: '#ffffff',
        borderRadius: 12,
        height: 'auto',
        paddingVertical: 16,
        paddingHorizontal: 4,
        borderLeftWidth: 5,
        borderLeftColor: '#ef4444',
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
      }}
      contentContainerStyle={{ 
        paddingHorizontal: 16,
        paddingVertical: 2,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 2,
      }}
      text2Style={{
        fontSize: 13,
        color: '#6b7280',
        fontWeight: '400',
        lineHeight: 18,
      }}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{ 
        backgroundColor: '#ffffff',
        borderRadius: 12,
        height: 'auto',
        paddingVertical: 16,
        paddingHorizontal: 4,
        borderLeftWidth: 5,
        borderLeftColor: '#3b82f6',
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
      }}
      contentContainerStyle={{ 
        paddingHorizontal: 16,
        paddingVertical: 2,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 2,
      }}
      text2Style={{
        fontSize: 13,
        color: '#6b7280',
        fontWeight: '400',
        lineHeight: 18,
      }}
    />
  ),
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'InstrumentSerif': InstrumentSerif_400Regular,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast config={toastConfig} position="top" topOffset={60} />
    </>
  );
}