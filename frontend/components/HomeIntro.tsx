import { View, Text, Image, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";

const AI_QUESTIONS = [
  "Would you like help creating a professional resume?",
  "Need assistance tailoring your resume for a job role?",
  "Want to improve your resume summary or headline?",
  "Need help highlighting your skills and experience?",
  "Preparing for interviews and job applications?",
  "Want to build a resume that passes ATS screening?",
];

export default function HomeIntro({
  fadeOut = false,
}: {
  fadeOut?: boolean;
}) {
  const [text, setText] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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

  /* TYPE + BACKSPACE ANIMATION */
  useEffect(() => {
    const currentQuestion = AI_QUESTIONS[questionIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (charIndex < currentQuestion.length) {
        timeout = setTimeout(() => {
          setText((prev) => prev + currentQuestion.charAt(charIndex));
          setCharIndex((prev) => prev + 1);
        }, 35);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1200);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText((prev) => prev.slice(0, -1));
        }, 25);
      } else {
        setIsDeleting(false);
        setCharIndex(0);
        setQuestionIndex(
          (prev) => (prev + 1) % AI_QUESTIONS.length
        );
      }
    }

    return () => clearTimeout(timeout);
  }, [text, charIndex, isDeleting, questionIndex]);

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
      <Text className="text-[#7C3AED] text-3xl font-semibold text-center">
        Welcome to Infi AI, Your career assistant
      </Text>

      {/* EXIT INFO */}
      <Text className="text-gray-500 text-lg text-center mb-3">
        (Type "exit" to exit the chat)
      </Text>

      {/* TYPE + ERASE ANIMATION */}
      <Text className="text-gray-400 text-center text-lg leading-5 min-h-[24px]">
        {text}
        <Text className="text-gray-500">▍</Text>
      </Text>
    </Animated.View>
  );
}
