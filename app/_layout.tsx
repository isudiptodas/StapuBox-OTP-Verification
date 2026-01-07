import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "@/global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="verify" />
        <Stack.Screen name="register" />
        <Stack.Screen name="success" />
      </Stack>
    </SafeAreaProvider>
  );
}
