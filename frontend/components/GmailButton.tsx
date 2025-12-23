import React from "react";
import { Pressable, Text, View } from "react-native";

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
      {/* Google Icon (Tailwind-built) */}
      <View
        className="
          w-6 h-6
          rounded-full
          border-2 border-black
          items-center
          justify-center
          mr-3
        "
      >
        <Text className="font-bold text-sm">G</Text>
      </View>

      <Text className="text-black text-[14px] font-medium">
        Continue with Gmail
      </Text>
    </Pressable>
  );
}