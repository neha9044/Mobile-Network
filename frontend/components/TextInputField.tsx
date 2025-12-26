import { View, Text, TextInput } from "react-native";

interface Props {
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: any;
}

export default function TextInputField({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
}: Props) {
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
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base"
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
}