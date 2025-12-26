// app/_layout.tsx 
import "../global.css";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, InstrumentSerif_400Regular } from "@expo-google-fonts/instrument-serif";
import { useEffect, useRef } from "react";
import Toast from "react-native-toast-message";
import { View, Text, Animated, useWindowDimensions } from "react-native";

SplashScreen.preventAutoHideAsync();

/* ---------------- TOAST COMPONENT ---------------- */

const ToastComponent = ({
  props,
  type,
  isVisible,
}: {
  props: any;
  type: "success" | "error";
  isVisible?: boolean;
}) => {
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isDesktop = width >= 1024;

  const OFFSCREEN_X = width + 50;
  const FINAL_X = 0;

  const translateX = useRef(new Animated.Value(OFFSCREEN_X)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      translateX.setValue(OFFSCREEN_X);
      opacity.setValue(0);

      Animated.parallel([
        Animated.timing(translateX, {
          toValue: FINAL_X,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: OFFSCREEN_X,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, width]);

  const isSuccess = type === "success";

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: isMobile ? 28 : 16,
        right: isMobile ? undefined : 24,
        left: isMobile ? "50%" : undefined,
        transform: [
          { translateX },
          ...(isMobile ? [{ translateX: -150 }] : []),
        ],
        opacity,
        backgroundColor: "#FBF7ED",

        /* softened border */
        borderWidth: 0.6,
        borderColor: "rgba(13,15,24,0.25)",

        borderRadius: 12,

        /* ✅ increased padding ONLY for desktop */
        paddingVertical: isDesktop ? 16 : isMobile ? 10 : 12,
        paddingHorizontal: isDesktop ? 24 : isMobile ? 14 : 18,

        flexDirection: "row",
        alignItems: "center",
        gap: 10,

        width: isMobile ? 300 : undefined,
        maxWidth: isMobile ? 300 : 420,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 6,
      }}
    >
      {/* 3D Tick Icon */}
      <View
        style={{
          width: isMobile ? 22 : 26,
          height: isMobile ? 22 : 26,
          borderRadius: isMobile ? 11 : 13,
          backgroundColor: "#080808ff",
          alignItems: "center",
          justifyContent: "center",

          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3,
          elevation: 4,

          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderColor: "rgba(255,255,255,0.35)",
        }}
      >
        <Text
          style={{
            color: "#ffffff",
            fontWeight: "900",
            fontSize: isMobile ? 12 : 14,
            textShadowColor: "rgba(0,0,0,0.35)",
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 1,
          }}
        >
          {isSuccess ? "✓" : "✕"}
        </Text>
      </View>

      <Text
        style={{
          fontSize: isMobile ? 13 : 14,
          fontWeight: "500",
          color: "#1f2937",
          flex: 1,
        }}
        numberOfLines={2}
      >
        {props.text1}
      </Text>
    </Animated.View>
  );
};

/* ---------------- TOAST CONFIG ---------------- */

const toastConfig = {
  success: (state: any) => (
    <ToastComponent
      props={state}
      type="success"
      isVisible={state.isVisible}
    />
  ),
  error: (state: any) => (
    <ToastComponent
      props={state}
      type="error"
      isVisible={state.isVisible}
    />
  ),
};

/* ---------------- ROOT LAYOUT ---------------- */

export default function RootLayout() {
  const [loaded, error] = useFonts({
    InstrumentSerif: InstrumentSerif_400Regular,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast
        config={toastConfig}
        position="top"
        animationType="none"
      />
    </>
  );
}
