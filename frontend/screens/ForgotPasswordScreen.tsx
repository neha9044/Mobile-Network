// screens/ForgotPasswordScreen.tsx
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { showToast } from "../utils/toast";

import TextInputField from "../components/TextInputField";
import PrimaryButton from "../components/PrimaryButton";

interface ForgotPasswordScreenProps {
  onSent: () => void;
  onBack: () => void;
}

export default function ForgotPasswordScreen({
  onSent,
  onBack,
}: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FBF7ED" }}>
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: isTablet ? "center" : "flex-end",
          alignItems: isTablet ? "center" : "stretch",
          paddingHorizontal: 24,
        }}
      >
        <View 
          style={{ 
            width: "100%", 
            maxWidth: 400, 
            paddingBottom: 48,
          }}
        >
          <Text 
            className="text-4xl font-serif mb-3 text-[#1F2937]"
            style={{ textAlign: isTablet ? "center" : "left" }}
          >
            Forgot Password
          </Text>

          <TextInputField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />

         <PrimaryButton
          title="Send Reset Link"
          onPress={() => {
            showToast.email();
            onSent();
          }}
          className="bg-[#0D0F18]"
          textClassName="text-white"
        />


          <View className="flex-row items-center justify-center mt-6">
            <Text className="text-gray-500 text-sm">
              Remembered your password?{" "}
            </Text>
            <TouchableOpacity onPress={onBack}>
              <View className="flex-row items-center">
                <Text className="text-[#111827] font-bold text-sm">
                  Login{" "}
                </Text>
                <Ionicons name="arrow-forward" size={14} color="#111827" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}