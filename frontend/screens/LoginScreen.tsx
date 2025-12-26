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

interface LoginScreenProps {
  onLoginAction: () => void;
  onForgotPassword: () => void;
  onBack: () => void;
}

export default function LoginScreen({
  onLoginAction,
  onForgotPassword,
  onBack,
}: LoginScreenProps) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#FBF7ED");
      NavigationBar.setButtonStyleAsync("dark");
    }
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsScrolled(event.nativeEvent.contentOffset.y > 20);
  };

  const emailError =
    emailTouched &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? "Enter a valid email address"
      : "";

  const passwordError =
    passwordTouched && password.trim() === ""
      ? "Password is required"
      : "";

  const isEnabled =
    email !== "" &&
    password !== "" &&
    !emailError &&
    !passwordError;

  const handleLogin = () => {
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!isEnabled) {
      showToast.error("Please fix the highlighted fields");
      return;
    }

    showToast.login();
    onLoginAction();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FBF7ED] py-10">
      <TouchableOpacity
        onPress={onBack}
        disabled={isScrolled}
        className="absolute z-10 p-4"
        style={[
          { left: 10, opacity: isScrolled ? 0 : 1 },
          isTablet
            ? { left: "5%", top: 20 }
            : { top: Platform.OS === "android" ? 30 : 0 },
        ]}
      >
        <Ionicons name="arrow-back" size={20} color="#1F2937" />
      </TouchableOpacity>

      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        extraScrollHeight={20}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          justifyContent: isTablet ? "center" : "flex-end",
          alignItems: isTablet ? "center" : "stretch",
          marginBottom: 22,
        }}
      >
        <View className="w-full" style={isTablet ? { width: 400 } : undefined}>
          <Text className="text-5xl font-serif text-[#1F2937] mb-3">
            Login
          </Text>

          <Text className="text-base text-gray-500 mb-6">
            Login to see what is out there waiting for you.
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

          <PasswordInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (!passwordTouched) setPasswordTouched(true);
            }}
            touched={passwordTouched}
            error={passwordError}
          />

          <PrimaryButton
            title="Next"
            disabled={!isEnabled}
            onPress={handleLogin}
            className={isEnabled ? "bg-[#0D0F18]" : "bg-[#CBD5E1]"}
            textClassName={isEnabled ? "text-white" : "text-[#64748B]"}
          />

          <TouchableOpacity className="mt-6" onPress={onForgotPassword}>
            <Text className="text-sm text-gray-600">Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
