import { View, Text, TextInput } from "react-native";

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: any;
  maxLength?: number;

  error?: string;
  touched?: boolean;
}

export default function TextInputField({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  maxLength,
  error,
  touched = false,
}: Props) {
  const showError = touched && !!error;

  return (
    <View className="mb-4 w-full">
      <Text className="mb-2 text-sm font-medium text-[#1F2937]">
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        maxLength={maxLength}
        placeholderTextColor="#9CA3AF"
        className={`w-full rounded-xl px-4 py-3 text-base bg-white ${
          showError ? "border border-red-500" : "border border-gray-200"
        }`}
      />

      {showError && (
        <Text className="mt-1 text-sm text-red-500">
          {error}
        </Text>
      )}
    </View>
  );
}
