import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0B1220",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "600",
        },
        animation: "slide_from_right",
        animationDuration: 300,
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Stack.Screen name="subscriptions" options={{ title: "Subscriptions" }} />
      <Stack.Screen name="add" options={{ title: "Add Subscription" }} />
      <Stack.Screen name="ai" options={{ title: "AI Assistant" }} />
    </Stack>
  );
}
