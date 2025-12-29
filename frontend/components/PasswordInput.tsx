import { View, Text, TextInput, TouchableOpacity, Platform } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;

  // validation
  touched?: boolean;
  error?: string;
}

export default function PasswordInput({
  label,
  placeholder,
  value,
  onChangeText,
  touched = false,
  error,
}: Props) {
  const [secure, setSecure] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const showError = touched && !!error;

  return (
    <View className="mb-4 w-full">
      <Text className="mb-2 text-sm font-medium text-[#1F2937]">
        {label}
      </Text>

      <View
        className={`flex-row items-center rounded-xl bg-white px-4 border ${
          showError
            ? "border-red-500"
            : isFocused
            ? "border-2 border-black"
            : "border-gray-200"
        }`}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secure}
          className="flex-1 py-3 text-base"
          placeholderTextColor="#9CA3AF"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={Platform.OS === "web" ? { outlineStyle: "none" } : undefined}
        />

        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Ionicons
            name={secure ? "eye-outline" : "eye-off-outline"}
            size={20}
            color={showError ? "#EF4444" : "#9CA3AF"}
          />
        </TouchableOpacity>
      </View>

      {showError && (
        <Text className="mt-1 text-sm text-red-500">
          {error}
        </Text>
      )}
    </View>
  );
}
