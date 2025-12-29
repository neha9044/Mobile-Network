import { View, Text, Image, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";

const QUESTION =
  "Would you like help creating a professional resume?";

export default function HomeIntro({
  fadeOut = false,
}: {
  fadeOut?: boolean;
}) {
  const [text, setText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  const opacity = useRef(new Animated.Value(1)).current;

  /* 🔥 FADE OUT WHEN CHAT STARTS */
  useEffect(() => {
    if (fadeOut) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeOut]);

  /* TYPEWRITER (ONLY ONCE, NO DELETE, NO LOOP) */
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (charIndex < QUESTION.length) {
      timeout = setTimeout(() => {
        setText((prev) => prev + QUESTION.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, 35);
    }

    return () => clearTimeout(timeout);
  }, [charIndex]);

  return (
    <Animated.View
      style={{ opacity }}
      className="flex-1 items-center justify-center px-6"
    >
      {/* AI ORB */}
      <Image
        source={require("../assets/images/ai-orb.png")}
        className="w-30 h-20 mb-6"
        resizeMode="contain"
      />

      {/* GREETING */}
      <Text className="text-[#996ee3] text-3xl font-semibold text-center mb-4 ">
        Welcome to Infi AI, Your career assistant
      </Text>

      {/* EXIT INFO */}
    

      {/* SINGLE QUESTION TYPE ANIMATION */}
      <Text className="text-gray-400 text-center text-2xl leading-5 min-h-[24px] mb-2">
        {text}
        {charIndex < QUESTION.length && (
          <Text className="text-gray-500 ">▍</Text>
        )}
          
      </Text>
      <Text className="text-gray-500 text-lg text-center mb-3">
        (Type "exit" to leave the chat)
      </Text>
    </Animated.View>
  );
}
