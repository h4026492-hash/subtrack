import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="subscriptions" />
      <Stack.Screen name="add" />
      <Stack.Screen name="ai" />
    </Stack>
  );
}
