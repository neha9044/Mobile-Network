// screens/EnterCodeScreen.tsx
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  useWindowDimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { showToast } from "../utils/toast";

import PasswordInput from "../components/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";

interface EnterCodeScreenProps {
  onSuccess: () => void;
  onBack: () => void;
}

export default function EnterCodeScreen({ onSuccess, onBack }: EnterCodeScreenProps) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#FBF7ED");
      NavigationBar.setButtonStyleAsync("dark");
    }
  },);

  return (
    <SafeAreaView className="flex-1 bg-[#FBF7ED]">
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={150} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: isTablet ? 'center' : 'flex-end',
          alignItems: isTablet ? 'center' : 'flex-start',
          paddingHorizontal: 24,
          paddingBottom: isTablet ? 0 : 40,
          marginBottom: isTablet ? 0 : 22,
        }}
      >
        <View
          style={{
            width: '100%',
            maxWidth: 400,
            paddingTop: isTablet ? 0 : 80,
          }}
        >
          <View className={`${isTablet ? "items-center" : "items-start"} mb-6`}>
            <Text 
              className="text-5xl font-serif text-[#1F2937] mb-3"
              style={{ textAlign: isTablet ? 'center' : 'left' }}
            >
              Enter Code
            </Text>
            <Text 
              className={`text-base text-gray-500 leading-6 ${isTablet ? "text-center" : "text-left"}`}
            >
              We have sent a 4 digit code in your email, enter it to verify your email
            </Text>
          </View>

          <PasswordInput
            label="Enter Code"
            placeholder="••••"
          />

          <View className="mb-4">
            <PrimaryButton
              title="Continue"
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
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}