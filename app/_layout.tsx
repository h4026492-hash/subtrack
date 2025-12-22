import { useEffect, useState } from "react";
import { Slot, router } from "expo-router";
import { getToken } from "../src/auth/token";
import { View, ActivityIndicator } from "react-native";

export default function App() {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
      setChecking(false);
    })();
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}
