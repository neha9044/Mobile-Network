import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function PasswordInput({
  label,
  placeholder,
  value,
  onChangeText,
}: Props) {
  const [secure, setSecure] = useState(true);

  return (
    <View className="mb-4 w-full">
      <Text className="mb-2 text-sm font-medium text-[#1F2937]">
        {label}
      </Text>

      <View className="flex-row items-center rounded-xl border border-gray-200 bg-white px-4">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secure}
          className="flex-1 py-3 text-base"
          placeholderTextColor="#9CA3AF"
        />

        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Ionicons
            name={secure ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#9CA3AF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}