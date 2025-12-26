import React from "react";
import { ScrollView, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomText from "@/components/BottomText";
import GmailButton from "@/components/GmailButton";
import Signup from "@/components/Signup";
import Textbox from "@/components/Textbox";

interface HomeScreenProps {
  onLogin: () => void;
  onSignUp: () => void;
}

export default function HomeScreen({
  onLogin,
  onSignUp,
}: HomeScreenProps) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  return (
    <SafeAreaView className="flex-1 bg-[#F9F8F0]  ">
      <ScrollView
        contentContainerClassName={`mb-5
          flex-grow
          px-6
          pb-8
          ${isTablet ? "items-center justify-center" : "items-start justify-end"}
        `}
      >
        <View
          className={`w-full ${isTablet ? "items-center" : "items-start"}`}
          style={isTablet ? { width: 400 } : undefined}
        >
          <Textbox />
          <Signup onPress={onSignUp} />
          <GmailButton />
          <BottomText onPress={onLogin} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}