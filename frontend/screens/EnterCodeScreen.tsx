import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  useWindowDimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { showToast } from "../utils/toast";

import PrimaryButton from "../components/PrimaryButton";
import OtpInput from "../components/OtpInput";

interface EnterCodeScreenProps {
  onSuccess: () => void;
  onBack: () => void;
}

export default function EnterCodeScreen({
  onSuccess,
  onBack,
}: EnterCodeScreenProps) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  const [code, setCode] = useState("");

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#FBF7ED");
      NavigationBar.setButtonStyleAsync("dark");
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#FBF7ED]">
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={150}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: isTablet ? "center" : "flex-end",
          alignItems: isTablet ? "center" : "flex-start",
          paddingHorizontal: 24,
          paddingBottom: isTablet ? 0 : 40,
          marginBottom: isTablet ? 0 : 22,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 400,
            paddingTop: isTablet ? 0 : 80,
          }}
        >
          <View
            className={`${isTablet ? "items-center" : "items-start"} mb-6`}
          >
            <Text
              className="text-5xl font-serif text-[#1F2937] mb-3"
              style={{ textAlign: isTablet ? "center" : "left" }}
            >
              Enter Code
            </Text>
            <Text
              className={`text-base text-gray-500 leading-6 ${
                isTablet ? "text-center" : "text-left"
              }`}
            >
              We have sent a 6 digit code to your email. Enter it below to
              continue.
            </Text>
          </View>

          <OtpInput
            label="Verification Code"
            length={6}
            value={code}
            onChange={setCode}
          />

          <View className="mb-4">
            <PrimaryButton
              title="Continue"
              disabled={code.length !== 6}
              onPress={() => {
                showToast.verification();
                onSuccess();
              }}
              className="bg-[#0D0F18]"
              textClassName="text-white"
            />
          </View>

          <TouchableOpacity
            className="items-center w-full py-2"
            onPress={onBack}
          >
            <Text className="text-sm text-gray-500">Go back</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
