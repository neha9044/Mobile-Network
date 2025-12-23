// screens/CreatePasswordScreen.tsx
import React, { useEffect } from "react";
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

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#FBF7ED");
      NavigationBar.setButtonStyleAsync("dark");
    }
  },);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FBF7ED" }}>
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ 
          flexGrow: 1,
          justifyContent: isTablet ? "center" : "flex-end",
          alignItems: isTablet ? "center" : "stretch",
          marginBottom: isTablet ? 0 : 22,
        }}
      >
        <View 
          className="p-8"
          style={{ width: '100%', maxWidth: 400 }}
        >
          <View className={`mb-10 ${isTablet ? "items-center" : "items-start"}`}>
            <Text 
              className="text-5xl font-serif text-[#1F2937] mb-2"
              style={{ textAlign: isTablet ? 'center' : 'left' }}
            >
              Create Password
            </Text>
            <Text 
              className="text-lg text-gray-500 leading-6"
              style={{ textAlign: isTablet ? 'center' : 'left' }}
            >
              Your new password must be different from previously used passwords.
            </Text>
          </View>

          <View className="w-full">
            <PasswordInput label="New Password" placeholder="Enter new password" />
            <PasswordInput label="Confirm Password" placeholder="Confirm new password" />
          </View>

          <View className="mt-2">
            <PrimaryButton
              title="Reset Password"
              onPress={() => {
                showToast.reset();
                onComplete();
              }}
              className="bg-[#0D0F18]"
              textClassName="text-white"
            />
          </View>

          <View className={`flex-row mt-8 ${isTablet ? "justify-center" : "justify-start"}`}>
            <TouchableOpacity onPress={onComplete}>
              <Text className="text-[#111827] font-bold text-sm">Login →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}