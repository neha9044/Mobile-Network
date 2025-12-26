import { Text, View, useWindowDimensions } from "react-native";

export default function Textbox() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  return (
    <View className="w-full max-w-[500px] my-5">
      <Text
        className={`text-[38px] leading-[44px] font-medium text-slate-800 font-[InstrumentSerif] mb-2 ${
          isTablet ? "text-center" : "text-left"
        }`}
      >
        Welcome to the new era of professional networking
      </Text>

      <Text
        className={`text-base leading-6 text-slate-500 font-[InstrumentSerif] ${
          isTablet ? "text-center" : "text-left"
        }`}
      >
        People Search 3.0 is in full swing in network by Infidhi.
      </Text>
    </View>
  );
}
