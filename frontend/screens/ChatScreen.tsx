import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";

import BotMessage from "../components/BotMessage";
import UserMessage from "../components/UserMessage";
import ChatInput from "../components/ChatInput";

/* INLINE MESSAGE TYPE */
type Message = {
  id: number;
  sender: "bot" | "user";
  type: "text" | "pdf" | "voice";
  data: any;
};

export default function ChatScreen() {
  const router = useRouter();
  const scrollRef = useRef<KeyboardAwareScrollView>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [chatCount, setChatCount] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: "bot",
        type: "text",
        data: "Hey 👋 Welcome to Infi AI. Let’s get started!",
      },
    ]);
  }, []);

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

    if (chatCount >= 5) {
      setTimeout(() => router.replace("/"), 800);
    }
  }, [messages]);

  const handleSend = (payload: {
    type: "text" | "pdf" | "voice";
    data: any;
  }) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        type: payload.type,
        data: payload.data,
      },
    ]);

    setChatCount((prev) => prev + 1);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          type: "text",
          data: "Got it 👍 Tell me more.",
        },
      ]);
    }, 600);
  };

  return (
    <SafeAreaView className="flex-1 bg-black py-10">
      {/* HEADER */}
      <View className="h-14 flex-row items-center border-b border-[#222] px-4">
        {/* LEFT (BACK) */}
        <TouchableOpacity
          onPress={() => router.replace("/")}
          className="w-8 items-start"
        >
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </TouchableOpacity>

        {/* CENTER (TITLE) */}
        <View className="flex-1 items-center">
          <Text className="text-white text-[17px] font-semibold">
            Infi AI
          </Text>
        </View>

        {/* RIGHT (SPACER) */}
        <View className="w-8" />
      </View>

      {/* CHAT */}
      <KeyboardAwareScrollView
        ref={scrollRef}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 16, paddingBottom: 150 }}
      >
        {messages.map((msg) =>
          msg.sender === "bot" ? (
            <BotMessage key={msg.id} text={msg.data} />
          ) : (
            <UserMessage key={msg.id} message={msg} />
          )
        )}
      </KeyboardAwareScrollView>

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
