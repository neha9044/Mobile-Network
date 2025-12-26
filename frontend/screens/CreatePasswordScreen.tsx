import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  useWindowDimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as NavigationBar from "expo-navigation-bar";
import { showToast } from "../utils/toast";

import PasswordInput from "../components/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";

interface CreatePasswordProps {
  onComplete: () => void;
}

export default function CreatePasswordScreen({ onComplete }: CreatePasswordProps) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#FBF7ED");
      NavigationBar.setButtonStyleAsync("dark");
    }
  }, []);

  // ✅ PASSWORD VALIDATION (8+ chars, number, symbol)
  const passwordError =
    passwordTouched &&
    !/^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(password)
      ? "Password must be 8+ characters with a number & symbol"
      : "";

  // ✅ CONFIRM PASSWORD VALIDATION
  const confirmPasswordError =
    confirmTouched && confirmPassword !== password
      ? "Passwords do not match"
      : "";

  const isEnabled =
    password !== "" &&
    confirmPassword !== "" &&
    !passwordError &&
    !confirmPasswordError;

  const handleReset = () => {
    setPasswordTouched(true);
    setConfirmTouched(true);

    if (!isEnabled) {
      showToast.error("Please fix the errors");
      return;
    }

    showToast.reset();
    onComplete();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FBF7ED", paddingBottom: 10 }}
    >
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={Platform.OS === "android" ? 40 : 40}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: isTablet ? "center" : "flex-end",
          alignItems: isTablet ? "center" : "stretch",
          marginBottom: isTablet ? 0 : 22,
        }}
      >
        <View
          className="ml-4 w-ful"
          style={{ width: "100%", maxWidth: 400 }}
        >
          <View
            className={`mb-6 ${isTablet ? "items-center" : "items-start"}`}
          >
            <Text
              className="text-5xl font-serif text-[#1F2937] mb-2"
              style={{ textAlign: isTablet ? "center" : "left" }}
            >
              Create Password
            </Text>

            <Text
              className="text-lg text-gray-500 leading-6"
              style={{ textAlign: isTablet ? "center" : "left" }}
            >
              Your new password must be different from previously used passwords.
            </Text>
          </View>

          <View className="w-full">
            <PasswordInput
              label="New Password"
              placeholder="Enter new password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (!passwordTouched) setPasswordTouched(true);
              }}
              touched={passwordTouched}
              error={passwordError}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (!confirmTouched) setConfirmTouched(true);
              }}
              touched={confirmTouched}
              error={confirmPasswordError}
            />
          </View>

          <View className="mt-1">
            <PrimaryButton
              title="Reset Password"
              onPress={handleReset}
              disabled={!isEnabled}
              className={isEnabled ? "bg-[#0D0F18]" : "bg-[#CBD5E1]"}
              textClassName="text-white"
            />
          </View>

          <View
            className={`flex-row mt-4 py-4 ${
              isTablet ? "justify-center" : "justify-start"
            }`}
          >
            <TouchableOpacity onPress={onComplete}>
              <Text className="text-[#111827] font-bold text-sm">
                Login →
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
