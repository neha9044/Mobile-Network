import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, useWindowDimensions } from "react-native";

interface Props {
  onPress?: () => void;
}

export default function Signup({ onPress }: Props) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`flex-row items-center justify-center gap-3 w-full max-w-[450px] py-4 bg-[#12141c] rounded-xl my-2 ${
        isTablet ? "self-center" : "self-start"
      }`}
    >
      <Ionicons name="mail-outline" size={22} color="#ffffff" />
      <Text className="text-white text-[17px] font-medium">
        Sign up with Mail
      </Text>
    </TouchableOpacity>
  );
}
