import { View, ActivityIndicator, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";

export default function LoadingScreen() {
  const router = useRouter();
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Smooth fade + scale in
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    // Redirect to profile
    const timer = setTimeout(() => {
      router.replace("/profile");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-black items-center justify-center">
      <Animated.View
        style={{
          opacity,
          transform: [{ scale }],
        }}
      >
        <ActivityIndicator size="large" color="#7c5cff" />
      </Animated.View>
    </View>
  );
}
