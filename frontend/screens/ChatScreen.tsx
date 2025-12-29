import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  useWindowDimensions,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";

import BotMessage from "../components/BotMessage";
import UserMessage from "../components/UserMessage";
import ChatInput from "../components/ChatInput";
import HomeIntro from "../components/HomeIntro";

type Message = {
  id: number;
  sender: "bot" | "user";
  type: "text" | "pdf" | "voice";
  data: any;
};

export default function ChatScreen() {
  const router = useRouter();
  const scrollRef = useRef<KeyboardAwareScrollView>(null);

  const { width } = useWindowDimensions();
  const isTablet = width >= 768 && width < 1200;
  const isDesktop = width >= 1200;

  const maxContentWidth = isDesktop ? "100%": isTablet ? "100%" : "100%";

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

  const handleSend = (payload: {
    type: "text" | "pdf" | "voice";
    data: any;
  }) => {
    const userText =
      payload.type === "text"
        ? String(payload.data).trim().toLowerCase()
        : "";

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

      setTimeout(() => router.replace("/"), 500);
      return;
    }

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

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* HEADER */}
      <View className="h-14 flex-row items-center border-b border-[#222] px-4">
        <TouchableOpacity
          onPress={() => router.replace("/")}
          className="w-8 items-start"
        >
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
      <View className="flex-1 items-center">
        <View style={{ width: "100%", maxWidth: maxContentWidth, flex: 1 }}>
          {!chatStarted ? (
            <KeyboardAvoidingView
              className="flex-1"
              behavior={Platform.OS === "android" ? "height" : "padding"}
            >
              {/* 🔑 CENTER & SCALE INTRO FOR TABLET / DESKTOP */}
              <View
                className="flex-1 items-center justify-center"
                style={{
                  transform: [
                    {
                      scale: isDesktop ? 0.78 : isTablet ? 0.85 : 1,
                    },
                  ],
                }}
              >
                <HomeIntro fadeOut={chatStarted} />
              </View>
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
                contentContainerStyle={{
                  padding: 16,
                  paddingBottom: 180,
                }}
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
        </View>
      </View>

      {/* INPUT */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: keyboardHeight,
        }}
        className="items-center pb-10"
      >
        <View style={{ width: "96%", maxWidth: maxContentWidth }}>
          <ChatInput onSend={handleSend} />
        </View>
      </View>
    </SafeAreaView>
  );
}
