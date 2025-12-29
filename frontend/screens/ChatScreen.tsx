import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";

import BotMessage from "../components/BotMessage";
import UserMessage from "../components/UserMessage";
import ChatInput from "../components/ChatInput";
import HomeIntro from "../components/HomeIntro";

/* ---------------- TYPES ---------------- */

type Message = {
  id: number;
  sender: "bot" | "user";
  type: "text" | "pdf" | "voice";
  data: any;
};

type ChatScreenProps = {
  onExit: () => void;
};

/* ---------------- SCREEN ---------------- */

export default function ChatScreen({ onExit }: ChatScreenProps) {
  const scrollRef = useRef<KeyboardAwareScrollView>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [chatStarted, setChatStarted] = useState(false);

  // 🔥 Smooth chat appearance animation
  const chatOpacity = useRef(new Animated.Value(0)).current;
  const chatTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (chatStarted) {
      Animated.parallel([
        Animated.timing(chatOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(chatTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [chatStarted]);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollToEnd(true);
  }, [messages]);

  /* ---------------- SEND HANDLER ---------------- */

  const handleSend = (payload: {
    type: "text" | "pdf" | "voice";
    data: any;
  }) => {
    const userText =
      payload.type === "text"
        ? String(payload.data).trim().toLowerCase()
        : "";

    // EXIT COMMAND
    if (userText === "exit" || userText === "quit" || userText === "bye") {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "user",
          type: "text",
          data: payload.data,
        },
        {
          id: Date.now() + 1,
          sender: "bot",
          type: "text",
          data: "Alright 👋 Exiting chat.",
        },
      ]);

      setTimeout(() => onExit(), 500);
      return;
    }

    // 🔥 First message → start chat smoothly
    if (!chatStarted) {
      setChatStarted(true);
      setMessages([
        {
          id: Date.now(),
          sender: "bot",
          type: "text",
          data: "Sure 👍 How can I help you?",
        },
      ]);
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        sender: "user",
        type: payload.type,
        data: payload.data,
      },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          sender: "bot",
          type: "text",
          data: "Got it. Let me help you with that.",
        },
      ]);
    }, 600);
  };

  /* ---------------- UI ---------------- */

  return (
    <SafeAreaView className="flex-1 bg-black py-10">
      {/* HEADER */}
      <View className="h-14 flex-row items-center border-b border-[#222] px-4">
        <TouchableOpacity onPress={onExit} className="w-8 items-start">
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </TouchableOpacity>

        <View className="flex-1 items-center">
          <Text className="text-white text-[17px] font-semibold">
            Infi AI
          </Text>
        </View>

        <View className="w-8" />
      </View>

      {/* BODY */}
      {!chatStarted ? (
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <HomeIntro fadeOut={chatStarted} />
        </KeyboardAvoidingView>
      ) : (
        <Animated.View
          style={{
            flex: 1,
            opacity: chatOpacity,
            transform: [{ translateY: chatTranslateY }],
          }}
        >
          <KeyboardAwareScrollView
            ref={scrollRef}
            enableOnAndroid
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ padding: 16, paddingBottom: 180 }}
          >
            {messages.map((msg) =>
              msg.sender === "bot" ? (
                <BotMessage key={msg.id} text={msg.data} />
              ) : (
                <UserMessage key={msg.id} message={msg} />
              )
            )}
          </KeyboardAwareScrollView>
        </Animated.View>
      )}

      {/* INPUT */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: keyboardHeight,
        }}
        className="pb-14 items-center"
      >
        <View className="w-[96%]">
          <ChatInput onSend={handleSend} />
        </View>
      </View>
    </SafeAreaView>
  );
}
