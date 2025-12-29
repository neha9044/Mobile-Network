import { View, Text } from "react-native";

export default function BotMessage({ text }: { text: string }) {
  return (
    <View className="w-full flex-row justify-start mb-3">
      <View className="max-w-[80%] bg-black px-4 py-3 rounded-2xl rounded-tl-none">
        <Text className="text-white text-[15px] leading-5">
          {text}
        </Text>
      </View>
    </View>
  );
}
