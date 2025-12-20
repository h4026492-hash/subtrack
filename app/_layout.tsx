import { Stack } from "expo-router";
import { Colors } from "../src/theme/colors";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.background },
        headerTitleStyle: { color: Colors.textPrimary },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Dashboard" }} />
      <Stack.Screen
        name="subscriptions"
        options={{ title: "Subscriptions" }}
      />
      <Stack.Screen name="add" options={{ title: "Add Subscription" }} />
    </Stack>
  );
}
