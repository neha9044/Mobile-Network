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
import { useMutation } from "@apollo/client/react";
import { REGISTER_MUTATION } from "@/graphql/mutations";
import {
  RegisterMutationResponse,
  RegisterMutationVariables,
} from "@/graphql/types";

interface RegisterScreenProps {
  onEnterCode: (email: string) => void;
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

  const [emailTouched, setEmailTouched] = useState(false);
  const [mobileTouched, setMobileTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [firstNameTouched, setFirstNameTouched] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [registerUser, { loading }] = useMutation<
    RegisterMutationResponse,
    RegisterMutationVariables
  >(REGISTER_MUTATION);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#FBF7ED");
      NavigationBar.setButtonStyleAsync("dark");
    }
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsScrolled(event.nativeEvent.contentOffset.y > 20);
  };

  const firstNameError: string | undefined = !firstNameTouched
    ? undefined
    : firstName.trim() === ""
    ? "First name is required"
    : !/^[A-Za-z]+$/.test(firstName)
    ? "First name can only contain letters"
    : undefined;

  // ✅ EMAIL VALIDATION
  const emailError =
    emailTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? "Enter a valid email address"
      : "";

  // ✅ MOBILE VALIDATION
  const mobileError =
    mobileTouched && !/^[0-9]{10}$/.test(mobile)
      ? "Mobile number must be 10 digits"
      : "";

  // ✅ PASSWORD VALIDATION (8+ chars, number, symbol)
  const passwordError =
    passwordTouched &&
    !/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(password)
      ? "Password must be 8+ characters, include a number & symbol"
      : "";

  const isEnabled =
    firstName.trim() !== "" &&
    email !== "" &&
    mobile !== "" &&
    password !== "" &&
    !firstNameError &&
    !emailError &&
    !mobileError &&
    !passwordError;

  const handleContinue = async () => {
    setFirstNameTouched(true);
    setEmailTouched(true);
    setMobileTouched(true);
    setPasswordTouched(true);

    if (!isEnabled) {
      showToast.error("Please fix the highlighted fields");
      return;
    }

    try {
      const res = await registerUser({
        variables: {
          email,
          phoneNo: mobile,
          password,
          firstName,
          lastName: lastName || null,
        },
      });

      showToast.success(res.data!.register);
      // move to OTP screen AFTER backend success
      onEnterCode(email);
    } catch (err: any) {
      showToast.error(err.message || "Registration failed");
    }
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
        extraScrollHeight={20}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 22,
          justifyContent: isTablet ? "center" : "flex-end",
          alignItems: isTablet ? "center" : "stretch",
          marginBottom: 22,
        }}
      >
        <View className="w-full" style={isTablet ? { width: 400 } : undefined}>
          <Text
            className="text-5xl font-serif text-[#1F2937] mb-3"
            style={{ textAlign: isTablet ? "center" : "left" }}
          >
            Register
          </Text>

          <Text
            className="text-base text-gray-500 mb-6 leading-6"
            style={{ textAlign: isTablet ? "center" : "left" }}
          >
            We will send a 6 digit code in your email, enter it to verify your
            email
          </Text>

          <View className="flex-row gap-3">
            <View className="flex-1">
              <TextInputField
                label="First Name *"
                placeholder="John"
                value={firstName}
                onChangeText={(text) => {
                  setFirstName(text);
                  if (!firstNameTouched) setFirstNameTouched(true);
                }}
                error={firstNameError}
                touched={firstNameTouched}
              />
            </View>

            <View className="flex-1">
              <TextInputField
                label="Last Name"
                placeholder="Doe"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
              />
            </View>
          </View>

          <TextInputField
            label="Email*"
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

          <TextInputField
            label="Mobile No *"
            placeholder="9876543210"
            value={mobile}
            onChangeText={(text) => {
              setMobile(text.replace(/[^0-9]/g, ""));
              if (!mobileTouched) setMobileTouched(true);
            }}
            keyboardType="number-pad"
            maxLength={10}
            error={mobileError}
            touched={mobileTouched}
          />

          <PasswordInput
            label="Password *"
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
            title={loading ? "Please wait..." : "Continue"}
            disabled={!isEnabled || loading}
            onPress={handleContinue}
            className={isEnabled ? "bg-[#0D0F18]" : "bg-[#CBD5E1]"}
            textClassName={isEnabled ? "text-white" : "text-[#64748B]"}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
