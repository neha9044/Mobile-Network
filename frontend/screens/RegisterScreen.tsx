// screens/RegisterScreen.tsx
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  useWindowDimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { showToast } from "../utils/toast";

import TextInputField from "../components/TextInputField";
import PasswordInput from "../components/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";

interface RegisterScreenProps {
  onEnterCode: () => void;
  onBack: () => void;
}

export default function RegisterScreen({
  onEnterCode,
  onBack,
}: RegisterScreenProps) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const isEnabled = email.trim() !== "" && mobile.trim() !== "" && password.trim() !== "";

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsScrolled(offsetY > 20);
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#FBF7ED");
      NavigationBar.setButtonStyleAsync("dark");
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#FBF7ED] py-10">
      <TouchableOpacity 
        onPress={onBack}
        disabled={isScrolled}
        className="absolute z-10 p-4"
        style={[
          { left: 10, opacity: isScrolled ? 0 : 1 },
          isTablet ? { left: '5%', top: 20 } : { top: Platform.OS === 'android' ? 30 : 0 }
        ]}
      >
        <Ionicons name="arrow-back" size={20} color="#1F2937" />
      </TouchableOpacity>

      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={20}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ 
          flexGrow: 1, 
          paddingHorizontal: 22,
          justifyContent: isTablet ? "center" : "flex-end",
          alignItems: isTablet ? "center" : "stretch",
          marginBottom:22,
        }}
      >
        <View className="w-full" style={isTablet ? { width: 400 } : undefined}>
          <Text 
            className="text-5xl font-serif text-[#1F2937] mb-3 p "
            style={{ textAlign: isTablet ? "center" : "left" }}
          >
            Register
          </Text>

          <Text 
            className="text-base text-gray-500 mb-6 leading-6"
            style={{ textAlign: isTablet ? "center" : "left" }}
          >
            We have sent a 4 digit code in your email, enter it to verify your email
          </Text>

          <TextInputField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />

          <TextInputField
            label="Mobile No"
            placeholder="9876543210"
            value={mobile}
            onChangeText={setMobile}
          />

          <PasswordInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
          />

          <PrimaryButton
            title="Continue"
            disabled={!isEnabled}
            onPress={() => {
              showToast.registration();
              onEnterCode();
            }}
            className={isEnabled ? "bg-[#0D0F18]" : "bg-[#CBD5E1]"}
            textClassName={isEnabled ? "text-white" : "text-[#64748B]"}
          />

          <TouchableOpacity className="mt-4 items-center" onPress={onBack}>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}