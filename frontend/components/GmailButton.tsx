import { Pressable, Text, View } from "react-native";
import GoogleIcon from "./GoogleIcon";

export default function GmailButton() {
  return (
    <Pressable
      className="
        w-full
        border border-neutral-300
        rounded-xl
        py-4
        mt-3
        flex-row
        items-center
        justify-center
        bg-white
        active:opacity-80
      "
    >
      <View className="mr-3">
        <GoogleIcon size={22} />
      </View>

      <Text className="text-black text-[14px] font-medium">
        Continue with Gmail
      </Text>
    </Pressable>
  );
}
