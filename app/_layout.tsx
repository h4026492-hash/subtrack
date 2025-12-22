import { useEffect } from "react";
import { Slot, router, useRootNavigationState } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { getToken } from "../src/auth/token";

export default function App() {
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;

    (async () => {
      const token = await getToken();
      if (token) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    })();
  }, [navigationState]);

  if (!navigationState?.key) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}
