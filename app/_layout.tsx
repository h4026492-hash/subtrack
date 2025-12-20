import 'react-native-reanimated';
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
      <Stack.Screen name="index" />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="subscriptions"
        options={{ title: "Subscriptions" }}
      />
      <Stack.Screen name="add" options={{ title: "Add Subscription" }} />
    </Stack>
  );
}
