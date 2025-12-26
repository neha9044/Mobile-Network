import { View, SafeAreaView, ScrollView } from "react-native";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    // The background color from your UI: #F7F4EB
    <SafeAreaView className="flex-1 bg-[#FBF7ED]">
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-8 pb-12 pt-20">
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}