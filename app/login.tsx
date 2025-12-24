import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function Login() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#020617",
      }}
    >
      <Text style={{ color: "white", fontSize: 28, marginBottom: 20 }}>
        LOGIN SCREEN
      </Text>

      <Pressable
        onPress={() => router.replace("/dashboard")}
        style={{
          padding: 16,
          backgroundColor: "#2563eb",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Go Dashboard</Text>
      </Pressable>
    </View>
  );
}
