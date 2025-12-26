import { View, Text, TextInput } from "react-native";
import { useRef } from "react";

interface Props {
  label: string;
  length?: number;
  value: string;
  onChange: (code: string) => void;
}

export default function OtpInput({
  label,
  length = 6,
  value,
  onChange,
}: Props) {
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const chars = value.split("");
    chars[index] = text.replace(/[^0-9]/g, "");
    const newValue = chars.join("");
    onChange(newValue);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (!value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="mb-6 w-full">
      <Text className="mb-2 text-sm font-medium text-[#1F2937]">
        {label}
      </Text>

      <View className="flex-row justify-between">
        {Array.from({ length }).map((_, index) => {
          const hasValue = Boolean(value[index]);

          return (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputs.current[index] = ref;
              }}
              value={value[index] || ""}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(index);
                }
              }}
              keyboardType="number-pad"
              maxLength={1}
              className={`w-14 h-14 rounded-xl bg-white text-center text-xl font-semibold text-[#1F2937]
                ${hasValue ? "border-2 border-[#3d3d3d]" : "border border-gray-200"}
              `}
            />
          );
        })}
      </View>
    </View>
  );
}
