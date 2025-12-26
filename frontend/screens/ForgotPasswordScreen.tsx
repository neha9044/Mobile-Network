import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  useWindowDimensions,
  Platform,
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

const REGISTERED_EMAIL = "test@gmail.com";

export default function ForgotPasswordScreen({
  onSent,
  onBack,
}: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  const emailError =
    emailTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? "Enter a valid email address"
      : emailTouched && email !== REGISTERED_EMAIL
      ? "This email is not registered"
      : "";

  const isEnabled = email !== "" && !emailError;

  const handleSend = () => {
    setEmailTouched(true);

    if (!isEnabled) {
      showToast.error("Please enter a registered email");
      return;
    }

    showToast.email();
    onSent();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FBF7ED" }}>
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        keyboardShouldPersistTaps="handled"

        /* 🔥 THIS IS THE KEY FIX */
        extraScrollHeight={Platform.OS === "android" ? 220 : 140}
        extraHeight={Platform.OS === "android" ? 220 : 140}

        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: isTablet ? "center" : "flex-end",
          alignItems: isTablet ? "center" : "stretch",
          paddingHorizontal: 24,
          paddingBottom: isTablet ? 0 : 60,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 400,
            paddingTop: isTablet ? 0 : 120, // 🔥 pushes content higher
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
            onChangeText={(text) => {
              setEmail(text);
              if (!emailTouched) setEmailTouched(true);
            }}
            keyboardType="email-address"
            error={emailError}
            touched={emailTouched}
          />

          <PrimaryButton
            title="Send Code"
            onPress={handleSend}
            disabled={!isEnabled}
            className={isEnabled ? "bg-[#0D0F18]" : "bg-[#CBD5E1]"}
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
