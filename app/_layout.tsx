import { useEffect } from "react";
import { Stack, router } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../src/auth/useAuth";

export default function RootLayout() {
  const { loading, authenticated } = useAuth();

  useEffect(() => {
    if (!loading) {
      router.replace(authenticated ? "/dashboard" : "/login");
    }
  }, [loading, authenticated]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="dashboard"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#0f172a" },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "600" },
        }}
      />
      <Stack.Screen
        name="subscription/[id]"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#0f172a" },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "600" },
        }}
      />
    </Stack>
  );
}
