import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, useWindowDimensions } from "react-native";

interface Props {
  onPress?: () => void;
}

export default function BottomText({ onPress }: Props) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`flex-row items-center w-full  mt-3 mb-[-30px] ${
        isTablet ? "justify-center" : "justify-start"
      }`}
    >
      <Text className="text-gray-500 text-base">
        Already have an account?{" "}
      </Text>

      <Text className="text-gray-900 font-semibold text-base mr-1">
        Log in
      </Text>

      <Ionicons
        name="chevron-forward"
        size={16}
        color="#111827"
      />
    </TouchableOpacity>
  );
}
